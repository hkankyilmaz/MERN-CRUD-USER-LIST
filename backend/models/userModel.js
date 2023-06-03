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
    },
    role: {
      type: String,
    },
    gender: {
      type: String,
    },
    status: {
      active: Boolean,
    },
    log: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
