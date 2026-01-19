import Job from "../Models/Jobs.js";


const createJob=async(req,res)=>{
    try {
        console.log(req.body)
        // Note: We pull all fields from req.body as mapped in the frontend payload
        const newJob = new Job({
          ...req.body,
          status: "pending", // Default status
          paymentStatus: "unpaid" // Default payment
        });
    
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
      } catch (error) {
        console.error("Mongoose Error:", error);
        res.status(400).json({ message: error.message });
      }
}

export {createJob};