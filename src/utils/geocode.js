const request = require("postman-request");

function geocode(address, callback) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    address
  )}&limit=1&appid=7ab3ce5786f64efc900d14bda5dd71f4`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      return callback("Error occured while connecting to server", null);
    }
    if (body.length === 0) {
      return callback("Unable to fetch location info for given query", null);
    }
    const { lat, lon, name: placeName } = body[0];
    callback(null, { lat, lon, name: placeName });
  });
}

module.exports = geocode;
