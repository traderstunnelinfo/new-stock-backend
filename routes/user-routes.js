const express = require("express");
const userController = require("../controllers/user-controller");
const Authenticate = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * /api/auth/generateOTP :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: email
 *        required: true
 *        schema:
 *          type:string
 *        description: email
 *
 *    description: Generate OTP for user
 *    responses:
 *      '200':
 *        description: OTP sent to your gmail
 */

router
  .route("/generateOTP")
  .post(userController.checkBody, userController.generateOTP);

/**
 * @swagger
 * /api/auth/validateOTP :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: email
 *        required: true
 *        schema:
 *          type:string
 *        description: email
 *
 *      - in: formData
 *        name: otp
 *        required: true
 *        schema:
 *          type:string
 *        description: otp
 *
 *      - in: formData
 *        name: loginType
 *        required: true
 *        schema:
 *          type: string
 *        description: loginType
 *
 *    description: Validating OTP
 *    responses:
 *      '200':
 *        description: OTP validated successfully
 */

router.route("/validateOTP").post(userController.validateOTP);

/**
 * @swagger
 * /api/auth/save-token :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: token
 *        required: true
 *        schema:
 *          type:string
 *        description: device token
 *
 *      - in: formData
 *        name: isAvailable
 *        required: true
 *        schema:
 *          type:boolean
 *        description: isAvailable
 *
 *      - in: formData
 *        name: notificationDisabled
 *        required: true
 *        schema:
 *          type:boolean
 *        description: notificationDisabled
 *
 *    description: Save device token for user
 *    responses:
 *      '200':
 *        description: Token saved successfully
 */
router.route("/save-token").post(Authenticate.authenticateUser, userController.saveDeviceToken);

/**
 * @swagger
 * /api/auth/save-expo-token :
 *  post:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    parameters:
 *      - in: formData
 *        name: email
 *        required: true
 *        schema:
 *          type:string
 *        description: user email
 *
 *      - in: formData
 *        name: token
 *        required: true
 *        schema:
 *          type:boolean
 *        description: expo token
 *
 *    description: Save device token for user
 *    responses:
 *      '200':
 *        description: Token saved successfully
 */
router.route("/save-expo-token").post(userController.saveDeviceExpoToken);

/**
 * @swagger
 * /api/auth/user :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: send all stock items
 *    responses:
 *      '200':
 *        description: all stock items send successfully
 */
router.route("/user").get(userController.getUserDetails);

module.exports = router;
