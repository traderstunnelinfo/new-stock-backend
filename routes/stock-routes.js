const express = require("express");
const stockItemController = require("../controllers/stock-item-controller");
const Authenticate = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * /api/stock-items/top-five :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: send all stock items
 *    responses:
 *      '200':
 *        description: all stock items send successfully
 */
router.route("/top-five").get(stockItemController.getTopFiveStockItems);

/**
 * @swagger
 * /api/stock-items :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: send all stock items
 *    responses:
 *      '200':
 *        description: all stock items send successfully
 */
router.route("/").get(stockItemController.getStockItems);

/**
 * @swagger
 * /api/stock-items :
 *  post:
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - in: body
 *        name: stockItem
 *        schema:
 *          type: object
 *          required:
 *            - stockName
 *            - stockType
 *            - stockInnerItems
 *            - dateCreated
 *          properties:
 *            - stockName:
 *              type: string
 *            - stockType:
 *              type: string
 *            - dateCreated:
 *              type: string
 *            - stockInnerItems:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  value:
 *                    type: number
 *                  markColor:
 *                    type: string
 *
 *        description: create stock item
 *
 *    description: Adding stock items to collection
 *    responses:
 *      '200':
 *        description: Stock item added successfully
 */
router.route("/").post(stockItemController.checkBody, stockItemController.addStockItem);

/**
 * @swagger
 * /api/stock-items :
 *  patch:
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - in: body
 *        name: stockItem
 *        schema:
 *          type: object
 *          required:
 *            - stockName
 *            - stockType
 *            - stockInnerItems
 *          properties:
 *            - stockName:
 *              type: string
 *            - stockType:
 *              type: string
 *            - stockInnerItems:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  value:
 *                    type: number
 *                  markColor:
 *                    type: string
 *
 *        description: update stock item
 *    responses:
 *      '200':
 *        description: Stock item updated successfully
 */
router.route("/:id").patch(stockItemController.checkBody, stockItemController.updateStockItem);

/**
 * @swagger
 * /api/stock-items :
 *  delete:
 *    consumes:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Stock item deleted successfully
 */
router.route("/:id").delete(stockItemController.deleteStockItem);

/**
 * @swagger
 * /api/stock-items/:stockType :
 *  get:
 *    consumes:
 *      - application/x-www-form-urlencoded
 *
 *    description: send all stock items
 *    responses:
 *      '200':
 *        description: all stock items send successfully
 */
router.route("/:stockType").get(stockItemController.getStockItemsByStockType);

module.exports = router;
