const StockExchange = require("../models/stock-exchange-model");

exports.getIndices = async (req, res) => {
  try {
    let query = {_id: '617edc4888fef61b2d64bc07'};
    const data = await StockExchange.findOne(query, {'bse.allIndices.data': 1});
      res.status(200).send({
        status: 200,
        message: "Success",
        stockType: "BSE",
        data: data.bse.allIndices.data,
      });
  } catch (e) {
    res.status(500).send({
      status: "500",
      message: e.message,
    });
  }
};
