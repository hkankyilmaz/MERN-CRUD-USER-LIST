import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModel.js";

const createUser = async (req, res) => {};

const loginUser = async (req, res) => {};

const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};
const getAllUsers = async (req, res) => {};

export { createUser, loginUser, updateUser, getAllUsers, deleteUser };
