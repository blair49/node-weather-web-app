const request = require("postman-request");

function getWeather(lat, lon, callback) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7ab3ce5786f64efc900d14bda5dd71f4&units=metric`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Error occured while connecting to server", null);
      return;
    }
    if (body.cod > 200) {
      callback("Unable to fetch weather info for given location", null);
      return;
    }
    const { temp, feels_like } = body.main;
    callback(null, {
      temp,
      feels_like,
      description: body.weather[0].description,
    });
  });
}

module.exports = getWeather;
