import express from "express";
import cors from "cors";
import dbConnect from "./util/dbConnect.js";
import userRoute from "./routes/userRoute.js";

const app = express();

// listening the port
const server = app.listen(8080, () => {
  console.log("The Server Running  on the 8080 port...");
});

//connection to the DB
dbConnect();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// routes
app.use("/", userRoute);
