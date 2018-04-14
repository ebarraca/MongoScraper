// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        var savedArticleButton = "<button class='savedArticleButton' href='/saved' data-id='" + data[i]._id + "'> SAVE ARTICLE </button>"
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        $("#articles").append(savedArticleButton);
    }

    console.log(data)
});

// Whenever someone clicks a p tag
$(document).on("click", ".savedArticleButton", function() {
    var thisId = $(this).attr("data-id");

    // make an ajax call for the Article
    $.ajax({
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify({_id: thisId, saved: true}),
        url: "/articles/" + thisId,
        success: function(data) {
            console.log(data);
        }
    })
});


// PSUEDOCODE:
//scrape articles button doesnt work. needs to have jquery to make it scrape the articles.

// Im trying to do a ajax put route/ajax call to put the saved article on its own route.
// And put it on the saved route, but its not working. tried alternating between post and put routes. having no luck.

// on the page with the saved articles, i would have a notes button and a delete button. The notes button would take the id of the article and it would be a post route with a modal posted and you would save the note after its been passed through the notes model into the notes collection into the database.

// the delete button would have a route for /delete/:id and under that route there would be a mongoose.delete of the article and delete it from the database.

// add a delete route; add a href button with delete; under delete/:id route you would do the mongoose.delete.
