const express = require('express');

// router imports
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

// init server
const server = express();
server.use(express.json())

// routers
server.use('/posts', postRouter)
server.use('/users', userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// custom middleware
function logger(req, res, next) {}

module.exports = server;
