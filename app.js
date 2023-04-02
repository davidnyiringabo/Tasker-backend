

// const express = require("express")
// const  {ObjectId} = require("mongodb")

// const {connectToDb, getDb} = require("./db")

// const app = express()
// app.use(express.json())
// const port  = 4000
// //db connection
// let db
// connectToDb((err)=>{
//     if(!err){
//         app.listen(port,(err)=>{        
//             console.log("the server is now running at port" + port)
//         })

//         db = getDb()
//  console.log(db.collection)

//     }
//  })


//  //routes
//  app.get("/",(req,res)=>{
//     res.json({message: "Welcome to the landing page"})
//  })
//  app.get("/users",(req,res)=>{

//     let books = []

//     db.collection("users")
//         .find()
//         .forEach((book)=>{books.push(book)})
//         .then(()=>{
//             res.status(200).json(books)
//         })
//         .catch((err)=>{
//             if(err) throw err
//         })
      
//     // res.send("Welcome to the landing page")
// })

// app.get("/user/:id",(req,res)=>{
//     if(ObjectId.isValid(req.params.id)){
//         let books = []

//         db.collection("users")
//             .findOne({_id: new ObjectId(req.params.id)})
//             .then((doc)=>{
//                 res.status(200).json(doc)
//             })
//             .catch((err)=>{
//                 if(err) throw err
//             })
//     }else{
//         res.status(500).json({message:"We don't know you by the way"})
//     }
   
      
// })

// app.post("/postuser",(req,res)=>{

//     const user = req.body
    
//     db.collection("users")
//         .insertOne({name: user.username,password: user.password,email: user.email})
//         .then(()=>{
//             res.status(201).send("Data saved successfully")
//         })
//         .catch((err)=>{
//             if(err) throw err
//         })

// })

// app.get("/user/:id",(req,res)=>{
//     if(ObjectId.isValid(req.params.id)){
//         let books = []

//         db.collection("users")
//             .findOne({_id: new ObjectId(req.params.id)})
//             .then((doc)=>{
//                 res.status(200).json(doc)
//             })
//             .catch((err)=>{
//                 if(err) throw err
//             })
//     }else{
//         res.status(500).json({message:"We don't know you by the way"})
//     }
   
      
// })


