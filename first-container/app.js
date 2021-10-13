const express = require("express");
const exphbs = require("express-handlebars");
const os = require("os");
const morgan = require("morgan");

const port = process.env.PORT || 8080;
const message = process.env.MESSAGE || "Have a blast learning Docker!";
const hostname = os.hostname();

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("static"));
app.use(morgan("combined"));

app.get("/", (req, res) => {
  const data = {
    message: message,
    hostName: hostname,
  };

  res.render("home", data);
});

app.listen(port, () => {
  console.log(`Listening on: http://${hostname}:${port}`);
});
