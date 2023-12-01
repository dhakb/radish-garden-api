import mongoose from "mongoose"


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



export default mongoose.model("Image", ImageSchema)