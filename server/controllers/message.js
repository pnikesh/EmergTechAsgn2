/*
 routes/message.js
 Nikesh Patel
 300970071
Feb 16, 2019 */
let express = require("express");
let router = express.Router();

let messageModel = require("../models/message");

//GET - to read msgs
let displayMessages = (req,res,next) => {
  messageModel.find((err, messageList) => {
      if(err){
          res.end(err);
      }else{
          res.json({success: true, msg: 'Contact List Displayed Successfully', messageList: messageList, user: req.user});

      }
  })};

// POST - to add msgs
let processMessage = (req,res,next) => {
  //Creating a new Modle object
  let newMessage = messageModel({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
      "email": req.body.email,
      "num": req.body.num,
      "subject": req.body.subject
  });

  messageModel.create(newMessage, (err, messageModel)=>{
      console.log(messageModel);
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          res.json({success: true, msg: 'Successfully Added New Message'});
      }
  });
};

//GET - to delete msgs
let deleteMessage = (req,res,next) => {
  let id = req.params.id;

  messageModel.remove( {_id:id} , (err, messageModel)=>{
    console.log(messageModel);  
    if(err){
        console.log(err);
          res.end(err);
      }
      else{
          res.json({success: true, msg: 'Successfully Deleted Message'});
      }
  });
};


//export all the methods
module.exports = {
  displayMessages,
  processMessage, 
  deleteMessage
}

