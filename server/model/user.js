const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, default: null},
    email: {type: String, default: null},
    mobile_no: {type: String, default: null},
    pan_no: {type: String, default: null},
    aadhar_no: {type: String, default: null},
    voter_id: {type: String, default: null},
    age: {type: String, default: null},
    dob: {type: String, default: null},
    area: {type: String, default: null},
    married: {type: Boolean, default: false},
    password:{type: String, default: null},
})

module.exports = mongoose.model("user", userSchema);