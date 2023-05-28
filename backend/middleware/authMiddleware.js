import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error) => {
        if (error) {
          console.log(err.message);
          res.status(401).json({
            succeded: false,
            message: "Oh no, Unvalid Token...",
            error,
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        succeded: false,
        message: "Please Login...",
        error,
      });
    }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      message: "Not authorized",
      error,
    });
  }
};

export { authenticateToken, checkUser };
