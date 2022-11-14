
const PORT = process.env.PORT || 5000
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const {connectToMongoDB} = require('./db')
const {verifyToken} = require('./middleware/checkAuth')
const cors = require('cors')



////Routes for handling Request
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const articleRoute = require("./routes/articles")
const homeRoute = require("./routes/home")
const draftRoute = require("./routes/draft")



require("dotenv").config()
app.use(express.json())

connectToMongoDB()

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/articles", articleRoute)
app.use("/api/home", homeRoute)
app.use("/api/draft", draftRoute)


app.get('/', (req, res) =>{
    res.status(200).json({
        "title": "The Masters",
        "description": " Body of Music",
        "author": "Chris Harris",
        "username": "C.Harris",
        "state": "Published",
        "readcount": 1,
        "readingtime": "",
        "tags": [
            "Music",
            "Arts",
            "Masters"
        ],
        "body": "Sit molestiae voluptates qui internos repellat quo dolor dicta. Est dolorem dignissimos ad voluptatem ducimus ut molestiae dolores et natus quaerat rem libero quod est quisquam natus ea expedita nesciunt. Sit reprehenderit expedita nam inventore autem vel dolores molestias rem alias impedit sit galisum dignissimos?",

        "title": "On the Dance Floor",
        "description": " Dancing",
        "author": "Alex Porter",
        "username": "Aporter",
        "state": "Published",
        "readcount": 1,
        "readingtime": "0",
        "tags": [
            "Music",
            "Lifestyle",
            "Arts"
        ],
        "body": "Sit molestiae voluptates qui internos repellat quo dolor dicta. Est dolorem dignissimos ad voluptatem ducimus ut molestiae dolores et natus quaerat rem libero quod est quisquam natus ea expedita nesciunt. Sit reprehenderit expedita nam inventore autem vel dolores molestias rem alias impedit sit galisum dignissimos?",
    })
})


app.listen(PORT, () => {
    console.log(`Server started on PORT:http://localhost:${PORT}`)
})