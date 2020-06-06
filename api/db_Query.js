
const db = require('../data/db_config');

module.exports = {
    PostAdmin,
    findAdmin,
    getUsers
}

//POST A PERSON TO BE ADMIN 
function PostAdmin(body) {
    return db('admin').insert(body)
}

function findAdmin(username) {
    return db('admin').where({ username }).first();
}

function getUsers() {
    return db('users');
}