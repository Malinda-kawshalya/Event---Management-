 const User=require("../Model/userModel");
 
 const getAllusers = async (req, res, next)=>{
         let Users;
        
         //get all users 
         try{
            users = await User.find();
        }
        catch(err){
            console.log(err);
        }
        //not found
        if(!users){
            return res.status(404).json({message:"User not found"});
        }
 }