const express = require('express');
const UserRouter = express.Router();
const User = require('../model/User');
var twilio = require("twilio");

var accountSid = "AC0572356065972ecfbe6a244ca543fca1"; // Your Account SID from www.twilio.com/console
var authToken = "b6d02c08ebd96c0341d453b2cff33f1f"; // Your Auth Token from www.twilio.com/console

var twilio = require("twilio");
var client = new twilio(accountSid, authToken);
//CRUD
/**
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *  /users/update/{id}:
 *    parameters: [
        {
          "name": "userId",
          "in": "path",
          "required": true,
          "description": "ID of user that we want to find",
          "type": "string"
        }
      ]
 *    put:
 *      summary: Update a user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: User updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 * 
 */
//read
UserRouter.get('/',(req,res)=>{
    User.find({},(err,response)=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to get Users",
                msgError : true
            }});
        else{
            res.status(200).json({response});
        }
            
    });
});

UserRouter.post("/sendsms/", (req, res) => {
    client.messages
      .create({
        body: `${req.body.content}`,
        to: "+61469829385", // Text this number
        from: "+12029339131", // From a valid Twilio number
      })
      .then((message) => console.log("message sent", message.sid))
      .catch(err=>console.log(err));
    res.status(200).json({ status:'Success' });
  });

UserRouter.post('/userbyemail/',(req,res)=>{
    User.findOne({email:req.body.email},(err,response)=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to get Users",
                msgError : true
            }});
        else{
            res.status(200).json({response});
        }
    });
});
//comment for deploy
//Get all students
UserRouter.get("/students", (req, res) => {
    User.find({}, (err, users) => {
      let userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });
    });
    res.send(userMap);
  });
  

//create
UserRouter.post('/signup',(req,res)=>{
    const userObj = new User(req.body);
    userObj.save((err,document)=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to add User",
                msgError : true
            }});
        else
            res.status(200).json({message:{
                msgBody: "Successfully Added User",
                msgError : false
            }});
    });
});

//update 
UserRouter.put('/update/:id',(req,res)=>{
    User.findOneAndUpdate({email : req.params.id},req.body,{runValidators: true},(err,response)=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to Update User",
                msgError : true
            }});
        else
        res.status(200).json({message:{
            msgBody: "Successfully Updated User",
            msgError : false
        }});   
    });
});


module.exports = UserRouter;