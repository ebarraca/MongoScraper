// article a.js_curation-click
// summary .content-meta__excerpt long-excerpt (p)
// URL a.js_curation-click (href)
//
//
// *scrape the information using cherrio- article, summary, URL
// come up with routes
//
// / (home - shows all scraped articles)
// /scrape (on click of a button you are going to call the scape route)
// /saved - saved articles

// NPM requires
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

// Requiring models
// var Note = require("./../models/Note.js");
// var Article = require("./../models/Article.js");

var db = require("../models");

router.get('/', function (req, res) {


}); // router.get '/'

router.get('/scrape', function (req, res) {
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


}); // router.get '/scrape'  this grabs stuff from the artice when you click on the article? getting info from database.. .getting note from article.
router.get('/article/:id', function (req, res) {



}); // router.post '/homes'
// when you make a note and you press submit you need to put that note in that artice in the database - posts the notes to the article  and this one you are putting the note in the database with the article.

router.post('/article/:id', function (req, res) {


}); // router.post '/homes'

module.exports = router;
