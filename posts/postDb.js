const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('posts');
}

function findById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
