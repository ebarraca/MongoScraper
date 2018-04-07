// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//will need to require models (.js files)

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();


// Serve static content
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controller/scraper_controller.js");

app.use("/", routes);

mongoose.connect();

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// logging into mongoosedb
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});
