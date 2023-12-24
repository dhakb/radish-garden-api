import User from "../models/User.js";

export const updateUser = async (userId, payload) => {
  return User.findByIdAndUpdate(userId, { $set: payload }, { new: true });
};

export const deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId);
};

export const getUserByIdOrUsername = async (userId, username) => {
  return userId ? User.findById(userId) : User.findOne({ username });
};

export const getUserByUserName = async (username) => {
  const regex = new RegExp("^" + username);

  return User.find({ username: regex });
};

export const followUser = async (userToFollowId, userWantsToFollowId) => {
  const userToFollow = await User.findById(userToFollowId);
  if (!userToFollow.followers.includes(userWantsToFollowId)) {
    const updatedUser = await User.findByIdAndUpdate(
      userWantsToFollowId,
      { $push: { followings: userWantsToFollowId } },
      { new: true },
    );
    await userToFollow.update({ $push: { followers: userWantsToFollowId } });
    return updatedUser;
  } else {
    return false;
  }
};

export const unfollowUser = async (userToUnfollowId, userWantsToUnfollowId) => {
  const userToUnfollow = await User.findById(userToUnfollowId);
  if (userToUnfollow.followers.includes(userWantsToUnfollowId)) {
    const updatedUser = await User.findByIdAndUpdate(
      userWantsToUnfollowId,
      { $pull: { followings: userToUnfollowId } },
      { new: true },
    );
    await userToUnfollow.update({
      $pull: { followers: userWantsToUnfollowId },
    });
    return updatedUser;
  } else {
    return false;
  }
};

export const getUserFollowings = async (userId) => {
  const { followings: followingUsersIds } = await User.findById(userId);
  const followingsData = await Promise.all(
    followingUsersIds.map((userId) => User.findById(userId)),
  );

  return followingsData;
};
