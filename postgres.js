const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'gym_connection',
  password: 'your_password',
  port: 5432,
});

// Student queries
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

module.exports = {
  createStudent,
  createInstructor,
  createGym,
  getAllGyms
};