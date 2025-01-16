 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

 const userSchema = new Schema({
    gmail:{
        type:String,
        required:true,
     }, 
     password:{
        type:String,
        required:true,
     }
 })

 module.expert = mongoose.model(
    "userModel", //file name
    userSchema //function name
 )

 