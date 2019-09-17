const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); // no longer actively maintained => switch to bcrypt || bcryptjs
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', //to be modified according to platform
    user : 'postgres',
    password : 'test',
    database : 'faceapp'
  }
});

// db.select('*').from('users').then(data => {
//   console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json(database.users) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })// DEPENDENCY INJECTION! of db & bcrypt
// get profile won't be used for now (future development)
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.listen(3000, () => {
  console.log('app is running on port 3000');
})