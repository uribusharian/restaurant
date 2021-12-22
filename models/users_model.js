const { Schema, createConnection } = require('mongoose');
const { findByIdAndDelete, findOneAndDelete } = require('mongoose/lib/model');
require('dotenv').config();

const userSchema = new Schema({
    username: String,
    address: String,
    email: String,
    password: String,

});

const con = createConnection(process.env.MONGO_CONNECTION);
const userModel = con.model('user', userSchema);

module.exports = { userModel, findByIdAndDelete, findOneAndDelete }