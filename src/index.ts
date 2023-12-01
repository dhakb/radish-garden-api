// Core modules
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()


// internal modules
import uploadMiddleware from "./middleware/upload"
import connectDB from  "./db/connectDB"

// Routes
import conversationRoute from  "./routes/conversation"
import messageRoute from  "./routes/comment"
import userRoute from  "./routes/users"
import authRoute from  "./routes/users"
import postRoute from  "./routes/posts"
import imageRoute from  "./routes/image"
import commentRoute from  "./routes/comment"



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