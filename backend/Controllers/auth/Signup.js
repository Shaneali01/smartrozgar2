// routes/auth.js
import bcrypt from 'bcryptjs';
import Tasker from "../../Models/Tasker.js";
import Hirer from "../../Models/User.js";
export const signup = async (req, res) => {
  try {
    const {
      role,         // 'hirer' or 'tasker'
      fullName,
      phone,        // Received from frontend as 'phone'
      email,
      password,
      gender,
      age,
      address,      // { city, state, pincode }
      skills,       // Only for tasker
      hourlyRate    // Only for tasker
    } = req.body;

    // 1. Basic Field Validation
    if (!role || !['hirer', 'tasker'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Please select whether you are a Hirer or a Tasker."
      });
    }

    // Check for nested address fields specifically to avoid the 400 error
    if (!fullName || !phone || !password || !address?.city) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing: Name, Phone, Password, and City are mandatory."
      });
    }

    // 2. Check if user already exists
    // We check both collections because a phone number should be unique to the whole platform
    const existingHirer = await Hirer.findOne({ phoneNumber: phone });
    const existingTasker = await Tasker.findOne({ phoneNumber: phone });

    if (existingHirer || existingTasker) {
      return res.status(409).json({
        success: false,
        message: "This phone number is already registered. Please login."
      });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Prepare Common Data structure for Mongoose
    const commonData = {
      fullName,
      phoneNumber: phone, // Mapping 'phone' from req.body to 'phoneNumber' in Schema
      email: email ? email.toLowerCase() : undefined,
      password: hashedPassword,
      gender: gender || "other",
      age: age ? parseInt(age) : null,
      // Mapping the address array structure required by your schema
      address: [{
        city: address.city,
        state: address.state || "Punjab",
        pincode: address.pincode || "00000",
        isDefault: true
      }],
      isPhoneVerified: false,
      isProfileComplete: false
    };

    let newUser;

    // 5. Role-Specific Logic
    if (role === 'hirer') {
      newUser = await Hirer.create({
        ...commonData,
        totalSpent: 0,
        walletBalance: 0
      });
    } else {
      // Tasker Specific Validation
      if (!skills || !Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Taskers must select at least one skill."
        });
      }

      newUser = await Tasker.create({
        ...commonData,
        skills,
        hourlyRate: hourlyRate ? parseInt(hourlyRate) : 0,
        totalEarnings: 0,
        jobsCount: 0,
        rating: { average: 0, count: 0 },
        isApproved: false, // Taskers usually need admin approval
        isActive: true
      });
    }

    // 6. Final Response
    return res.status(201).json({
      success: true,
      message: role === 'tasker' ? "Registration successful! Pending admin approval." : "Account created successfully!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        role: role
      }
    });

  } catch (error) {
    console.error("SIGNUP_CONTROLLER_ERROR:", error);
    
    // Handle Mongoose Duplicate Key Error (e.g., Email unique constraint)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or Phone number already exists in our records."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later."
    });
  }
};
export default signup;