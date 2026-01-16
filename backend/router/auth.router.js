const express=require('express');
const router=express.Router();
const {register,login,sendVerifyEmail,verifyEmail,logout}=require('../controllers/auth.controller');
const {userAuth}=require('../middleware/auth.mw')
router.post("/register",register);
router.post("/login",login);
router.post("/send-otp",userAuth,sendVerifyEmail);
router.post("/verifyEmail",userAuth,verifyEmail);
router.post("/logout",userAuth,logout);
module.exports=router;