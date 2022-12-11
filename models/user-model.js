const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required to proceed'],
    unique: true,
    trim: true
  },
  mobileNumber: {
    type: Number
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  },
  loginType: {
    type: String
  },
  isOTPVerified: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  notificationDisabled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  dateInString: {
    type: String,
    default: new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}).toString()
  }
})

module.exports = mongoose.model('User', userSchema);
