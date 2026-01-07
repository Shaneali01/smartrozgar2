import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

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

  amount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ["wallet", "cash", "card", "upi"],
    required: true
  },

  status: {
    type: String,
    enum: ["initiated", "successful", "failed", "refunded"],
    default: "initiated"
  },

  transactionId: String,        // from Stripe/Razorpay
  platformFee: { type: Number, default: 0 },
  taskerEarning: Number,

  paidAt: Date
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
