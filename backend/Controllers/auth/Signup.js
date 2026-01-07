// routes/auth.js
import bcrypt from 'bcryptjs';
import Tasker from "../../Models/Tasker.js";
import Hirer from "../../Models/User.js";
import express from "express"

// SINGLE SIGNUP API FOR BOTH HIRER & TASKER
const signup = async (req, res) => {
  try {
    const {
      role,                    // 'hirer' or 'tasker' — REQUIRED
      fullName,
      phone,
      email,
      password,
      gender,
      age,
      address,                 // { houseNo, street, landmark, city, state, pincode }
      skills,                  // Only for tasker
      hourlyRate               // Only for tasker
    } = req.body;

    // Validation
    if (!role || !['hirer', 'tasker'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role is required and must be 'hirer' or 'tasker'"
      });
    }

    if (!fullName || !phone || !password || !address?.city || !address?.state || !address?.pincode) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    // Check if phone already exists in BOTH collections
    const existingHirer = await Hirer.findOne({ phoneNumber: phone });
    const existingTasker = await Tasker.findOne({ phoneNumber: phone });
    if (existingHirer || existingTasker) {
      return res.status(409).json({
        success: false,
        message: "Phone number already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // COMMON FIELDS
    const commonData = {
      fullName,
      phoneNumber: phone,
      email: email || null,
      password: hashedPassword,
      gender: gender || null,
      age: age ? parseInt(age) : null,
      address: [{
        houseNo: address.houseNo || "",
        street: address.street || "",
        landmark: address.landmark || "",
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        isDefault: true
      }],
      isPhoneVerified: false,
      isProfileComplete: false
    };

    let user;
    let message;

    if (role === 'hirer') {
      // CREATE HIRER
      user = await Hirer.create({
        ...commonData,
        totalSpent: 0,
        walletBalance: 0
      });
      message = "Hirer account created successfully!";

    } else if (role === 'tasker') {
      // CREATE TASKER
      if (!skills || skills.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please select at least one skill"
        });
      }

      user = await Tasker.create({
        ...commonData,
        skills,
        hourlyRate: parseInt(hourlyRate) || 0,
        totalEarnings: 0,
        jobsCount: 0,
        rating: { average: 0, count: 0 },
        isApproved: false,        // Admin must approve
        isActive: true
      });
      message = "Tasker account created! Waiting for admin approval.";
    }

    // SUCCESS RESPONSE
    res.status(201).json({
      success: true,
      message,
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phoneNumber,
        role: role,
        isApproved: role === 'tasker' ? user.isApproved : true
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Phone number already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};
export default signup;