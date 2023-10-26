const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    subsciptionType:String,
    startDate:Date,
    endDate:Date
})

const Subscription = mongoose.model('Subscription',subscriptionSchema)

module.exports = Subscription