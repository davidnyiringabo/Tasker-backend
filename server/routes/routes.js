const express = require("express")
const route = express.Router()
const path = require("path")
const controllers = require("../controllers/controller")
const requestAuth = require("../middlewares/requestAuth")

route.get('/api',(req,res)=>{
    res.send('welcome to Titan corporation')
})
route.get("/api/login",(req,res)=>{

    res.sendFile(path.join(__dirname+"\\..\\..\\landing.html"))
})
// route.get("/login",(req,res)=>{
//     res.send("this is the login page")
// })
route.post("/api/login",controllers.findUser)

route.get("/signup",(req,res)=>{
    res.send("this is the signup page")
})
route.post("/api/signup",controllers.createUser)
route.get("/api/tasks/:email",controllers.getTasks)
route.put("/api/updateUser/:email",controllers.updateUser)
route.get("/api/deleteTask/:id",controllers.deleteTask)
route.get("/api/getUser/:email",controllers.getUsers)
route.put("/api/updateAscompleted/:id",controllers.updateAscompleted)
route.get("/api/check-auth",requestAuth, controllers.checkAuth)
route.post("/api/saveFeedback", controllers.saveFeedback)  
route.post("/api/createTask",controllers.createNewTask)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

module.exports = route
