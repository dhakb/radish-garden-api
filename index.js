const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const app = express()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to MongoDB")
    }
})


// Middleware
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})