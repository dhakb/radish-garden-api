// Core modules
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

// Internal modules
import uploadMiddleware from "./middleware/upload.js"

// Routes
import conversationRoute from  "./routes/conversation.js"
import messageRoute from  "./routes/comment.js"
import userRoute from  "./routes/users.js"
import authRoute from  "./routes/login.js"
import postRoute from  "./routes/posts.js"
import imageRoute from  "./routes/image.js"
import commentRoute from  "./routes/comment.js"

const app = express()
console.log("heeey")

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



export default app