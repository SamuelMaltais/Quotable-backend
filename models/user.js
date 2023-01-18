const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    quotesPosted:{
        type:Array,
    },
    dateCreated:{
        type:Date,
        required: true,
        default: Date.now
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    profilePic:{
        type: Number,
        required: true 
    }
})
module.exports = mongoose.model('User', userSchema)