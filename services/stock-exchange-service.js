const http = require("./http-service");

exports.getGainers = (url) => {
  console.log('url -', url)
  return http.get(url);
};

exports.getIndices = (url) => {
  return http.get(url);
};
