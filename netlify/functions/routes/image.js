const route = require("express").Router()
const mongoose = require("mongoose")
const Image = require("../models/Image")


const imageRoute = (upload) => {
    const connect = mongoose.createConnection(`${process.env.MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true})

    let gfs;
    connect.once("open", () => {
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        })
    })

    // POST image (add to Image collection)
    route.post("/", upload.single("file"), async (req, res) => {

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
            gfs.openDownloadStreamByName(req)
            res.status(200).json(image)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    // GET image from uploads collection by filename
    route.get("/image/:filename", (req, res) => {
        gfs?.find({filename: req.params.filename}).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "No files available"
                })

            }

            if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/jpg') {
                gfs.openDownloadStreamByName(req.params.filename).pipe(res)
            } else {
                res.status(404).json({err: "No Image Found!!!"})
            }
        })
    })


    return route
}


module.exports = imageRoute