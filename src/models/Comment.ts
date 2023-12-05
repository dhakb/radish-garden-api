import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    authorId: {
      type: String,
    },
    postId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Comment", CommentSchema);
