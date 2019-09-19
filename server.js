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

app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))// DEPENDENCY INJECTION! of db & bcrypt; UPDATE: convert to function composition - (req, res) moved to controller
app.get('/profile/:id', profile.handleProfileGet(db)) // get profile won't be used for now (future development)
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall())

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT}`);
})