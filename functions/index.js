const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const crypto = require("crypto")
const multer = require("multer")
const {GridFsStorage} = require("multer-gridfs-storage")
const dotenv = require("dotenv").config()
const serverless = require("serverless-http")

const userRoute = require("./routes/users")
const authRoute = require("./routes/login")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const imageRoute = require("./routes/image")
const path = require("path");

const app = express()
const route = express.Router()

mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to MongoDB")
    }
})




const storage = new GridFsStorage({
    url: `${process.env.MONGO_URL}`,
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

route.get("/", (req, res) => {
    res.json({
        "message": "test"
    })
})


app.use("/.netlify/functions/index/test", route)

app.use("/.netlify/functions/index/api/users", userRoute)
// app.use("/api/auth", authRoute)
app.use("/.netlify/functions/index/api/posts", postRoute)
app.use("/.netlify/functions/index/api/conversations", conversationRoute)
// app.use("/api/messages", messageRoute)
// app.use("/api/upload", imageRoute(upload))


// const PORT = process.env.PORT
// app.listen(PORT || 8080, () => {
//     console.log(`Server running on port ${PORT || 8080}`)
// })

module.exports.handler = serverless(app)