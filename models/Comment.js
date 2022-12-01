const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    text: {
        type: String
    },
    authorId: {
        type: String
    },
    postId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Comment", CommentSchema, )