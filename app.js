const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.send("Application is now up and running.");
});

app.listen(port, console.log(`Server is now listening to port ${port}.`));
