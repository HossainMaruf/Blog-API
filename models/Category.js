const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    sub: {
      type: []
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema);
