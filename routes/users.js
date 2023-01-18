const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const User = require('../models/user')

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