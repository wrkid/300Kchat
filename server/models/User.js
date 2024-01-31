const {Schema, model} = require('mongoose');

const User = new Schema({
  "login": {type: String, unique: true, required: true},
  "username": {type: String, unique: false, required: true},
  "password": {type: String, unique: true, required: true},
  "roles": [{type: String, ref: 'Role'}]
});

module.exports = model('User', User);