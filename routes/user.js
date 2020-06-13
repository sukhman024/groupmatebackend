const express = require("express");
const UserRouter = express.Router();
const User = require("../model/User");
var twilio = require("twilio");

var accountSid = "AC0572356065972ecfbe6a244ca543fca1"; // Your Account SID from www.twilio.com/console
var authToken = "cded4ffc45b4d13570a10968d0410e7d"; // Your Auth Token from www.twilio.com/console

var twilio = require("twilio");
var client = new twilio(accountSid, authToken);
//CRUD

//read
UserRouter.get("/", (req, res) => {
  console.log("received in get");
  User.find({}, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to get Users",
          msgError: true,
        },
      });
    else {
      res.status(200).json({ response });
    }
  });
});

UserRouter.post("/sendsms/", (req, res) => {
      client.messages
        .create({
          body: "Hello from Node",
          to: "+61469 829 385", // Text this number
          from: "+12029339131", // From a valid Twilio number
        })
        .then((message) => console.log("message sent", message.sid));
      // console.log("in else", req.body.phoneNumberreceiver, req.body.phoneNumbersender);
      res.status(200).json({ status:'Success' });
    });

UserRouter.post("/userbyemail/", (req, res) => {
  console.log("received in get by email", req.body);
  User.findOne({ email: req.body.email }, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to get Users",
          msgError: true,
        },
      });
    else {
      console.log("in else", response);
      res.status(200).json({ response });
    }
  });
});

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

// //create-sukhman NEW CODE
// UserRouter.post('/login',(req,res)=>{

//     console.log("login called");

//     const userObj = new User(req.body);
//     console.log("userObject==",userObj)

//     User.findById({email:userObj.email},(err,user)=>{
//         if(err){
//             console.log("DB wrong")
//         }
//         if(!user){
//             console.log("user wrong")
//         }
//         if(userObj.password !== user.password){
//            console.log("password wrong")
//         }
//         console.log("success")
//     })
// });

//create
UserRouter.post("/signup", (req, res) => {
  console.log("signup called");

  const userObj = new User(req.body);
  console.log("userObject==", userObj);
  userObj.save((err, document) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to add User",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Added User",
          msgError: false,
        },
      });
  });
});

// delete
UserRouter.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to Delete User",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Deleted User",
          msgError: false,
        },
      });
  });
});

//update
UserRouter.put("/update/:id", (req, res) => {
  console.log("in update", req.body);
  User.findOneAndUpdate(
    { email: req.params.id },
    req.body,
    { runValidators: true },
    (err, response) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Unable to Update User",
            msgError: true,
          },
        });
      else
        res.status(200).json({
          message: {
            msgBody: "Successfully Updated User",
            msgError: false,
          },
        });
    }
  );
});

module.exports = UserRouter;
