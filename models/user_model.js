const mongoose = require('mongoose');
const { findByIdAndDelete, findOneAndDelete } = require('mongoose/lib/model');
require('dotenv').config();




mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true},(err)=>{
    if (!err) {console.log('MongoDB connection succeeded')}
    else {console.log('Error in DB connection' + err)}
});
require('../models/user_model');

const userSchema = new mongoose.Schema({
    username: String, 
    address: String,
    email:  String, 
    password: String,
    isAdmin: Boolean
    
});


const userModel =  mongoose.model('user', userSchema)


module.exports = userModel