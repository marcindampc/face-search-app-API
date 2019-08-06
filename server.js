const express = require('express');

const app = express();


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = new user object
/profile/:userId --> GET = user information
/image --> PUT = user score count
*/

app.get('/', (req, res) => {
  res.send('get is working');
})

app.post('/signin', (req, res) => {
  res.send('sign in working');
})


app.listen(3000, () => {
  console.log('app is running on port 3000');
})