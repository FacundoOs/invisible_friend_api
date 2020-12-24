const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    username: {
      type: String, unique: false, required: true 
    },
    description: {
      type: String,
      required: true,
    },
    // picture: {
    //   type: String,
    //   required: false,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
);

const Exercise = mongoose.model("Profile", profileSchema);

module.exports = Exercise;
