const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:String,
    Description:String,
    price:Number,
    imageLink:String,
    category:String,
    published:Boolean
})


const Course = mongoose.model('Course',courseSchema)

module.exports = Course