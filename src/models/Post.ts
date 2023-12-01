import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        // comments: {
        //     type: Array,
        //     default: [],
        //     max: 1000
        // }
    },
    {
        timestamps: true
    }
)


export default mongoose.model("Post", PostSchema)