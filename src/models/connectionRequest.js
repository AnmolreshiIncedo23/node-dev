const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" // refernce to user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is inncorect status Type`,
      },
    },
  },
  {
    timestamps: true,
  }
);


//connection.req
connectionRequestSchema.index({fromUserId :1,toUserId :1});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    console.log("Connection request");
    //check if from and to id are same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("Cannot send connection request to Oneself");
    }
    next();
})

const ConnectRequestModel =  new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectRequestModel;
