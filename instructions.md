*figure out website to scrape

*find the information you want to scrape from cherrio

article a.js_curation-click
summary .content-meta__excerpt long-excerpt (p)
URL a.js_curation-click (href)

*scrape the information using cherrio- article, summary, URL
come up with routes

/ (home - shows all scraped articles)
/scrape (on click of a button you are going to call the scape route)
/saved - saved articles

*save to database - use exercise 11/save in server.js (talk to quintessa)
use mongoose
need models: (filter for your information - goes through a model and saves it that way; it validates your information before saving to database)
article.js - will have article, summary, url all strings all required - (make sure you have all the information before saving to the database)
note.js - title/body of note and strings and both would be required

*Show the articles/summary/URL
through javascript - handlebars will show information

*give the user the ability to save article
need a button which will need jquery to function
user saved articles will go to /saved.

*allow the user to leave notes
modal - front end form
submit button
notes need to be saved to database

inside database youll have two tables: articles (articles.js)/ notes (notes.js)

*allow the user to delete articles (deleting from database)
use mongoose .delete() method
