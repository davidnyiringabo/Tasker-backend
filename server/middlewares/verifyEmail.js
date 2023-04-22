const DbUsers = require("../models/User.model")

const VerifyEmail = (req,res,next) =>{
    const email = req.body.email

    DbUsers.findOne({email: email})
            .then(response =>{
                if(response){
                     next()
                }
                else{
                    res.send("No account registered on that email. create new account instead.").status(411)
                }
            })
}
module.exports = VerifyEmail