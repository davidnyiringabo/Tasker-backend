const DbUser = require("../models/User.model")
const DbTask = require("../models/Task.model")
const NotificationDb = require("../models/Notification.model")
const bcyrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { ObjectId } = require("mongodb")
const nodemailer = require("nodemailer")
const OtpDB = require("../models/Otp.model")

exports.createUser = async (req,res)=>{
    console.log(req.body)
    if(!req.body.username && !req.body.email && !req.body.password){

        res.status(400).send(" ERROR : We can never save empty credentials in our database")
    }else{

           const salt = await bcyrpt.genSalt(14)
           const hashedPass = await bcyrpt.hash(req.body.password,salt)

            const user= new DbUser({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass            
        })
         user.save(user)
            .then(()=>{
                res.send("User created successfully")
            })       
            .catch(err=>{
                console.log("there was an error ",err)
                res.status(500).send(err)
            })        
    }
}

exports.getTasks = (req,res)=>{
    DbTask.find({email: req.params.email}).sort({ timestamp: -1 })
      .then((response)=>{
        console.log(response)
        res.send(response)

      })
      .catch(err=>{
        console.log(err)
      })
    // const date = Date.now()
    // console.log(date)
    // const document = {
    //             "description":"Finishing the Vanica project",
    //             "category":"work",
    //             "deadline":"12H35",
    //             "completed": true,
    //             "timestamp": date,
    //             "email":"check@gmail.com"
    // }
    // DbTask.create(document)
    //         .then((response)=>{
    //             console.log(response)
    //         })
    // res.send(tasks)
}

// -----------------------------CONTROLLER FOR CREATING A NEW TASK-------------------------------------------
exports.createNewTask = (req,res)=>{
 
    DbTask.create({
        description: req.body.description,
        category: req.body.category,
        deadline_day: req.body.deadline_day,
        deadline_time: req.body.deadline_time,
        completed: req.body.completed,
        email: req.body.email,
        timestamp: req.body.timestamp
    })      .then((response)=>{
        res.send(response)
    })
            .catch(err=>{
                console.log(err)
            })
}
exports.deleteTask = (req,res)=>{
   DbTask.deleteOne({_id: new ObjectId(req.params.id)})
    .then(respons=>{
        // console.log(respons)
        res
        .send(respons)
    })
}
// --------------------------------------------------------------------------------------------------------------

exports.findUser = async (req,res)=>{     
    const user =await DbUser.findOne({email: req.body.email})
       if(!user){
        res.status(201).send("This account doesn't exist, Create account instead")
        }
            try{        

                if(await bcyrpt.compare(req.body.password, user.password)){

                    const exp = Date.now() + 1000 * 60*60*24 

                    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

// ---------------------------------Set cookie----------------------------
                    // try{
                    //     // res.cookie("Authorization", token,{
                    //     //     expires: new Date(exp),
                    //     //     httpOnly: true,
                    //     //     sameSite: "lax",
                    //     //     secure: process.env.NODE_ENV === "production",
                    //     // })
                    // }
                    // catch(err){
                    //     console.log("There is an error in making a cookie",err)
                    // }
                    console.log(user.methods)
                    res.cookie("email",req.body.email)
                    res.status(200).send("Logged in successfully")
                    // res.status(200).send(token)
                //  res.send("Successfully logged in")
                }
                else{
                    res.status(401).send("Your are not allowed")
                }

            }
           catch(error){
            console.log(error)
           }
// ------------------------------------------------------------------------------------------------------------------------------------
}

exports.getUsers = (req,res)=>{
        DbUser.findOne({email: req.params.email})
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send(err)
        })
    }
// ROUTE WITH ERRORS 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀--------------------------------------------------------------
exports.checkAuth = (req,res)=>{

    console.log(req.body)
    res.sendStatus(200)
 }

 exports.logout= (req,res)=>{
   
    res.clearCookie("Authorization")
 }

//  ------------------------------------------------------------------------------------------------------------------

 exports.updateUser = (req,res)=>{
    console.log(req.params.email)
    DbUser.updateOne({email: req.params.email}, {$set: {username: req.body.name, about: req.body.about}})
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.updateAscompleted = (req,res)=>{
    console.log(req.params.id)
    DbTask.updateOne({_id: new ObjectId(req.params.id)}, {$set: {completed: true}})
    .then(()=>{
        res.send("updated successfully")
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.saveFeedback = (req,res)=>{
    console.log(req.body)
}

exports.generateOTPAndSendEmail = (req,res)=>{
    const email = req.body.email
    const otp = req.otp
    const nodemailer = require("nodemailer");
    
    async function sendEmail() {
    
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nyiringabodavid62@gmail.com", 
          pass: "dmfiztttgskzuvvq", 
        },
      });
    
       await transporter.sendMail({
        from: ' David NYIRINGABO,  developer of Tasker',
        to: email,
        subject: "Your recovery process from Tasker",
        html: ` 👋 Hello I'm David N. Developer of Tasker. <br> I've seen that you requested for password recovery.</br> <br> Click this button and continue with the process.
        </br> <button style="background-color: #0075FF; border: none; padding: 10px; border-radius: 10px; text-decolation: none; "><a href="https://frabjous-fudge-baab76.netlify.app/" target="_blank" style="text-decolation: none; color: white; font-weight: 600;">Reset password</a></button>`,
      })
       .then(() =>{
                console.log("email sent successfully")
                res.send(`email sent successfully to ${email}`).status(200)

            // OtpDB.create({email: email, otp: otp})
            //     .then((response)=> {  res.send(`email sent successfully to ${email}`).status(200)})
            //     .catch(err => console.log(err))
         })
    }
    
    sendEmail().catch(err=> res.send(err));
}

// exports.verifyOtp = async (req,res)=>{
//     const otp = await OtpDB.findOne({otp: req.body.otp})
//         .then(response =>{
//             // console.log(response)
//             // res.send(response)
//         })
//         .catch(err => console.log(err))

//     if(!otp){
//         res.send("invalid otp")
//     }
//     else{
//         console.log(otp)
//         res.send(otp)
//     }
//     console.log(otp)
// }


exports.resetPassword = async (req, res) =>{
    const salt = await bcyrpt.genSalt(14)
    const hashedPass = await bcyrpt.hash(req.body.password,salt)
    DbUser.updateOne({email: req.body.email}, {$set: {password: hashedPass}})
    .then(()=>{
        res.send("updated successfully").status(201)
    })
    .catch(err=>{
        console.log(err)
    })
}
