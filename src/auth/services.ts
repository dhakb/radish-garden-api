import User from "../models/User.js";

export const addUser = async ({ username, email, password }) => {
  const newUser = new User({
    username,
    email,
    password,
  });

  return await newUser.save();
};


export const getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

