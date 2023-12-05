import Comment from "../models/Comment.js";

export const addComment = async (payload) => {
  const newComment = new Comment(payload);
  return newComment.save();
};

export const getComments = async (postId) => {
  return Comment.find({ postId });
};

export const deleteComment = async (commentId) => {
  return Comment.findByIdAndDelete(commentId);
};

export const getSingleComment = async (commentId) => {
  return Comment.findById(commentId);
};

export const updateComment = async (commentId, payload) => {
  return Comment.findByIdAndUpdate(commentId, payload);
};
