import bcrypt from "bcrypt";
import * as UserService from "../users/services.js";


export const getUser = async (req, res) => {
  const { username, userId } = req.query;
  try {
    const user = await UserService.getUserByIdOrUsername(userId, username);
    const { createdAt, updatedAt, password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getUsersByUserName = async (req, res) => {
  const { filter } = req.params;

  try {
    const response = await UserService.getUserByUserName(filter);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (req.body.userId === id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const response = await UserService.updateUser(id, req.body);

      res.status(200).json({
        response,
        message: "changes has been recorded.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Updating allowed only for own accounts!");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.body.userId === id || req.body.isAdmin) {
    try {
      const user = await UserService.deleteUser(id);
      console.log("user", user);
      res.status(200).json("User deleted!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Deleting allowed only for own accounts!");
  }
  res.json("end of deletion");
};





export const followUser = async (req, res) => {
  const { id } = req.params;

  if (id !== req.body.userId) {
    try {
      const res = await UserService.followUser(id, req.body.userId);
      if (res) {
        res.status(200).json({
          message: "user followed",
          res,
        });
      } else {
        res.status(400).json("user already followed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Not possible to follow yourself");
  }
};

export const unfollowUser = async (req, res) => {
  const { id } = req.params;

  if (id !== req.body.userId) {
    try {
      const updatedUser = UserService.unfollowUser(id, req.body.userId);

      if (updateUser) {
        res.status(200).json({
          message: "user followed",
          updatedUser,
        });
      } else {
        res.status(400).json("You can't unfollow who you don't follow");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Not possible to unfollow yourself");
  }
};

export const getUserFollowings = async (req, res) => {
  const { userId } = req.params;

  try {
    const followingsData = UserService.getUserFollowings(userId);

    res.status(200).json(followingsData);
  } catch (err) {
    res.status(500).json(err);
  }
};
