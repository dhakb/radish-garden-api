const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const crypto = require("crypto")
const multer = require("multer")
const {GridFsStorage} = require("multer-gridfs-storage")
const dotenv = require("dotenv").config()
const serverless =require("serverless-http")

const userRoute = require("./routes/users")
const authRoute = require("./routes/login")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const imageRoute = require("./routes/image")
const path = require("path");

const app = express()
const route = express.Router()

mongoose.connect("mongodb+srv://salyutopia:0H40CFTXvtWpU5Ag@salyut.zzpvqij.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to MongoDB")
    }
})

const storage = new GridFsStorage({
    url: "mongodb+srv://salyutopia:0H40CFTXvtWpU5Ag@salyut.zzpvqij.mongodb.net/?retryWrites=true&w=majority",
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


route.get("/", (req, res) => {
    res.json({
        "message": "test"
    })
})


// Middleware
app.use(cors())
app.use(express.json())
app.use(helmet({crossOriginResourcePolicy: false}))
app.use(morgan("common"))


app.use("/.netlify/functions/index", route)
app.use("/.netlify/functions/index/api/users", userRoute)
app.use("/.netlify/functions/index/api/auth", authRoute)
app.use("/.netlify/functions/index/api/posts", postRoute)
app.use("/.netlify/functions/index/api/conversations", conversationRoute)
app.use("/.netlify/functions/index/api/messages", messageRoute)
app.use("/.netlify/functions/index/api/upload", imageRoute(upload))



module.exports.handler = serverless(app)