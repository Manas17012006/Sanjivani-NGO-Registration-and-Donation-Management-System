require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.model");
const transporter = require("../config/nodemailer");

//register the user

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send({ success: false, message: "All fields required" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.send({
        success: false,
        message: "User Already exists,Login to continue",
      });
    }
    const pass = bcrypt.hashSync(password, 8);
    const new_user = await userModel.create({
      name: name,
      email: email,
      password: pass,
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to NGOConnect",
      html: `<div style="font-family:Arial,sans-serif;
            padding:15px;
            color:#333;">

  <h2 style="margin-bottom:8px;">
    Welcome to NGOConnect 🎉
  </h2>

  <p style="font-size:14px;">
    Your account has been successfully created.
  </p>

  <p style="font-size:13px;color:#555;">
    Login to get started and Contribute for the Better!
  </p>

  <p style="margin-top:15px;font-size:13px;">
    — Team <strong>NGOConnect</strong>
  </p>

</div>
`,
    };

    await transporter.sendMail(mailOptions);
    return res.send({ success: true, message: "User Registered Successfully" });
  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
}
///login ////
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ success: false, message: "All fields required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "Email Not Found,Register First",
      });
    }
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.send({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.token = token;
    await user.save();

    res.send({
      success: true,
      message: "Sending otp",
      token:token,
      user: { id: user._id, email: email },
    });
  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
}
///send verification otp
async function sendVerifyEmail(req, res) {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ success: false, message: "User Does not Exist" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.otp = otp;
    user.otpExp = Date.now() + 1 * 60 * 60 * 1000; //1 hour
    await user.save();
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verification OTP",
      html: `<div style="font-family:Arial,sans-serif;
            padding:15px;
            text-align:center;
            color:#333;">

  <h2 style="margin-bottom:8px;">OTP Verification</h2>

  <p style="font-size:14px;">
    Your OTP is
  </p>

  <div style="font-size:24px;
              font-weight:bold;
              letter-spacing:4px;
              margin:10px 0;">
    ${otp}
  </div>

  <p style="font-size:12px;color:#777;">
    Please do not share this OTP with anyone.
  </p>

</div>
`,
    };
await transporter.sendMail(mailOption);
res.send({success:true,message:"OTP sent to your email"});

  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
}
//verify otp
async function verifyEmail(req, res) {
  try {
    const { otp } = req.body;
    const userId = req.userId;

    if (!otp) {
      return res.send({
        success: false,
        message: "OTP is required",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }

    if (!user.otp || user.otp.toString().trim() !== otp.toString().trim()) {
      return res.json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    if (user.otpExp < Date.now()) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExp = "";
    await user.save();

    return res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
}
//logout
const logout = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    user.isVerified = false;
    user.token="";
    await user.save();
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
};

module.exports = { register, login,sendVerifyEmail,verifyEmail,logout};
