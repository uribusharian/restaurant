const mongoose = require('mongoose');
const {  findOneAndDelete } = require('mongoose/lib/model');
require('dotenv').config();




const pastOrdersSchema = new mongoose.Schema({
     
    
    order: Object,
    price: Number,
    
     
 });

 const pastOrdersModel = mongoose.model('pastOrder', pastOrdersSchema)

 module.exports = pastOrdersModel