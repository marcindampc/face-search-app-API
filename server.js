const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); // no longer actively maintained => switch to bcrypt || bcryptjs
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', //to be modified according to platform
    user : 'postgres',
    password : 'test',
    database : 'faceapp'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email
    && req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error logged in');
  }
})

app.post('/register', (req, res) => {
  const { email, name } = req.body;
  db('users')
    .returning('*')
    .insert({
    email: email,
    name: name,
    joined: new Date()
  } )
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})

// get profile won't be used for now (future development)
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'));
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    console.log(entries)
  })
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})