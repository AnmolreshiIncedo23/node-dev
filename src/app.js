console.log("Starting new connection");
const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("hello from the test server");
});

app.use("/", (req, res) => {
  res.send("hello from main server");
});
app.use("/t", (req, res) => {
  res.send("hello from test server");
});

// app.listen(3000);// listen on port 3000
app.listen(3000, () => {
  console.log("Connect to port 3000.....");
});
