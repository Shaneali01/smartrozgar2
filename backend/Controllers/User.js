import User from "../Models/User.js";


const getUserById=async(req,res)=>{
    try{
        console.log("working")
        const User_id=req.params.userId;
        console.log(User_id)
        const user=await User.findById(User_id);
        console.log(user)
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export default getUserById