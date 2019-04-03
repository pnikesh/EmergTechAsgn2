/*
 models/contact.js
 Nikesh Patel
 300970071
Mar 28, 2019 */
let mongoose = require('mongoose');

// create a model class
let contactSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
},
{
    collection: "second"
});

module.exports = mongoose.model('contact', contactSchema);