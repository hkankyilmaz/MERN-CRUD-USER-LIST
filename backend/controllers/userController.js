import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user: user });
  } catch (error) {
    console.log("ERROR", error);

    let errors2 = {};

    if (error.code === 11000) {
      errors2.email = "The Email is already registered";
    }

    console.log("ERRORS2:::", errors2);

    res.status(400).json(errors2);
  }
};

const LoginUser = async () => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      if (user.password == password) {
        const token = jwt.sign({ name: user.id }, `${process.env.JWT_SECRET}`, {
          expiresIn: "1d",
        });

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).json({
          user,
          token,
          succeded: true,
          message: "Login Succesfully",
        });
      }
    } else {
      res.status(401).json({
        succeded: false,
        message: "There is no such user",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
      console.log("same", same);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "There is no such user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
    } else {
      res.status(401).json({
        succeded: false,
        error: "Paswords are not matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};
const getAllUsers = async (req, res) => {};

export { createUser, loginUser, updateUser, getAllUsers, deleteUser };
