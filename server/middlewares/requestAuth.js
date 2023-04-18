const jwt = require("jsonwebtoken")
const DbUser = require("../models/User.model")
const token = require("../controllers/controller");
const { decode } = require("punycode");

function requestAuth(req,res,next){
    const token = req.cookies.Authorization;
    console.log(token)
const decoded = jwt.verify(token,process.env.SECRET)

 if(Date.now() > decoded.exp) return res.send("Anauthorised, the token expired")

 const user = DbUser.findById(decoded.sub)

 if(!user){
    res.send(401,"Unknown user")
 }
 else{
    req.user = user;
 }

     next()
}

module.exports = requestAuth