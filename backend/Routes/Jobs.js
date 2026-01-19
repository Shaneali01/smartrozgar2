import express from "express"
import { createJob } from "../Controllers/Jobs.js";



const router=express.Router();

router.post("/create-job",createJob);
export default router

