const DbStaffs = require("../models/model")
const DbUser = DbStaffs.DbUser
const DbTask = DbStaffs.DbTask
const bcyrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
exports.createUser = async (req,res)=>{
    
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
            .then(data=>{
                console.log(data)
                res.send("User created successfully")
            })       
            .catch(err=>{
                console.log("there was an error ",err)
                res.status(500).send(err)
            })
        
    }
}

exports.getTasks = (req,res)=>{
    console.log(req.params.email)
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
    console.log(req.body)
    
    DbTask.create({
        description: req.body.description,
        category: req.body.category,
        deadline: req.body.deadline,
        completed: req.body.completed,
        email: req.body.email,
        timestamp: req.body.timestamp,

    })
            .then(response=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })

    // res.send("the data received");
}
exports.deleteTask = (req,res)=>{
    console.log("the request is received")
    console.log(req.params.id)
   DbUser.deleteOne({_id: req.params.id})
    .then(response=>{
        console.log("requset handled")
        res
        .send(response)
    })
}
// --------------------------------------------------------------------------------------------------------------

exports.findUser = async (req,res)=>{
     
    const user =await DbUser.findOne({email: req.body.email})
       console.log(user)
       if(!user){
        res.status(201).send("This account doesn't exist, Create account instead")
        }
            try{             
                if(await bcyrpt.compare(req.body.password, user.password)){

                    const exp = Date.now() + 1000 * 60*60*24 

                    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

// ---------------------------------Set cookie----------------------------
                    try{
                        res.cookie("Authorization", token,{
                            expires: new Date(exp),
                            httpOnly: true,
                            sameSite: "lax",
                            secure: process.env.NODE_ENV === "production",
                        })
                    }
                    catch(err){
                        console.log("There is an error in making a cookie",err)
                    }
                    
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

            
  exports.getUsers = (req,res)=>{
    try{
        DbUser.findOne({email: req.body.email})
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send("Error",err)
        })
    }

    catch(err){
        console.log("There is an error", err)
    }
   
}

// ------------------------------------------------------------------------------------------------------------------------------------

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

    DbUser.updateOne({email: req.body.email}, {$set: {username: req.body.username,password: req.body.password}})
        .then(results=>{
            res.send(results)
        })
}

