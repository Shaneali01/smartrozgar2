import express from "express";
import signup from "../Controllers/auth/Signup.js";
import login from "../Controllers/auth/Login.js";


const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
export default router;