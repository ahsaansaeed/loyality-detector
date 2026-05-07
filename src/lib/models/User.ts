import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, "Please provide a roll number"],
    trim: true,
  },
  answers: {
    type: Array,
    required: true,
  },
  snakeScore: {
    type: Number,
    required: true,
  },
  loyaltyScore: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
    enum: ["Certified Snake 😈", "Loyal Legend 💙"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.User || model("User", UserSchema);
