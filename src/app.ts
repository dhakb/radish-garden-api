import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

import uploadMiddleware from "./middleware/upload.js"

import conversationRoute from  "./conversations/routes.js"
import messageRoute from  "./messages/routes.js"
import userRoute from  "./users/routes.js"
import authRoute from  "./auth/routes.js"
import postRoute from  "./posts/routes.js"
import imageRoute from  "./images/routes.js"
import commentRoute from  "./comments/routes.js"

const app = express()

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