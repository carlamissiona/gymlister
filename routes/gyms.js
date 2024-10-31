const express = require('express');
const router = express.Router();
const dummyData = require('../data/dummy');
// Uncomment when switching to PostgreSQL
// const db = require('../postgres');

// Middleware to check if user is instructor
const isInstructor = (req, res, next) => {
  if (req.session.user && req.session.user.type === 'instructor') {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

// List all gyms
router.get('/', (req, res) => {
  // When switching to PostgreSQL, use:
  // const gyms = await db.getAllGyms();
  // res.render('gyms/list', { gyms, user: req.session.user });
  
  res.render('gyms/list', { 
    gyms: dummyData.gyms,
    user: req.session.user 
  });
});

// Add new gym form (instructors only)
router.get('/add', isInstructor, (req, res) => {
  res.render('gyms/add', { user: req.session.user });
});

// Create new gym
router.post('/', isInstructor, async (req, res) => {
  const {
    name,
    city,
    description,
    capacity,
    amenities,
    address,
    fee,
    operatingHours
  } = req.body;

  // Validate required fields
  if (!name || !city || !description || !capacity || !amenities || !address || !fee || !operatingHours) {
    return res.render('gyms/add', {
      error: 'All fields are required',
      formData: req.body,
      user: req.session.user
    });
  }

  const newGym = {
    id: dummyData.gyms.length + 1,
    name,
    city,
    description,
    capacity: parseInt(capacity),
    amenities,
    address,
    fee: parseFloat(fee),
    operatingHours,
    instructorId: req.session.user.id
  };

  // Update dummy data array
  dummyData.gyms.push(newGym);
  
  // When switching to PostgreSQL, use:
  // try {
  //   await db.createGym(newGym);
  // } catch (error) {
  //   return res.render('gyms/add', {
  //     error: 'Error creating gym',
  //     formData: req.body,
  //     user: req.session.user
  //   });
  // }

  res.redirect('/gyms');
});

module.exports = router;