require('dotenv').config()
const express = require('express')
const app = express()

//Database connection
const mongoose = require('mongoose')
console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Db is open"))



app.use(express.json())

const quotesRouter = require('./routes/quotes.js')
const usersRouter = require('./routes/users.js')
app.use('/quotes', quotesRouter)
app.use('/users', usersRouter)

app.listen(300, ()=> console.log("server started on port 300"))
