const express = require('express');
const dbConfig = require('../data/dbConfig');

const db = require('./postDb.js')

const post = express.Router();

post.get('/', (req, res) => {
  db.find()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => next(err))
});

post.get('/:id', validatePostId(), (req, res) => {
  db.findById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => next(err))
});

post.delete('/:id', validatePostId(), (req, res) => {
  db.remove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(err))
});

post.put('/:id', validatePostId(), valdiatePostData(), (req, res) => {
  db.update(req.params.id, req.body)
  .then(() => {
    res.status(200).json(req.body)
  })
  .catch(err => next(err))
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    db.findById(req.params.id)
    .then(post => {
      if (post) {
        next()
      } else {
        res.status(204).json({error: "user not found"})
      }
    })
  }
}

function valdiatePostData() {
  return (req, res, next) => {
    if (!req.body.text || !req.body.user_id) {
      res.status(400).json({error: "both text and user id are required."})
    } else {
      next()
    }
  }
}

module.exports = post;