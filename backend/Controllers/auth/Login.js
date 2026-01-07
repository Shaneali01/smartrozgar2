import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Hirer from "../../Models/User.js";
import Tasker from "../../Models/Tasker.js";

const login = async (req, res) => {
  try {
    console.log("working")
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check Hirer first
    const user = await Hirer.findOne({ email });

    if (!user) {
      // If not Hirer check Tasker
      const tasker = await Tasker.findOne({ email });

      if (!tasker) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, tasker.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log(tasker)
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: tasker._id,
          name: tasker.name,
          email: tasker.email,
          role: tasker.role,
        },
      });
    }

    // Compare password for Hirer
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(user)

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default login;
