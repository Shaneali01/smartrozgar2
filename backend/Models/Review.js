import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
