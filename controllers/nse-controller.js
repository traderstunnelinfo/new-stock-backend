const StockExchange = require("../models/stock-exchange-model");

exports.getGainers = async (req, res) => {
  try {
    let query = {_id: '617edc4888fef61b2d64bc07'};
    const data = await StockExchange.findOne(query, {'nse.gainers.data': 1});
    res.status(200).send({
      status: 200,
      message: "Success",
      stockType: "NSE",
      data: data.nse.gainers.data,
    });
  } catch (e) {
    res.status(500).send({
      status: "500",
      message: e.message,
    });
  }
};

exports.getLosers = async (req, res) => {
  try {
    let query = {_id: '617edc4888fef61b2d64bc07'};
    const data = await StockExchange.findOne(query, {'nse.losers.data': 1});
    res.status(200).send({
      status: 200,
      message: "Success",
      stockType: "NSE",
      data: data.nse.losers.data,
    });
  } catch (e) {
    res.status(500).send({
      status: "500",
      message: e.message,
    });
  }
};

exports.getIndices = async (req, res) => {
  try {
    let query = {_id: '617edc4888fef61b2d64bc07'};
    const data = await StockExchange.findOne(query, {'nse.allIndices.data': 1});
    res.status(200).send({
      status: 200,
      message: "Success",
      stockType: "NSE",
      data: data.nse.allIndices.data,
    });
  } catch (e) {
    res.status(500).send({
      status: "500",
      message: e.message,
    });
  }
};
