const mongoose = require("mongoose")

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
    },deadline_day:{
        type: String,
        required: true
    },deadline_time:{
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

module.exports= DbTask