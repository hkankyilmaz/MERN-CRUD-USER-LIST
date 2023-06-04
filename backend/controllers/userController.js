import User from "../models/userModel.js";
import DeleteLog from "../models/deleteLog.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      succeded: true,
      users,
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
        messageDetail: {
          email: "The Email is already registered",
        },
        message: "Oh no, There is a Problem...",
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
    const docId = req.body._id;
    let values = req.body;
    const log = req.body.log;
    delete values.log;
    delete values._id;

    User.findByIdAndUpdate(docId, {
      $set: { ...values },
      $push: { log: { $each: log, $position: 0 } },
    })
      .then((result) => {
        res.status(200).json({
          succeded: true,
          message: "Succesfully Updated",
          result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          succeded: false,
          message: "Oh no, There is a Problem...",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};
const updateUsers = async (req, res) => {
  try {
    const id = req.body.id;
    const value = req.body.status;
    const log = req.body.statusLog;

    console.log(req.body);

    User.updateMany(
      { _id: { $in: id } },
      { status: value, $push: { log: { $each: log, $position: 0 } } }
    ).then((result) => {
      res.status(200).json({
        succeded: true,
        message: "Succesfully Updated",
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.body.id;
    const deleteLogs = req.body.deleteLogs;

    await DeleteLog.create(deleteLogs);
    await User.deleteMany({ _id: { $in: id } }).then((result) => {
      res.status(200).json({
        succeded: true,
        message: "Succesfully Deleted",
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};

export {
  createUser,
  loginUser,
  updateUser,
  getAllUsers,
  deleteUser,
  updateUsers,
};
