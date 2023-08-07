const mongoose = require('mongoose')
//mongoose schemas

const userSchema = new mongoose.Schema({
    username:{type:String},
    password:String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,}]
})



const adminSchema = new mongoose.Schema({
    username:String,
    password:String,
})


const courseSchema = new mongoose.Schema({
    title:String,
    Description:String,
    price:Number,
    imageLink:String,
    published:Boolean
})

//creating each model or compartment for each schema 

const User = mongoose.model('User',userSchema)
const Admin = mongoose.model('Admin',adminSchema)
const Course = mongoose.model('Course',courseSchema)


//exporting these all models for to general access

module.exports = {
    User,
    Admin,
    Course
}