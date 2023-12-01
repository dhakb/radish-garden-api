import fs from "node:fs"
import {Router} from "express"
import Image from "../models/Image"


const route = Router()

const imageRoute = (upload) => {

    // POST image (add to Image collection)
    route.post("/", upload.single("file"), async (req, res) => {

        let newImage = new Image({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            mimetype:req.file.mimetype,
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

        try {
            const image = await Image.findOne({filename: req.params.filename})
            const {filename} = image

            const readStream = fs.createReadStream(`./uploads/${filename}`)
            readStream.pipe(res)

        } catch (err) {
            res.status(500).json(err)
        }
    })


    return route
}


export default imageRoute