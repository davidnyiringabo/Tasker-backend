const mongoose = require("mongoose")

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
    }

})

const schemaForTask = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },deadline:{
        type: String,
        required: true
    },completed:{
        type: Boolean,
        required: false
    },
    timestamp:{
        type: Number,
        required: false
    }

})

 const DbTask = mongoose.model("userTasks",schemaForTask)
 const DbUser = mongoose.model("DbUser",schemaForUser)

 schemaForUser.post('save', function(doc,next){
    console.log(doc)
 })

 module.exports.DbUser = DbUser
 module.exports.DbTask = DbTask

