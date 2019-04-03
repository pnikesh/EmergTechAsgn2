/*
 model/message.js
 Nikesh Patel
 300970071
Feb 16, 2019 */

let mongoose = require("mongoose");

//create model class
let msgSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    num: Number,
    subject: String
  },
  {
    collection: "userMessage"
  }
);

module.exports = mongoose.model("messages", msgSchema);
