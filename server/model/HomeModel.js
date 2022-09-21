const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new mongoose.Schema(
  {
    homeName: String,
  },
  { collection: "home" }
);

homeSchema.statics.findHome = function (homeId) {
  return this.findById(homeId).exec();
};

module.exports = mongoose.model("home", homeSchema);
