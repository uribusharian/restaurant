const mongoose = require('mongoose');
const {  findOneAndDelete } = require('mongoose/lib/model');
require('dotenv').config();




const menuSchema = new mongoose.Schema({
     
    dishType:String,
    dishName:String,
    price:Number,
    
     
 });

 const menuModel = mongoose.model('menu', menuSchema)

 module.exports = menuModel