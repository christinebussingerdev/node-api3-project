const express = require('express');
const dbConfig = require('../data/dbConfig');

const db = require('./userDb.js')

const user = express.Router();

user.post('/', validateUserData(), (req, res, next) => {
  db.insert(req.body)
  .then(user => {
    res.status(201).json(req.body)
  })
  .catch(err => next(err))
});

user.post('/:id/posts', validateUserId(),validateUserData(), (req, res, next) => {
  db.insert(req.body)
  .then(() => {
    res.status(201).json(req.body)
  })
  .catch(err => next(err))
});

user.get('/', (req, res, next) => {
  db.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => next(err))
});

user.get('/:id', (req, res, next) => {
  db.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => next(err))
});

user.get('/:id/posts', (req, res, next) => {
  db.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => next(err))
});

user.delete('/:id', validateUserId(), (req, res, next) => {
  db.remove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(err))
});

user.put('/:id', validateUserId(), validateUserData(), (req, res, next) => {
  db.update(req.params.id, req.body)
  .then(() => {
    res.status(200).json(req.body)
  })
  .catch(err => next(err))
});

//custom middleware

function validateUserId() {
  return(req, res, next) => {
    db.getById(req.params.id)
    .then(() => {
      if(user) {
        next()
      } else {
        res.status(404).json({error: "user not found"})
      }
    })
  }
}

function validateUserData() {
  return (req, res, next) => {
    if(req.body.name) {
      next()
    }
    else {
      res.status(400).json({error: 'required field NAME missing'})
    }
  }
}

function validatePostData() {
  return(req, res, next) => {
    // if (...)
  }
}


module.exports = user;
