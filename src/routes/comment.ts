import { Router } from "express";
import Comment from "../models/Comment.js";

const route = Router();

//add comment
route.post("/", async (req, res) => {
  const newComment = new Comment(req.body);

  try {
    const response = await newComment.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comments
route.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const response = await Comment.find({ postId });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Delete comment
route.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    const response = await Comment.findByIdAndDelete(commentId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Get comment
route.get("/single/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    const response = await Comment.findById(commentId);
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Update/edit comment
route.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    const response = await Comment.findByIdAndUpdate(commentId, req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default route;
