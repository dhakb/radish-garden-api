import Comment from "../models/Comment.js";


export const addComment = async (payload) => {
    const newComment = new Comment(payload);
    return  await newComment.save();
}


export const getComments = async (postId) => {
    return await Comment.find({ postId });
}

export const deleteComment = async (commentId) => {
    return await Comment.findByIdAndDelete(commentId);
}

export const getSingleComment = async (commentId) => {
    return await Comment.findById(commentId);
}

export const updateComment = async (commentId, payload) => {
    return await Comment.findByIdAndUpdate(commentId, payload);
}