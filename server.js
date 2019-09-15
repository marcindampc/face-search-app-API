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
    password : '',
    database : 'faceapp'
  }
});

console.log(db.select('*').from('users'));


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'apple',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Lidka',
      email: 'lidka@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

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
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(404).json('not found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(404).json('not found')
  }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.


app.listen(3000, () => {
  console.log('app is running on port 3000');
})