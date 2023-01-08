const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const crypto = require("crypto")
const multer = require("multer")
const {GridFsStorage} = require("multer-gridfs-storage")
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

mongoose.connect(`${process.env.MONGO_URI}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to MongoDB")
    }
})




const storage = new GridFsStorage({
    url: `${process.env.MONGO_URI}`,
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
app.use("/api/upload", imageRoute(upload))


const PORT = `${process.env.MONGO_URI}`
app.listen(PORT || 8080, () => {
    console.log(`Server running on port ${PORT || 8080}`)
})