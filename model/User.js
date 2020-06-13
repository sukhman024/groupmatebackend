const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName :{
        type : String,
        required : true
    },
    lastName :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    phoneNumber :{
        type : Number,
        required : true
    },
    skillSet :{
        type : String,
        required : true
    },
    unit :{
        type : String,
        required : true
    },
    groupNum :{
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('User',UserSchema);