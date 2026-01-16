require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.model");
const transporter = require("../config/nodemailer");
const Donations = require("../models/donationModel.model");
async function getUserData(req, res) {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ success: false, message: "User Not Found" });
    }
    return res.send({ success: true, info: user });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

async function changeName(req, res) {
  try {
    const { name } = req.body;
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ success: false, message: "User Not Found" });
    }
    user.name = name;
    await user.save();
    return res.send({ success: true, message: "Edit successfull" });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

async function getAllDonations(req, res) {
  try {
    const userId = req.userId;
    const user = await Donations.find({ userId });
    if (!user) {
      return res.send({ success: false, message: "User Not Found" });
    }

    return res.send({ success: true, info: user });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}
//get all the data from the donation schema

async function getAllData(req, res) {
  try {
    const user = await Donations.find({});
    if (!user) {
      return res.send({ success: false, message: "Unexpected Error" });
    }

    return res.send({ success: true, info: user });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}
async function getAllUsers(req, res) {
  try {
    const user = await userModel.find({});
    if (!user) {
      return res.send({ success: false, message: "Unexpected Error" });
    }

    return res.send({ success: true, info: user });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}
//delete user with given userId
async function deleteUser(req, res) {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.send({
        success: false,
        message: "User ID is required",
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Deletion successful",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getUserData,
  changeName,
  getAllDonations,
  getAllData,
  getAllUsers,deleteUser
};
