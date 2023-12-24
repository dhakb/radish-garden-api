import bcrypt from "bcrypt";
import * as AuthServices from "../auth/services.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await AuthServices.addUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthServices.getUserByEmail(email);
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("invalid password");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
