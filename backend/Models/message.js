import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // the ID of the sender (Hirer or Tasker)
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // the ID of the receiver (Hirer or Tasker)
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job" // optional: link message to a job
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
