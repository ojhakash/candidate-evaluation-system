import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cacheControl from "express-cache-controller";

import CandidateRoutes from "./../Candidate/route/CandidateRoute";
import AdminRoutes from "./../Admin/route/AdminRoute";

import User from '../Common/Models/User';
import Candidate from '../Common/Models/Candidate';
import Admin from '../Common/Models/Admin';
import Comment from '../Common/Models/Comment';
import Rating from '../Common/Models/Rating';
import Attachment from '../Common/Models/Attachment';

const port = 8000;

let appListenCallBack =async () => {
  try {
    await Candidate.sync();
    await Admin.sync();
    await Comment.sync();
    await Rating.sync();
    await Attachment.sync();
    console.log("Server started on port " + port);
  } catch (error) {
    console.log("Server started on port " + port + " with error " + error);
  }
};

export const createServer =  () => {
  const app = express();
  app.use(
    cacheControl({
      maxAge: 1,
      private: true,
    })
  );

  app.use(morgan("dev"));

  app.use(
    helmet({
      frameguard: false,
    })
  );

  if (process.env.kEnvironment == "prod") {
    app.use(cors());
  } else {
    app.use(cors());
  }

  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  app.use(bodyParser.json({ limit: "10mb" }));

  app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
  });

  app.use("/api", CandidateRoutes);
  app.use("/api", AdminRoutes);

  app.listen(port, appListenCallBack);
};