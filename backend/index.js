const express =require('express');
const app=express();
const cors=require('cors');
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// ---------- MIDDLEWARE ----------
app.set("trust proxy", 1);
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
  })
);


const auth_route=require("./router/auth.router");
const user_route=require("./router/user.router")
const payment_route=require("./router/payment.router")
const export_route=require("./router/export.router");
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});
//Mongodb connection
async function connectdb()
{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

    }catch(err)
    {
        console.log("MongoDB error",err);
    }
}
connectdb();
//////router////
app.get("/",()=>{
  console.log("API WORKING")
})
app.use("/api/auth",auth_route);
app.use("/api/user",user_route);
app.use("/api/donation",payment_route);
app.use("/api",export_route);
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
})