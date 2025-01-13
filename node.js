const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/dashboard', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up session store
const store = new MongoDBStore({
  uri: 'mongodb://localhost/dashboard',
  collection: 'sessions'
});

// Set up session middleware
app.use(session({
  secret: 'secret-key',
  store: store,
  resave: false,
  saveUninitialized: false
}));

// Set up Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else if (!user) {
      res.status(401).send('Invalid email or password');
    } else {
      // Compare passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else if (!isMatch) {
          res.status(401).send('Invalid email or password');
        } else {
          // Create session
          req.session.userId = user._id;
          res.redirect('/dashboard');
        }
      });
    }
  });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      // Create new user
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword
      });

      // Save user to database
      user.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/login');
        }
      });
    }
  });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    // Find user by ID
    User.findById(req.session.userId, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.render('dashboard', { user: user });
      }
    });
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


This code sets up an Express.js server with routes for login, registration, and a dashboard. It uses Mongoose to interact with a MongoDB database and bcrypt to hash passwords. The server also uses sessions to store user data.

Please note that this is just an example and you should consider security and validation when building a real-world application.

Also, you need to create the views (index, login, register, dashboard) and the User model to make this code work.

You can create a new file called User.js in the models folder and add the following code:


// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;


You can also create the views (index, login, register, dashboard) in the views folder.

Please let me know if you need any further assistance.