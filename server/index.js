require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { getAllDevices, setConnection, addDevice } = require("./DeviceService");
const { getHomes } = require("./MemberService");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get("/api/devices", (req, res) => {
  console.log("[GET] /api/devices");
  getAllDevices().then((devices) => {
    res.json(devices);
  });
});

app.put("/api/devices/connect", (req, res) => {
  console.log("[PUT] /api/devices/connect");
  setConnection(req.body.serial, req.body.connected);
  res.send("connect");
});

app.post("/api/devices", (req, res) => {
  console.log("[POST] /api/devices");
  addDevice(req.body);
});

app.get("/api/users/:userId/homes", (req, res) => {
  const userId = req.params.userId;
  console.log("[GET] /api/users/" + userId + "/homes");

  getHomes(userId).then((member) => {
    res.json(member);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// const path = require("path");
// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "../client/build/index.html"));
// });
