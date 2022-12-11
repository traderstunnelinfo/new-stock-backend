const express = require("express");
const nseController = require("../controllers/nse-controller");
const Authenticate = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * /api/nse/gainers :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: Getting gainers for NSE
 *    responses:
 *      '200':
 *        description: NSE gainers send successfully
 */

router.route("/gainers").get(nseController.getGainers);

/**
 * @swagger
 * /api/nse/losers :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: Getting gainers for NSE
 *    responses:
 *      '200':
 *        description: NSE gainers send successfully
 */

router.route("/losers").get(nseController.getLosers);

// router
//   .route("/gainers")
//   .post(Authenticate.authenticateUser, bsesController.getGainers);


/**
 * @swagger
 * /api/nse/indices :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: Getting gainers for BSE
 *    responses:
 *      '200':
 *        description: BSE indices send successfully
 */
router.route("/indices").get(nseController.getIndices);

module.exports = router;
