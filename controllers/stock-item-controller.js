
const StockItemModel = require("../models/stock-item-model");
const UserService = require("../services/user-service");
const PushNotificationService = require("../services/push-notification-service");

exports.checkBody = (req, res, next) => {
  if (!req.body.stockName || !req.body.stockType || req.body.stockInnerItems.length !== 4) {
    return res.status(400).send({
      status: "fail",
      message: "Invalid data provided in body",
    });
  }
  next();
};

exports.getTopFiveStockItems = async (req, res) => {
  try {
    const stockItems = await StockItemModel.find().limit(5).find({isDeleted: false}).sort('-createdAt');
    res.status(200).send({
      status: 'success',
      data: stockItems
    });
  } catch (error) {
    res.status(400).send({
      status: 'Fail',
      message: error.message
    });
  }
}

exports.getStockItems = async (req, res) => {
  try {
    // const tour = await Tour.findOne({_id: req.params.id});
    const stockItems = await StockItemModel.find();
    res.status(200).send({
      status: 'success',
      data: stockItems
    });
  } catch (error) {
    res.status(400).send({
      status: 'Fail',
      message: error.message
    });
  }
}

exports.addStockItem = async (req, res) => {
  try {
    const dateInString = JSON.parse(JSON.stringify(req.body.dateCreated));
    delete req.body.dateCreated;
    const newStockItem = await StockItemModel.create({...req.body, dateInString});
    res.status(201).send({
      status: 'success',
      data: newStockItem
    });
  } catch (error) {
    res.status(400).send({
      status: 'Fail',
      message: error
    });
  }
}

exports.updateStockItem = async (req, res) => {
  try {
    const updatedStockItem = await StockItemModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).send({
      status: 'success',
      data: {
        updatedStockItem
      }
    });
  } catch (error) {
    res.status(400).send({
      status: 'Fail',
      message: error.message
    });
  }
}

exports.deleteStockItem = async (req, res) => {
  try {
    const updatedStockItem = await StockItemModel.findByIdAndUpdate(req.params.id, {isDeleted: true});
    res.status(200).send({
      status: 'success',
      data: updatedStockItem
    });
  } catch (error) {
    res.status(400).send({
      status: 'Fail',
      message: error.message
    });
  }
}

exports.getStockItemsByStockType = async (req, res) => {
  try {
    const stockItemsByStockType = await StockItemModel.find({'stockType': req.params.stockType}).sort('-createdAt');;
    res.status(200).send({
      status: 'success',
      data: stockItemsByStockType
    });
  } catch (error) {
    res.status(400).send({
      status: 'Fail',
      message: error.message
    });
  }
}
