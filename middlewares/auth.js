const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token || token === "undefined")
    return res.status(401).send({status:  401, message: "Authentication invalid."});

  try {
    req.user = jwt.verify(token, 'stock_jwtPrivateKey');
    next();
  } catch (ex) {
    res.status(400).send({status:  404, message: "Invalid token."});
  }
}
