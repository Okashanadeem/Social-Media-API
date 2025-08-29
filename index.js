require('dotenv').config()
const express = require('express')
const app = express()

const postRoute = require('./routes/postRoute')
const feedRoute = require('./routes/feedRoute')
const db = require('./config/db')

db()

app.use(express.json())

app.use('/api/post', postRoute)
app.use('/api/feed', feedRoute)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})