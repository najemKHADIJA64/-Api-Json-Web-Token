const express = require('express');
const mongoose =require('mongoose');
// const validator =require('validator');


const userSchema = mongoose.Schema({

    nom:{
        type :String,
        required : true,
        // validate: [validators.notEmpty, 'Name is empty']
    },
    prenom:{
        type :String,
        required : true,
        // validate: [validators.notEmpty, 'lastname is empty']
    },
    email:{
        type :String,
        required : true,
    //      validate: [
    //     { validator: validators.notEmpty, msg: 'Email is empty' },
    //     { validator: validators.isEmail, msg: 'Invalid email' }
    //   ]
    },
    password:{
        type :String,
        required : true,
        // validate: [validators.notEmpty, 'lastname is empty']
    },
    role:{
        type :String,
        enum: ['user', 'admin', 'technicien'],
        default: 'user',
    },

})

 module.exports =mongoose.model('user', userSchema);