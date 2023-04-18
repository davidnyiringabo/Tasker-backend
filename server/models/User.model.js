const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({path: "./config.env"})
const jwtSecretKey = process.env.SECRET

var schemaForUser = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    about:{
        type: String,
        required: false
    }

})

schemaForUser.methods.generateAuthenticationToken = function (){

    const token = jwt.sign(
        {
            username: this.name,
            email: this.email
        }
        , 
        jwtSecretKey

    )

    return token
}
const DbUser = mongoose.model("DbUser",schemaForUser)

module.exports = DbUser