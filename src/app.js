const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup statuc directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", author: "Blair F." });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", author: "Blair F." });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    author: "Blair F.",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt exercitationem mollitia impedit ea deserunt obcaecati omnis vel possimus atque quod corporis, dolorum porro voluptatem numquam debitis sit totam officia autem!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  geocode(req.query.address, (error, data = {}) => {
    if (error) return res.send({ error });
    const { lat, lon, name: placeName } = data;
    weather(lat, lon, (error, { temp, feels_like, description }) => {
      if (error) return res.send({ error });
      res.send({ temp, feels_like, description, placeName });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Not Found",
    author: "Blair F.",
    message: "Help article found 404",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    author: "Blair F.",
    message: "Page found 404",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
