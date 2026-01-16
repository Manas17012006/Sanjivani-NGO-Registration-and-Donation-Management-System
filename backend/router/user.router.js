const express=require('express');
const router=express.Router();
const {getUserData,changeName,getAllDonations,getAllData,getAllUsers,deleteUser}=require('../controllers/user.controller');
const {userAuth}=require('../middleware/auth.mw')
router.post("/getUserData",userAuth,getUserData);
router.post("/changeName",userAuth,changeName);
router.post("/getAllDonations",userAuth,getAllDonations);
router.get("/getAllData",getAllData);
router.get("/getAllUsers",getAllUsers);
router.post("/deleteUser",deleteUser);
module.exports=router;