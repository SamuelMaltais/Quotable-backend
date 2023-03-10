const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Quote = require('../models/quote')
const user = require('../models/user')
const User = require('../models/user')
const mongoose = require('mongoose')

//Prend tous les quotes
router.get('/', async (req, res) => {
    try{
        const quote = await Quote.find()
        console.log(quote)
        res.json(quote)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
router.post('/', async (req,res) => {
    var id = mongoose.Types.ObjectId();
    const quote = new Quote({
        _id: id,
        user: req.body.user,
        likes: 0,
        quote: req.body.quote
    })
    try{
        const userUpdate = await User.find({userName: req.body.user})
        const quoteExists = await Quote.find({quote: req.body.quote})
        if(userUpdate == null){
            res.status(500).json({"message": "cannot find user"})
        }
        else if(quoteExists == true){
            res.status(400).json({message: "This quote already exists"})
        }
        else{
            userUpdate[0].quotesPosted.push(req.body.quote)
            userUpdate[0].save()
            quote.save()
            res.status(200).json({message: "Quote posted succesfully"})
        }
    } catch(err) {
        res.status(400).json(err.message)
    }
})
//Prend un quote
router.get('/:id', async (req, res) => {
    let quote = await Quote.findById(req.params.id)
    res.send(quote.quote)
})
router.post('/delete/', async(req, res) =>{
    try{
        console.log(req.body)
        const quote = await Quote.findById(req.body._id)
        await quote.remove()
        res.json({message: 'Deleted quote'})
    }
    catch(err){
        res.json({message: err.message})
    }
})

async function getQuote(req, res, next) {
    let quote
    try {
      quote = await Quote.findById(req.params.id)
      if (subscriber == null) {
        return res.status(404).json({ message: 'Cannot find quote' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.quote = quote
    next()
  }

module.exports = router