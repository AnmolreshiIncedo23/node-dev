const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();
 

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectRequestModel.find({
      toUserId: loggedInUser._id,
      status:"interested"
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age about gender skills"
    );
    res.json({ message: "data fetched sucesfully", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERRPR:" + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName age gender skills photoUrl about")
      .populate("toUserId", "firstName lastName age gender skills photoUrl about");

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ message: "Connection fetched sucessfully", data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit >50 ? 50 : limit;

    const skip = (page-1)*limit;
    const connectionRequest = await ConnectRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        {
          toUserId: loggedInUser._id,
        },
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id },},
      ],
    }).select(" firstName lastName photoUrl about skills age gender").skip(skip).limit(limit);

    res.json({data:users});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { userRouter };
