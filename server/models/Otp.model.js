const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({path: "./config.env"})
const jwtSecretKey = process.env.SECRET

var OtpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true,
    }

})

const OtpDB = mongoose.model("OtpDb",OtpSchema)

module.exports = OtpDB