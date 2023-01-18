const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    quote:{
        type:String,
        required: true
    },
    likes:{
        type: Number,
        required: true
    },
    dateCreated:{
        type:Date,
        required: true,
        default: Date.now
    },
    author:{
        type: String
    }
})
module.exports = mongoose.model('Quote', quoteSchema)