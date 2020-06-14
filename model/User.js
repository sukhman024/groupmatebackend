const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - phoneNumber
 *          - skillSet
 *          - unit
 *          - groupNum
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, has to be unique.
 *          phoneNumber:
 *            type: string
 *          skillSet:
 *            type: string
 *          unit:
 *            type: string
 *          groupNum:
 *            type: string
 */
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