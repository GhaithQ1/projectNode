const { catchAsync } = require("async-handler-express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/SindEmail");
const bcrypt = require("bcryptjs");

exports.SignIn = catchAsync(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });
  res.json({ data: user, token });
});

exports.LogIn = catchAsync(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });
  res.json({ data: user, token });
});



exports.GetMyData = catchAsync(async (req,res,next)=>{
  req.params.id = req.user._id;
  next()
})

exports.UpdateLoggedUser = catchAsync(async (req,res)=>{
  const user  = await User.findByIdAndUpdate(req.user._id , {
    name:req.body.name,
    email:req.body.email,
  },{new:true})

  res.json({data:user})
})

exports.ChangeMyPassword = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChanged: Date.now(),
    },
    { new: true }
  );

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });

  res.json({data:user , token});
});

exports.ForgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();
  const message = `Hi ${user.name} \n Enter this code to complete the password reset.\n ${resetCode}\n Thank you for helping us ensure the security of your account.`;

  await sendEmail({
    email: user.email,
    subject: "Your Password reset Code (valid For 10 min )",
    message,
  });

  res
    .status(200)
    .json({ status: "success", message: "Reset Code Sent To Email" });
});

exports.verifyResetCode = catchAsync(async (req, res) => {
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetcode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({ status: "success" });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  user.password = req.body.newpassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });

  res.json({ token });
});
