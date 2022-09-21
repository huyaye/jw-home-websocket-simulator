const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    homeId: String,
    serial: String,
    type: String,
    name: String,
  },
  { collection: "device" }
);

deviceSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model("device", deviceSchema);
