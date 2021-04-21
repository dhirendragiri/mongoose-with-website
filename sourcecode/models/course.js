

const getDb = require("../database").getDb

 module.exports =   class Course{
    constructor(_id,name,desciption,amount){
        this._id = _id;
        this.name = name;
        this.desciption = desciption;
        this.amount = amount;
    }

    save(callback){

        const db = getDb();

        db.collection("courses").insertOne(this)
        .then(res => {
            callback()
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    update(callback){
        const db =  getDb();

        db.collection("courses").updateOne({_id : this._id},{$set : this})
        .then(res => {
            callback();
        })
        .catch(err => {
            console.log(err)
        })
    }

    static fetchOne(id,callback){
        const db =  getDb();

        db.collection("courses").find({_id : id}).next()
        .then(res => {
            console.log(res);
            callback(res)
        })
    }

    static fetchAll(callback){

        const db =  getDb();


        db.collection("courses").find().toArray()
        .then(res => {
            callback(res)
        })
    }

    static deleteOne(id,callback)  {
        const db = getDb();

        db.collection('courses').deleteOne({_id : id})
        .then(res => {
            callback()
        })
    }
}