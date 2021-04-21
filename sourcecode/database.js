const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient

let db  = null;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost:27017/test')
    .then(client => {
        db = client.db();
        console.log("connected");
        callback()
    })
    .catch(err => {
        console.log(err)
    })
}

const getDb = () => {
    if(db != null)
     return db;
}

module.exports = {
    mongoConnect,
    getDb
}