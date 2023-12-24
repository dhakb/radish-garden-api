import User from "../models/User.js";

export const addUser = async ({ username, email, password }) => {
  const newUser = new User({
    username,
    email,
    password,
  });

  return newUser.save();
};

export const getUserByEmail = async (email) => {
  return User.findOne({ email: email });
};
