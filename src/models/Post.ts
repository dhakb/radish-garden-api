import mongoose from "mongoose";

const { SchemaTypes } = mongoose;

const PostSchema = new mongoose.Schema(
  {
    content: {
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
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Post", PostSchema);
