const express=require('express');
const router=express.Router();

const {exportUser}=require('../controllers/export.controller');
router.get("/exportUser",exportUser);
module.exports=router;