// const express = require("express");
const mongoose = require("mongoose")

const connectionToDB = async ()=>{
    try{
         await mongoose.connect(process.env.MONGO_URL)
            .then(()=> console.log("the database is connected",))
            }
            catch(err){
            console.log("this is the error",err)
        }    
}
module.exports = connectionToDB