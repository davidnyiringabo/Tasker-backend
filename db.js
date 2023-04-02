
const {MongoClient} = require("mongodb")

let dbConnection;

module.exports = {
    connectToDb: (cb)=>{
        MongoClient.connect("mongodb://127.0.0.1:27017/Tasker")
        .then((client)=>{
            dbConnection = client.db()
            return cb()
        })
        .catch((err)=>{
            console.log("A bullshit error is thrown in database connection, it is " + err)
            return cb(err)
        })


    },

    getDb: ()=> dbConnection
}

