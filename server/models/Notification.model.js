const mongoose = require("mongoose")
 
 const NotificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
 })

 const NotificationDb = mongoose.model("NotificationDb",NotificationSchema)

//  schemaForUser.post('save', function(doc,next){
//     console.log(doc)
//  })

 module.exports = NotificationDb

