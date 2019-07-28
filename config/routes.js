const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('./data-model');

const { authenticate, generateJWT } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let { username, password } = req.body;

  if (username && password) {
    const hash = bcrypt.hashSync(password, 12);
    password = hash;

    db.add({ username, password })
      .then(newUser => {
        const token = generateJWT(newUser);
        res.status(201).json({
          id: newUser.id,
          username: newUser.username,
          token: token,
        });
      })
      .catch(error => {
        res
          .status(500)
          .json(
            'There was an error during the creating of a new user. ' + error,
          );
      });
  } else {
    res
      .status(400)
      .json('Not all information were provided to create a new user.');
  }
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  db.findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateJWT(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token,
        });
      } else {
        res.status(401).json({
          error: 'The provided credentials are incorrect.',
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: 'The was an error submitting your credentials for login.',
      });
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
