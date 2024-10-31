const express = require('express');
const router = express.Router();
const dummyData = require('../data/dummy');
// Uncomment when switching to PostgreSQL
const db = require('../postgres');

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
 // return new Promise((resolve, reject) => {    
      const { username, password, type } = req.body;
      //checkLogin
      const user_details = { username: username, password: password };
      //const users = type === 'student' ? dummyData.students : dummyData.instructors;
      let user = null;
      if (type === 'student') {
        user = await db.checkLogin(user_details);
      } else {
        res.redirect('/');
      }
      
      if (user) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('auth/login', { error: 'Invalid credentials' });
      }
    
  // }); // promise end
});

router.get('/signup/:type', (req, res) => {
  res.render('auth/signup', { type: req.params.type });
});

router.post('/signup/:type', async (req, res) => {
  const { username, password, fullName, address, city, aboutMe } = req.body;
  const type = req.params.type;

  // Check if username already exists in dummy data
  const existingStudent = dummyData.students.find(s => s.username === username);
  const existingInstructor = dummyData.instructors.find(i => i.username === username);
  
  if (existingStudent || existingInstructor) {
    return res.render('auth/signup', { 
      type,
      error: 'Username already exists',
      formData: req.body
    });
  }

  const newUser = {
    id: type === 'student' ? dummyData.students.length + 1 : dummyData.instructors.length + 1,
    username,
    password,
    fullName,
    address,
    city,
    aboutMe,
    type
  };

  // Update dummy data arrays
  if (type === 'student') {
    dummyData.students.push(newUser);
    // When switching to PostgreSQL, use:
    // const savedStudent = await db.createStudent(newUser);
    // req.session.user = savedStudent;
  } else {
    dummyData.instructors.push(newUser);
    // When switching to PostgreSQL, use:
    // const savedInstructor = await db.createInstructor(newUser);
    // req.session.user = savedInstructor;
  }

  req.session.user = newUser;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;