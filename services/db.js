const  userModel  = require('../models/user_model');
const { findByIdAndDelete, findOneAndDelete, validate } = require('mongoose/lib/model');
const { db } = require('../models/user_model');
const { Query } = require('mongoose');
const { object, getValue } = require('mongoose/lib/utils');



class DB {
    users = [{ }];
    
    async findOneUser(email){
     try {  
       const query1 = await (userModel.find({'email':email}).exec());
        if (email===query1[0].email){      
        }
        }
      
      catch (err) {
    console.log(err)
    };    
    };

    async checkPassword(email,password){
          
       const query1 = await (userModel.find({'email':email}).exec());           
       if ((email==query1[0].email)&&(password==query1[0].password)){
            
            return true  
        }
        else{
            
            return false
        }
      
           
    };
   
   async registerUser({ name,address,email,password }) {
       
       
       name = this.sanitize(name);
       address = this.sanitize(address);
       email = this.sanitize(email);
       password = this.sanitize(password);
       
       try {
           return { data: await new userModel({ name,address,email, password }).save() };
           
        } catch (e) {
            console.log(e);
            return {  err: e.message }
        }
    }
    sanitize(inp) {
        return inp.replace(/<script>/g, '')
    }
    
    async deleteUser({id }) {
        
        try {
            return {  data: await new userModel({id}).findByIdAndDelete() };
            
            
        } catch (e) {
            console.log(e);
            return { status: false, err: e.message }
        }
    }
}

module.exports = DB  