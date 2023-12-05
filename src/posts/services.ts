import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async ({ userId, desc, img }) => {
  const newPost = new Post({ author: userId, content: desc, img });
  return await newPost.save();
};

export const editPost = async (postId, payload) => {
  const postToUpdate = await Post.findById(postId);

  if (postToUpdate.userId === payload.userId) {
    await postToUpdate.updateOne({ $set: payload });
    return true;
  } else {
    return false;
  }
};

export const deletePost = async (postId, userId) => {
  const postToDelete = await Post.findById(postId);
  if (postToDelete.userId === userId) {
    await postToDelete.deleteOne();
    return true;
  } else {
    return false;
  }
};

export const likePost = async (postId, userId) => {
  const postToLike = await Post.findById(postId);

  if (!postToLike.likes.includes(userId)) {
    await postToLike.updateOne({ $push: { likes: userId } });
    return true;
  } else {
    await postToLike.updateOne({ $pull: { likes: userId } });
    return false;
  }
};

export const getSinglePost = async (postId) => {
  return await Post.findById(postId);
};

export const getTimelinePosts = async (userId) => {
  const currentUser = await User.findById(userId);
  const currentUserPosts = await Post.find({ userId: currentUser._id });
  const followingsPosts = await Promise.all(
    currentUser.followings.map((followingId) =>
      Post.find({ userId: followingId })
    )
  );

  return currentUserPosts.concat(...followingsPosts);
};

export const getUserAllPost = async (username) => {
  const currentUser = await User.findOne({ username });
  return await Post.find({ userId: currentUser._id });
};
