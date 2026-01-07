import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  hirer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hirer",
    required: true
  },
  tasker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tasker",
    required: true
  },

  // Job details
  service: { type: String, required: true },   // Cleaning, Cooking
  address: {
    houseNo: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  date: { type: Date, required: true },
  hours: Number,
  price: Number,

  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid", "refunded"],
    default: "unpaid"
  },

  ratingGiven: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
