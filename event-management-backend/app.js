const express =require("express");
const mongoose =require("mongoose");

const app=express();

//middleware
app.use ("/",(req,res, next)=>
{
    res.send("it is working");
})

mongoose.connect("mongodb+srv://user:user123@event.l6ko8.mongodb.net/")
.then(()=>console.log("conneted to mongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=> console.log ((err)));