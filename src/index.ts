// Core modules
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()


// internal modules
import uploadMiddleware from "./middleware/upload"
const connectDB = require("./db/connectDB.js")


// Routes
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const commentRoute = require("./routes/comment")
const userRoute = require("./routes/users")
const authRoute = require("./routes/login")
const postRoute = require("./routes/posts")
const imageRoute = require("./routes/image")


const app = express()


// Middleware
app.use(cors())
app.use(express.json())
app.use(helmet({crossOriginResourcePolicy: false}))
app.use(morgan("common"))


app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
app.use("/api/comments", commentRoute)
app.use("/api/upload", imageRoute(uploadMiddleware))





const PORT = process.env.PORT
app.listen(PORT || 8080, () => {
    try {
        connectDB(`${process.env.MONGO_URI}`)
        console.log(`Server running on port ${PORT || "8080"}`)

    } catch(err) {
        console.log("Error while starting app a server:", err)
    }
})