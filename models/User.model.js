const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: [true, 'This username is already taken.'],
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: [true, 'The email is required.'],
      unique: [true, 'This email is already registered.'],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: [true, 'A role is required'],
      enum: ['admin', 'user', 'animator'],
      default: 'user'
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
