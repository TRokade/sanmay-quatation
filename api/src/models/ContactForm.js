const mongoose = require("mongoose");

const contactformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      // match: [
      //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please enter a valid email address",
      // ],
    },
    phoneNumber: {
      type: String,
      trim: true,
      //   match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    Type: {
      type: String,
      default: null,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactForm", contactformSchema);
