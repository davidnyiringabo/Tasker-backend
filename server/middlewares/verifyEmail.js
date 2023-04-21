const DbUsers = require("../models/User.model")

const VerifyEmail = (req,res,next) =>{
    const email = req.body.email

    DbUsers.findOne({email: email})
            .then(response =>{
                
                if(!response){
                    res.send("No account registered on that email. create new account instead.").status(401)
                }
            })
            .catch(err=> console.log(err))


            next()

}

module.exports = VerifyEmail