const User = require('../models/user-model');

exports.getUsersIdWithExpoToken = async () => {
  const users = await User.find({notificationDisabled: false, isAvailable: true}, 'token');
  return users;
}
