// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");


//will need to require models (.js files)

var PORT = process.env.PORT || 3100;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/onion";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// logging into mongoosedb
db.on("open", function() {
  console.log("Mongoose connection successful.");
});

var db = require("./models");

app.get('/', function (req, res) {
    // db.Article.find({})
    //   .then(function(dbArticle) {
    //     // If we were able to successfully find Articles, send them back to the client
    //     res.json(dbArticle);
    //   })
    //   .catch(function(err) {
    //     // If an error occurred, send it to the client
    //     res.json(err);
    //   });

res.send("Hello im working")
});

app.get('/scrape', function (req, res) {
    request("https://www.theonion.com", function(error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);

      // An empty array to save the data that we'll scrape
      var results = [];

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $("article").each(function(i, element) {
        // Save the text of the element in a "title" variable
        var title = $(this).children("header").children("h1").children("a").text();

        var link=$(this).children("header").children("h1").children("a").attr("href");

        var summary = $(this).children(".item__content").children(".excerpt").children("p").text();

        var article = {
            title: title,
            link: link,
            summary: summary
        }

        db.Article.create(article)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
          results.push(article);
      });
      console.log(results);

      // Log the results once you've looped through each of the elements found with cheerio
      // console.log(results);
    });

});

    app.get("/articles", function(req, res) {
        db.Article.find({}).populate("note")
          .then(function(dbArticle) {
            // If all Notes are successfully found, send them back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurs, send the error back to the client
            res.json(err);
          });
    });

    app.get("/saved", function(req, res) {
        // db.Article.find({})
        //   .then(function(dbArticle) {
        //     // If all Notes are successfully found, send them back to the client
        //     res.json(dbArticle);
        //   })
        //   .catch(function(err) {
        //     // If an error occurs, send the error back to the client
        //     res.json(err);
        //   });
    });

    app.get("/articles/:id", function(req, res) {
        console.log(req.body)

        db.Article.find({_id:req.params.id})
          .then(function(dbArticle) {
            // If all Notes are successfully found, send them back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurs, send the error back to the client
            res.json(err);

          });
    });

app.post('/articles/:id', function (req, res) {
    db.Article.findOneAndUpdate({_id:req.params.id}, {$set:req.body})
    .then(function(dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.redirect('/articles');
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });

});

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});
