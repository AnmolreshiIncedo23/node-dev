const connectDb = require("./config/database");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const { userRouter } = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDb()
  .then(() => {
    console.log("database connection established....");
    app.listen(3000, () => {
      console.log("Connect to port 3000.....");
    });
  })
  .catch((error) => {
    console.error("database cannot be established....");
  });



