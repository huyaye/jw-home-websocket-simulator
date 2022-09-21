const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    memId: String,
    homes: [
      {
        homeId: String,
        state: String,
      },
    ],
  },
  { collection: "member" }
);

memberSchema.statics.findMember = function (userId) {
  return this.findOne({ memId: userId });
};

module.exports = mongoose.model("member", memberSchema);
