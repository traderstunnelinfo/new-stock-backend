const express = require("express");
const bseController = require("../controllers/bse-controller");
const Authenticate = require("../middlewares/auth");

const router = express.Router();

// /**
//  * @swagger
//  * /api/bse/gainers :
//  *  get:
//  *    consumes:
//  *      - application/x-www-form-urlencoded
//  *
//  *    description: Getting gainers for BSE
//  *    responses:
//  *      '200':
//  *        description: BSE gainers send successfully
//  */
// router.route("/gainers").post(Authenticate.authenticateUser, bseController.getGainers);

/**
 * @swagger
 * /api/bse/indices :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: Getting gainers for BSE
 *    responses:
 *      '200':
 *        description: BSE indices send successfully
 */
router.route("/indices").get(bseController.getIndices);

module.exports = router;
