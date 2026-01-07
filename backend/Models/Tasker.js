// models/Tasker.js
import mongoose from "mongoose"

const taskerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'tasker' },

  // Personal
  gender: { type: String, enum: ['Male', 'Female', 'other'], required: true },
  age: { type: Number, required: true },
  profilePicture: String,

  // Work
  skills: [{ type: String, required: true }],           // e.g., ["Cleaning", "Cooking"]
  hourlyRate: { type: Number, required: true },
  experienceYears: { type: Number, default: 0 },
  languages: [String],

  // Availability & Location
  serviceCities: [String],
  availability: { type: Map, of: String }, // e.g., { "monday": "9AM-6PM" }

  // Jobs & Earnings
  totalEarnings: { type: Number, default: 0 },
  jobsCount: { type: Number, default: 0 },

  // Documents & Approval
  documents: {
    aadhaar: String,
    photo: String
  },
  bankDetails: {
    accountNumber: String,
    ifsc: String,
    holderName: String
  },
  location: {
    type: { type: String, default: 'Point' },
    // coordinates: [longitude, latitude] // Note: Longitude first
  },
  // Status
  isApproved: { type: Boolean, default: false },     // Admin approves
  isPhoneVerified: { type: Boolean, default: false },
  isProfileComplete: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },

  
}, { timestamps: true });
export default mongoose.model('Tasker', taskerSchema);