const route = require("express").Router()
const mongoose = require("mongoose")
const {GridFSBucket, MongoClient} = require("mongodb")
const fs =  require("fs")
const {ObjectId} = require("mongodb")
const mongo = require("mongodb")
const Grid = require("gridfs-stream")
require("dotenv").config()

const Image = require("../models/Image")
const {response} = require("express");


// const imageRoute = (upload) => {
    const connect = mongoose.createConnection(`${process.env.MONGO_URI}`, {useNewUrlParser: true, useUnifiedTopology: true})


    // let bucket;
    // mongoose.connection.on("connected", () => {
    //     const db = mongoose.connections[0].db
    //     bucket = new mongoose.mongo.GridFSBucket(db, {
    //         bucketName: "uploads"
    //     })
    // })

    // let bucket;
    // connect.once("open", () => {
    //     bucket = new mongoose.mongo.GridFSBucket(connect.db, {
    //         bucketName: "uploads"
    //     })
    // })


    // const mongoClient = new MongoClient(`mongodb+srv://salyutopia:0H40CFTXvtWpU5Ag@salyut.zzpvqij.mongodb.net/?retryWrites=true&w=majority`)
    // mongoClient.connect().then(() => {
    //     console.log("mongo connected")
    // })
    // const gfs = Grid(mongoClient.db("test"), mongoose.mongo)
    // let bucket = new GridFSBucket(mongoClient.db("test"), {bucketName: "uploads"})


    // let gfs;
    connect.once("open", () => {
        let gfs = Grid(connect.db, mongoose.mongo)
        console.log("in")


    console.log("out")


    // POST image (add to Image collection)
    route.post("/", async (req, res) => {
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
            res.status(200).json(image)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    // GET: fetch image and render on browser
    route.get("/image/:filename", async (req, res) => {
        const _id = ObjectId(req.params.filename)

        gfs.collection("uploads")
        const cursor = gfs.files.find({_id: _id}).toArray((err, files) => {
            console.log(files)
            console.log(_id)
            console.log(gfs.curCol)
            // console.log(gfs)
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "No files available"
                })
            }

            res.contentType(files[0].contentType)
            const readStream = gfs.createReadStream({_id: req.params.filename})

            readStream.pipe(res)
            // readStream.pipe(readStream)
            // res.send("heee")

            // if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/jpg') {
            //     bucket.openDownloadStream(_id).pipe(res)
            // } else {
            //     res.status(404).json({err: "No Image Found!!!"})
            // }
        })
        console.log("doc >>>>>", cursor)
    })


    // return route
// }
    })

module.exports = route