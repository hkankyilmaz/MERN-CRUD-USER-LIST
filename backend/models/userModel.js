import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      reqired: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
      default: null,
    },
    role: {
      type: String,
      default: "User",
    },
    gender: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "Active",
    },
    log: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
