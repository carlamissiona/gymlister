const { Pool } = require('pg');
const fs = require("fs");

const pool = new Pool({
  user: 'avnadmin',
  host: 'pg-2d98c6c2-aib-5b6c.j.aivencloud.com',
  database: 'defaultdb',
  password: 'AVNS_oczXQsl8wSSEP5hDIn0',
  port: 28735,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./caa.pem").toString(),
  },
});
//INSERT INTO users ("hii", "email") VALUES ($1, $2) RETURNING *;

// psql -h pg-2d98c6c2-aib-5b6c.j.aivencloud.com -p 28735 -d defaultdb -U avnadmin -W
// CREATE TABLE users_telefit (   id SERIAL PRIMARY KEY,  email TEXT NOT NULL UNIQUE,  password TEXT NOT NULL,  username TEXT NOT NULL,  full_name TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL,  about_me TEXT ,   created_at TIMESTAMP DEFAULT current_timestamp, updated_at TIMESTAMP DEFAULT current_timestamp);
// CREATE TABLE gympartners_telefit (   id SERIAL PRIMARY KEY,  email TEXT NOT NULL UNIQUE,  password TEXT NOT NULL,  username TEXT NOT NULL,  full_name TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL,  about_me TEXT ,   created_at TIMESTAMP DEFAULT current_timestamp, updated_at TIMESTAMP DEFAULT current_timestamp);
// CREATE TABLE gyms_telefit ( id SERIAL PRIMARY KEY,  name TEXT NOT NULL UNIQUE,  city TEXT NOT NULL UNIQUE , description TEXT NOT NULL UNIQUE,  capacity TEXT NOT NULL UNIQUE,  amenities TEXT NOT NULL UNIQUE ,  address TEXT NOT NULL UNIQUE, fee TEXT NOT NULL UNIQUE, operating_hours TEXT NOT NULL UNIQUE, instructor_id  TEXT NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT current_timestamp, updated_at TIMESTAMP DEFAULT current_timestamp);
// Student queries

/**
 * 
 * INSERT INTO students (username, password, full_name, address, city, about_me)
    VALUES ('tsaic', '123', 'Tsaic', '4', '5', '6');
 */
const createStudent = async (student) => {
  const query = `
    INSERT INTO students (username, password, full_name, address, city, about_me)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [student.username, student.password, student.fullName, 
                  student.address, student.city, student.aboutMe];
  return (await pool.query(query, values)).rows[0];
};

// Instructor queries
const createInstructor = async (instructor) => {
  const query = `
    INSERT INTO instructors (username, password, full_name, address, city, about_me)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [instructor.username, instructor.password, instructor.fullName,
                  instructor.address, instructor.city, instructor.aboutMe];
  return (await pool.query(query, values)).rows[0];
};

// Gym queries
const createGym = async (gym) => {
  const query = `
    INSERT INTO gyms (name, city, description, capacity, amenities, address, fee, operating_hours, instructor_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  const values = [gym.name, gym.city, gym.description, gym.capacity,
                 gym.amenities, gym.address, gym.fee, gym.operatingHours, gym.instructorId];
  return (await pool.query(query, values)).rows[0];
};

const getAllGyms = async () => {
  const query = 'SELECT * FROM gyms';
  return (await pool.query(query)).rows;
};


const checkLogin = async (login_params) => {
  // const query = 'SELECT id FROM users WHERE username = $1 AND password = crypt( $2, password);';  
  console.log(login_params.username, " hi >> ", login_params.password );
   await pool.query('SELECT id FROM users_telefit WHERE username = $1 AND password = $2 ;', [login_params.username, login_params.password ], async (error, results) => {
     if (error) {
       throw error;
     }
     console.log("results");
     user_session = results.rows;
    // console.log(results);
     //console.log(results.rows);
     return await results.rows;
   });
   
 };




module.exports = {
  createStudent,
  createInstructor,
  createGym,
  checkLogin,
  getAllGyms
};