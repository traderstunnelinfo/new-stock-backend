const pushNotificationService = require('../services/push-notification-service');
const UtilityService = require('../services/utility-service');
const PushNotificationModel = require('../models/push-notification-model');
const UserModel = require('../models/user-model');

exports.checkPuhNotificationBody = (req, res, next) => {
  if(!(req.body.title && req.body.message && req.body.dateCreated)) {
    return res.status(400).send({
      status: "fail",
      message: "title, message and dateCreated are required for push notification",
    });
  }
  next();
}

exports.sendPushNotification = (req, res) => {
  pushNotificationService.sendPushNotificationToAll(req.body.title, req.body.message)
      .then(() => {
        savePushNotification(req, res).then().catch();
      })
      .catch(error => {
        res.status(200).send({
          status: 500,
          message: error.message
        });
      })
}

const savePushNotification = async (req, res) => {
  try {
    const dateInString = JSON.parse(JSON.stringify(req.body.dateCreated));
    delete req.body.dateCreated;
    const notification = await PushNotificationModel.create({...req.body, dateInString});
    res.status(201).send({
      status: 'success',
      data: notification
    });
  } catch (error) {
    res.status(400).send({
      status: 'Fail',
      message: error.message
    });
  }
}

exports.updateNotificationDisabled = async (req, res) => {
  const user = UtilityService.decodeToken(req);
  if (user !== null) {
    try {
      if(!req.body.hasOwnProperty('notificationDisabled')) {
        res.status(400).send({
          status: 'Fail',
          message: 'required fields are not provided'
        });
      } else {
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, req.body, {
          new: true,
          runValidators: true
        });
        res.status(200).send({
          status: 'success',
          data: updatedUser
        });
      }
    } catch (error) {
      res.status(400).send({
        status: 'Fail',
        message: error
      });
    }
  } else {
    res.status(400).send({
      status: 'Fail',
      message: 'UnAuthenticated user'
    })
  }
}

exports.getAllNotifications = async (req, res) => {
  try {
    const data = await PushNotificationModel.find({}, {createdAt: 1, title: 1, message: 1, dateInString: 1}).sort('-createdAt');
    res.status(200).send({
      status: 200,
      message: "Success",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      status: "500",
      message: e.message,
    });
  }
};
