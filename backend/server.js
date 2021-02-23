const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('MongoDB connection established successfully!');
    app.listen(port, () => console.log(`Example app listening on port: ${port}!`))
})
