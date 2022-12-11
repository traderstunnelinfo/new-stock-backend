const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user-model");

exports.sendEmail = (mailTo, subject, message, req, res, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: 'ogansuqlqpedkvpv',
    },
  });
  console.log("process.env.EMAIL:", process.env.EMAIL);
  console.log("process.env.EMAIL_PASS:", process.env.EMAIL_PASS);

  const mailOptions = {
    from: process.env.EMAIL,
    to: mailTo,
    subject: subject,
    text: message,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send({
          status: "500",
          message: "Failed to proceed",
        });

        // reject(error)
      } else {
        addUser(req, otp)
          .then((result) => {
            res.status(200).send({
              status: 200,
              message: "OTP forwarded to Email",
              data: result,
            });
          })
          .catch((e) => {
            console.log(e);
            res.status(400).send({
              status: "fail",
              message: "Something went wrong with Server",
            });
          });
        // resolve()
      }
    });
  });
};

const addUser = (req, otp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = { ...req.body, otp };
      let user = new User(_.pick(data, ["email", "otp"]));
      const salt = await bcrypt.genSalt(10);
      const encryptedOtp = await bcrypt.hash(user.otp.toString(), salt);

      let userInDB = await User.findOne({ email: req.body.email });
      if (userInDB) {
        userInDB.otp = encryptedOtp;
        const userCreated = await User.findByIdAndUpdate(
          userInDB._id,
          userInDB,
          {
            new: true,
            runValidators: true,
          }
        );
        resolve(userCreated);
      } else {
        user.otp = encryptedOtp;
        const userCreated = await user.save();
        resolve(userCreated);
      }
    } catch (e) {
      reject(e);
    }
  });
};
