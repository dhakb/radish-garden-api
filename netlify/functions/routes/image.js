const route = require("express").Router()
const _path = require("path")
const mongoose = require("mongoose")
const Image = require("../models/Image")


const imageRoute = (upload) => {


    // POST image (add to Image collection)
    route.post("/", upload.single("file"), async (req, res) => {
        const {fieldname, filename, originalname, encoding, mimetype, path} =  req.file

        let newImage = new Image({
            fieldname,
            filename,
            originalname,
            encoding,
            mimetype,
            path: _path.join(process.cwd(), path)
        })


        try {
            const response = await newImage.save()
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }

    })


    // GET image from Image collection by fileId
    route.get("/:filename", async (req, res) => {
        const {filename} = req.params
        try {
            const image = await Image.findOne({filename: filename})
            console.log(image)
            res.status(200).json(image)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    // GET image from uploads collection by filename
    route.get("/image/:filename", (req, res) => {
        res.send("hahahaha")
    })


    return route
}


module.exports = imageRoute