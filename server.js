const express = require('express');

const app = express();

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
  res.json('sign in working');
})


app.listen(3000, () => {
  console.log('app is running on port 3000');
})