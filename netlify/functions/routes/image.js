const route = require("express").Router()
const mongoose = require("mongoose")
const Image = require("../models/Image")
const fs =  require("fs")


const imageRoute = (upload) => {
    // const connect = mongoose.createConnection(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

    let bucket;
    mongoose.connection.on("connected", () => {
        const db = mongoose.connections[0].db
        bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "uploads"
        })
    })

    // let bucket;
    // connect.once("open", () => {
    //     bucket = new mongoose.mongo.GridFSBucket(connect.db, {
    //         bucketName: "uploads"
    //     })
    // })

    // POST image (add to Image collection)
    route.post("/", upload.single("file"), async (req, res) => {
        console.log(req.file)
        let newImage = new Image({
            filename: req.file.filename,
            fileId: req.file.id,
            originalName: req.file.originalname
        })

        try {
            const response = await newImage.save()
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    })


    // GET image from Image collection by fileId
    route.get("/:imgId", async (req, res) => {
        const {imgId} = req.params
        try {
            const image = await Image.findOne({fileId: imgId})
            // gfs.openDownloadStreamByName(req)
            res.status(200).json(image)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    // GET: fetch image and render on browser
    route.get("/image/:filename", (req, res) => {

        const cursor = bucket?.find({filename: req.params.filename}).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "No files available"
                })
            }

            if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/jpg') {
                bucket.openDownloadStreamByName(req.params.filename).pipe(res)
            } else {
                res.status(404).json({err: "No Image Found!!!"})
            }
        })
        console.log("doc >>>>>", cursor)
    })


    return route
}


module.exports = imageRoute