const { userModel } = require('../models/users_model');
const { findByIdAndDelete, findOneAndDelete } = require('mongoose/lib/model');
const regForm = document.getElementById('register-form');
class DB {
    users = [{ }]
    async getAllUsers() {
        return await userModel.find();
        
    }

    async registerUser({ username,address,email,password }) {
      
      let username =document.regForm.getElementById('inputName').value
      let address = document.regForm.getElementById('inputAddress').value
      let email = document.regForm.getElementById('inputEmail').value
      let password = document.regForm.getElementById('inputPassword').value
       username = this.sanitize(username);
       address = this.sanitize(address);
       email = this.sanitize(email);
       password = this.sanitize(password);

      try {
            return { data: await new userModel({ username,address,email, password }).save() };

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

module.exports = { DB: new DB() }