import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./Routes/Auth.js";
import userRoutes from "./Routes/User.js"
dotenv.config();

const app=express();

app.use(cors({
    origin: "http://localhost:5173",  // Allow only your frontend origin
    methods: "GET,POST,PUT,DELETE",   // Allowed HTTP methods
    credentials: true                 // Allow cookies and authorization headers
  }));
app.use(express.json({limit: '50mb'}));
mongoose.connect((process.env.MONGO_URI))
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Error connecting to MongoDB:", err);
})

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes)

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});