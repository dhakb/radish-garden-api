const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    filename: {
        required: true,
        type: String
    },
    fileId: {
        required: true,
        type: String
    },
    originalName: {
        required: true,
        type: String
    },
    userId: {
        // required: true,
        type: String,
        default: ""
    },
}, {
    timestamps: true
})



module.exports = mongoose.model("Image", ImageSchema)