const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const crypto = require("crypto")
const multer = require("multer")
const {GridFsStorage} = require("multer-gridfs-storage")
const serverless = require("serverless-http")
const dotenv = require("dotenv").config()

const userRoute = require("./routes/users")
const authRoute = require("./routes/login")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const commentRoute = require("./routes/comment")
const imageRoute = require("./routes/image")
const path = require("path");

const app = express()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log("this >>>>>>>>", err)
    } else {
        console.log("connected to MongoDB")
    }
})




const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buff) =>{
                if(err) {
                    return reject(err)
                }

                const fileName = buff.toString("hex") + path.extname(file.originalname)
                const fileInfo = {
                    fileName: fileName,
                    bucketName:"uploads"
                }
                resolve(fileInfo)
            })
        })
    }
 })

const upload = multer({storage})



// Middleware
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(helmet({crossOriginResourcePolicy: false}))
// app.use(morgan("common"))




app.use("/.netlify/functions/index/api/users", userRoute)
app.use("/.netlify/functions/index/api/auth", authRoute)
app.use("/.netlify/functions/index/api/posts", postRoute)
app.use("/.netlify/functions/index/api/comments", commentRoute)
app.use("/.netlify/functions/index/api/conversations", conversationRoute)
app.use("/.netlify/functions/index/api/messages", messageRoute)
// app.use("/.netlify/functions/index/api/upload", imageRoute(upload))
app.use("/api/upload", imageRoute(upload))


app.listen(8080, () => {
    console.log("listening")
})
// module.exports.handler = serverless(app)