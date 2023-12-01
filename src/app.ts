// Core modules
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

// Internal modules
import uploadMiddleware from "./middleware/upload"

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



export default app