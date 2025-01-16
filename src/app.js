console.log("Starting new connection");
const express = require("express");
const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);
// app.use("/user",userAuth);

app.get("/admin/delete", (req, res) => {
  res.send({firstName:"Anmol",lastName:"reshi"});
})

app.use("/admin/get", (req, res) => {
  res.send("hello from the test server");
});
app.use("/user/data", (req, res) => {
    res.send("hello from user server");
  });
app.use("/user/get",userAuth, (req, res) => {
  res.send("hello from user server");
});

// app.use("/", (req, res) => {
//   res.send("hello from main server");
// });

// app.listen(3000);// listen on port 3000
app.listen(3000, () => {
  console.log("Connect to port 3000.....");
});
