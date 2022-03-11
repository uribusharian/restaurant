const userModel = require('../models/user_model');
const menuModel = require('../models/menu_model');
const { findByIdAndDelete, findOneAndDelete, validate } = require('mongoose/lib/model');
const { db } = require('../models/user_model');
const { Query } = require('mongoose');
const { object, getValue } = require('mongoose/lib/utils');
const bcrypt = require("bcryptjs")


class DB {
    users = [{}];

    async findOneUser(email) {
        try {
            const user = await (userModel.find({ 'email': email }).exec());
            console.log(user)
            if (email === user[0].email) {
            
                return user

            }
        }

        catch (err) {
            console.log(err)
        };
    };

    async checkPassword(email, password) {

        const user = await (userModel.find({ 'email': email }).exec());
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            password = hash

        }));
        if ((email == user[0].email) && (password == user[0].password)) {

            return user
        }
        else {

            return false
        }


    };

    async registerUser({ name, address, email, password, isAdmin = false }) {


        name = this.sanitize(name);
        address = this.sanitize(address);
        email = this.sanitize(email);
        password = this.sanitize(password);


        try {
            if (await this.findOneUser(email)){
                return false
            }
            else{
            // hash password
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;

                password = hash

            }));

            return { data: await new userModel({ username: name, address, email, password, isAdmin }).save() };
            }
        } catch (e) {
            console.log(e);
            return { err: e.message }
        }
    };

    sanitize(inp) {
        return inp.replace(/<script>/g, '')
            ;
    }



    async deleteUser({ email }) {

        if (email !== user[0].email) {
            console.log("no such user")
        }
        else {
            await (userModel.findByIdAndDelete({ 'email': email }).exec());
        }
    }


    async addDishToMenu({ dishType, dishName, price }) {

        dishType = dishType;
        dishName = this.sanitize(dishName);
        price = price;
        try {
            return { data: await new menuModel({ dishType, dishName, price }).save() };
        }
        catch (e) {
            console.log(e);
            return { err: e.message }
        }


    }
    async dynamicMenu() {
        try {
            const menu = await (menuModel.find().exec())
            return menu
        }
        catch (e) {
            console.log(e);
            return { err: e.message }
        };

    };
    async removeDishFromMenu(dishname) {
        try {
            const dish = await (menuModel.findOneAndDelete({ 'dishname': dishname }).exec());
        }

        catch (err) {
            console.log(err)
        };

    }


};



module.exports = DB  