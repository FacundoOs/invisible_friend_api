const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
  },
  emails: [
    {
      type: String,
      required: true,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
