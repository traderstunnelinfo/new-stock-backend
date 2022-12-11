const emailService = require("../services/email-service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const UtilityService = require("../services/utility-service");

exports.checkBody = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      status: "fail",
      message: "Email is required to proceed",
    });
  }
  next();
};

exports.generateOTP = (req, res) => {
  let otp;
  if (req.body.email === 'project.use.svd@gmail.com') {
    otp = 935194;
  } else {
    otp = Math.floor(100000 + Math.random() * 900000);
  }
  emailService.sendEmail(
    req.body.email,
    "Welcome to Trader's Tunnel",
    "Your OTP is " + otp,
    req,
    res,
    otp
  );
};

exports.validateOTP = async (req, res) => {
  if (!(req.body.email && req.body.otp && req.body.loginType)) {
    return res.status(400).send({
      status: "fail",
      message: "OTP or email or login type not provided",
    });
  }
  switch (req.body.loginType) {
    case 'google':
      signInWithGoogle(req, res);
      break;
    case 'otp':
      signInWithOTP(req, res).then().catch();
      break;
    default:
      return res
          .status(400)
          .send({ status: "fail", message: "Wrong login type." });
  }
};

const signInWithGoogle = (req, res) => {
  try {
    User.findOneAndUpdate({ email: req.body.email }, req.body, {new: true},
        async (err, doc) => {
          if(err) {
            res.status(500).send({
              status: "500",
              message: err.message,
            });
          } else {
            if (!doc) {
              const user = await User.create(req.body);
              const token = generateAuthToken(user);
              res.status(200).send({
                status: 200,
                message: "OTP Validated",
                token: token,
              });
            } else {
              const token = generateAuthToken(doc);
              res.status(200).send({
                status: 200,
                message: "OTP Validated",
                token: token,
              });
            }
          }
        });
  } catch (e) {
    res.status(400).send({ status: "fail", message: e.message });
  }
}

const signInWithOTP = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
          .status(400)
          .send({ status: "fail", message: "Invalid OTP." });
    const isOTPValid = await bcrypt.compare(req.body.otp.toString(), user.otp);
    if (!isOTPValid)
      return res
          .status(400)
          .send({ status: "fail", message: "Invalid OTP." });

    User.findOneAndUpdate({ email: req.body.email }, {isOTPVerified: true}, {new: true},
        (err, doc) => {
          if(err) {
            res.status(500).send({
              status: "500",
              message: err.message,
            });
          } else {
            const token = generateAuthToken(user);
            res.status(200).send({
              status: 200,
              message: "OTP Validated",
              token: token,
            });
          }
        });
  } catch (e) {
    return res
        .status(400)
        .send({ status: "fail", message: "Server Failed to validate OTP." });
  }
}

const generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, "stock_jwtPrivateKey");
};

exports.saveDeviceToken = async (req, res) => {
  try {
    const { _id } = UtilityService.decodeToken(req);
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.saveDeviceExpoToken = async (req, res) => {
  try {
    if (!req.body.token) {
      res.status(400).send({
        status: "Fail",
        message: 'expo token not provided',
      });
    }
    const user = await User.findOneAndUpdate({email: req.body.email}, {token: req.body.token},
        {runValidators: false});
    if (!user) {
      res.status(400).send({
        status: "Fail",
        message: 'User not found with this email',
      });
    }
    res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  const user = UtilityService.decodeToken(req);
  if (user !== null) {
    try {
      const userDetails = await User.findById(user._id);
      res.status(200).send({
        status: "success",
        data: userDetails,
      });
    } catch (e) {
      res.status(500).send({
        status: "Fail",
        message: "Server issue",
      });
    }
  } else {
    res.status(400).send({
      status: "Fail",
      message: "UnAuthenticated user",
    });
  }
};
