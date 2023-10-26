const mongoose = require('mongoose')
//mongoose schemas

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,}]
})


const User = mongoose.model('User',userSchema)


module.exports = User