const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    filename: {
        required: true,
        type: String
    },
    path: {
        required: true,
        type: String
    },
    originalName: {
        required: true,
        type: String
    },
    mimetype: {
        required: true,
        type: String
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("Image", ImageSchema)