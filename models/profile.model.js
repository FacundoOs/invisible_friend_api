const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Profile", profileSchema);

module.exports = Exercise;
