
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



// app.get('/', (req, res) => res.send ('home'));
// app.get('/users', {verifyToken},(req, res)=> res.send('user'))
// app.useauthRoute


app.listen(PORT, () => {
    console.log(`Server started on PORT:http://localhost:${PORT}`)
})