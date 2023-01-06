const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const crypto = require("crypto")
const multer = require("multer")
const serverless = require("serverless-http")
require("dotenv").config()

const userRoute = require("./routes/users")
const authRoute = require("./routes/login")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const commentRoute = require("./routes/comment")
const imageRoute = require("./routes/image")
const path = require("path");

const app = express()


mongoose.connect(`${process.env.MONGO_URI}`).
    catch((e) => {
        console.log("avoieeeee", e)
})




const storage = multer.diskStorage(({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {

        crypto.randomBytes(16, (err, buff) => {
            if(err) return err

            const filename = buff.toString("hex") + path.extname(file.originalname)
            cb(null, filename)
        })
    }
}))

const upload = multer({storage})



// Middleware
app.use(express.static("./uploads"))
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(helmet({crossOriginResourcePolicy: false}))
app.use(morgan("common"))




app.use("/.netlify/functions/index/api/users", userRoute)
app.use("/.netlify/functions/index/api/auth", authRoute)
app.use("/.netlify/functions/index/api/posts", postRoute)
app.use("/.netlify/functions/index/api/comments", commentRoute)
app.use("/.netlify/functions/index/api/conversations", conversationRoute)
app.use("/.netlify/functions/index/api/messages", messageRoute)
app.use("/.netlify/functions/index/api/upload", imageRoute(upload))


module.exports.handler = serverless(app)


// app.listen(8080, () => {
//     console.log("server is running")
// })