const express = require("express");
const router = express.Router();
const notificationController = require('../controllers/notification-controller');
const Authenticate = require("../middlewares/auth");

/**
 * @swagger
 * /api/push-notification :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: Get all notifications
 *    responses:
 *      '200':
 *        description: notifications send successfully
 */
router.route("/").get(notificationController.getAllNotifications);

/**
 * @swagger
 * /api/push-notification :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: title
 *        required: true
 *        schema:
 *          type:string
 *        description: Notification title
 *
 *      - in: formData
 *        name: message
 *        required: true
 *        schema:
 *          type:string
 *        description: Notification message
 *
 *      - in: formData
 *        name: dateCreated
 *        required: true
 *        schema:
 *          type:string
 *        description: dateCreated
 *
 *    description: send puh notification to device
 *    responses:
 *      '200':
 *        description: Notification sent successfully
 */
router.route("/").post(notificationController.checkPuhNotificationBody,
    notificationController.sendPushNotification);


/**
 * @swagger
 * /api/push-notification/notification-disabled :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: notificationDisabled
 *        required: true
 *        schema:
 *          type:boolean
 *        description: notificationDisabled
 *
 *    description: change notificationDisabled
 *    responses:
 *      '200':
 *        description: notificationDisabled changed successfully
 */
router.route("/notification-disabled").post(notificationController.updateNotificationDisabled);

module.exports = router;
