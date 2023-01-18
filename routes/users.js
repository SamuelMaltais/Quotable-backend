const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const User = require('../models/user')
var fs = require('fs');
var path = require('path');

//get UserProfilePic
router.get("/profilePic/:id", async (req, res) => {
 let userProfilePic
    try{
    userProfilePic = await Subscriber.findById(req.params.id)
 }
 catch(err){
    res.status(500).json({"message":err.message})
 }
})
router.post("/", async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        quotesPosted: [],
    })
    try{
        await user.save()
        res.json({message: 'Created User'})
    }
    catch(err){
        res.json({message: err.message})
    }
})

module.exports = router