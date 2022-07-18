const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbConnect = require('./db/dbConnect');
const userModel = require('./db/userModel');

const app = express();

// body parser configuration
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.json({ message: 'hey, this is your server response' });
  next();
});

dbConnect();

// inform bcrypt to hash the password 10 times
const saltRounds = 10;

// register endpoint
app.post('/register', (req, res) => {
  // hash the password
  bcrypt
    .hash(req.body.password, saltRounds)
    .then(async (hashedPassword) => {
      try {
        const user = new userModel({
          email: req.body.email,
          password: hashedPassword,
        });

        await user.save();

        res.status(201).send({
          message: 'user created successfully',
          user,
        });
      } catch (err) {
        res.status(500).send({
          message: 'error creating user',
          err,
        });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: 'password was not hashed successfully',
        e,
      });
    });
});

// login endpoint
app.post('/login', async (req, res) => {
  try {
    // check if user is already registered
    const existingUser = await userModel.findOne({ email: req.body.email });

    const match = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (match) {
      // create jwt token
      const token = jwt.sign(
        {
          userId: existingUser._id,
          userEmail: existingUser.email,
        },
        'RANDOM-TOKEN',
        { expiresIn: '24h' }
      );

      // return success response
      res.status(200).send({
        message: 'login successful',
        email: existingUser.email,
        token,
      });
    } else {
      res.status(400).send({
        message: 'passwords does not match',
        err: new Error('passwords does not match'),
      });
    }
  } catch (err) {
    res.status(404).send({
      message: 'email not found',
      err,
    });
  }
});

module.exports = app;
