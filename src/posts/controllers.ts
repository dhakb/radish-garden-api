import * as PostsService from "../posts/services.js";

export const cretePost = async (req, res) => {
  const { userId, desc, img } = req.body;

  try {
    const newPost = await PostsService.createPost({ userId, desc, img });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const editPost = async (req, res) => {
  const { id: postId } = req.params;

  try {
    const response = await PostsService.editPost(postId, req.body);

    if (response) {
      res.status(200).json("Post has been updated!");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { userId } = req.body;

  try {
    const isSuccess = PostsService.deletePost(postId, userId);
    if (isSuccess) {
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("You can only delete your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const { userId } = req.body;

  try {
    const isLiked = await PostsService.likePost(postId, userId);

    if (isLiked) {
      res.status(200).json("You liked post!");
    } else {
      res.status(200).json("You disliked post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;

  try {
    const post = await PostsService.getSinglePost(postId);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getTimelinePosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await PostsService.getTimelinePosts(userId);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserAllPost = async (req, res) => {
  const { username } = req.params;
  try {
    const posts = await PostsService.getUserAllPost(username);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
