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


module.exports = scraper_controller;
