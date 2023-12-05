import * as CommentsService from "../comments/services.js";

export const addComment = async (req, res) => {
  try {
    const response = await CommentsService.addComment(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const response = await CommentsService.getComments(postId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const response = await CommentsService.deleteComment(commentId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getSingleComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const response = await CommentsService.getSingleComment(commentId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const updateComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const response = await CommentsService.updateComment(commentId, req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};
