import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    const posts = await User.find({});
    res.status(200).json({
      succeded: true,
      posts,
      message: "Users Info Succesfully Received",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    // generate salt to has password
    const salt = await bcrypt.genSalt(10);
    // create hash
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    res.status(200).json({
      succeded: true,
      user: newUser,
      message: "Succesfully Registered",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        succeded: false,
        message: "The Email is already registered",
        error,
      });
    } else {
      res.status(500).json({
        succeded: false,
        message: "Oh no, There is a Problem...",
        error,
      });
    }
  }
};

/**
 * I dont use loginUser func.
 * I use NextAuth instead of loginUser.
 * If you want you can enable this func via some code that you will change from client-side
 * this means change API request from client-side.
 */

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
const updateUser = async (req, res) => {
  try {
    const docId = req.body.id;
    const values = req.body.values;
    User.findByIdAndUpdate(docId, { $set: { ...values } }, function (err, doc) {
      if (err) {
        res.status(500).json({
          succeded: false,
          err,
        });
      } else {
        res.status(200).json({
          succeded: true,
          upDoc: doc,
          message: "Succesfully Updated",
        });
      }
      console.log("Belge güncellendi:", doc);
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};
const deleteUser = async (req, res) => {};

export { createUser, loginUser, updateUser, getAllUsers, deleteUser };
