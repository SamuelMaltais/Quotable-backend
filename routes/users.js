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

router.post("/login", async(req, res) =>{
    try{
        var user = await User.find({userName: req.body.userName})
        if(req.body.password != user[0].password){
            res.status(400).json({"message":"wrong password"})
        }
        else{
            res.status(200).json({"message":"Login successful"})
        }
    }
    catch(err){
        res.status(400).json({"message":"No such user"})
    }
})
router.post(/delete/, async(req,res) => {
    try{
        const deleted = await User.deleteMany({userName: req.body.userName})
        res.status(200).json({"message": "User deleted"})
    }
    catch(err){
     res.status(400).json({"message": err.message})
    }
})

router.get("/list/", async(req,res) =>{
    try{
        var users = await User.find()
        var response = []
        for(var i = 0; i<users.length; i++){
            response.push(users[i].userName)
        }
        res.send(response)
    }
    catch(err){
        res.status(400).json({"message": err.message})
    }
})

router.get("/posts/:userName", async(req,res) =>{
    try{
        var user = await User.find({userName: req.params.userName})
        res.json({quotesPosted: user[0].quotesPosted})
    }
    catch(err){
        res.status(400).json({"message": err.message})
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
        const exists = await User.find({userName: user.userName})
        console.log(exists)
        if(exists.length != 0){
            res.json({message: 'Username Taken'})
        }
        else{
            await user.save()
            res.json({message: 'Created User'})
        }  
    }
    catch(err){
        res.json({message: err.message})
    }
})

module.exports = router