const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');

// Routes
const authRoutes = require('./routes/auth');
const gymRoutes = require('./routes/gyms');
app.use('/auth', authRoutes);
app.use('/gyms', gymRoutes);

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});