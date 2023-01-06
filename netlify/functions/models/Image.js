const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    filename: {
        required: true,
        type: String
    },
    fieldname: {
        required: true,
        type: String
    },
    originalname: {
        required: true,
        type: String
    },
    path: {
        required: true,
        type: String
    },
    mimetype: {
        required: true,
        type: String
    },
    encoding: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("Image", ImageSchema)