import mongoose from "mongoose";

const DeleteLogSchema = new mongoose.Schema(
  {
    log: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.DeleteLog ||
  mongoose.model("DeleteLog", DeleteLogSchema);
