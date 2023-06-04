import DeleteLog from "../models/deleteLog.js";

const getAllSecLogs = async (req, res) => {
  try {
    const logs = await DeleteLog.find({}).sort({createdAt: 'desc'});
    res.status(200).json({
      succeded: true,
      logs,
      message: "Logs Succesfully Received",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: "Oh no, There is a Problem...",
      error,
    });
  }
};

export { getAllSecLogs };
