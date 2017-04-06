
//npm install --save request
var myTwitterKeys = require("./keys.js");

var consumerKey = myTwitterKeys.twitterKeys.consumer_key;
var consumerSecretKey = myTwitterKeys.twitterKeys.consumer_secret;
var tokenKey = myTwitterKeys.twitterKeys.access_token_key;
var tokenSecret = myTwitterKeys.twitterKeys.access_token_secret;

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var fs = require("fs");

var client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecretKey,
    access_token_key: tokenKey,
    access_token_secret: tokenSecret
});

var command = process.argv[2];

var numTweets = 20;

if (command === "my-tweets") {

    myTweets();
}

if (command === "spotify-this-song") {

    spotifyThis();

}

if (command === "movie-this") {

    movieThis();
}



if (command === "do-what-it-says") {


    fs.readFile("random.txt", 'utf8', function(error, data) {
        if (error) {
            throw error;
        }



        command = data.substr(0, data.indexOf(' '));

        var newArg = data.substr(data.indexOf(' ') + 1);

        process.argv[3] = newArg;

        spotifyThis();


    });

}


function myTweets() {


    var params = {
        screen_name: 'liquidhbox'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("Here are the past " + numTweets + " tweets from @" + tweets[0].user.screen_name + ":")

            fs.appendFile("log.txt", ("Here are the past " + numTweets +
                " tweets from @" + tweets[0].user.screen_name + ":" + "\r\n" + "\r\n"), function(err) {

                if (err) {
                    console.log(err);
                }
            });

            console.log(" ");

            for (var i = 0; i < numTweets; i++) {


                console.log(tweets[i].created_at);
                console.log("	" + tweets[i].text);
                console.log(" ");

                fs.appendFile("log.txt", (tweets[i].created_at + "\r\n" + tweets[i].text + "\r\n" + "\r\n"), function(err) {

                    if (err) {
                        console.log(err);
                    }
                });
            }



        }
    });
}

function spotifyThis() {


    if (process.argv[3]) {

        var songName = process.argv[3];




        spotify.search({
            type: 'track',
            query: songName
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }


            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].album.artists[0].name);

            fs.appendFile("log.txt", (data.tracks.items[0].name + "\r\n" + data.tracks.items[0].preview_url +
                "\r\n" + data.tracks.items[0].album.name + "\r\n" +
                data.tracks.items[0].album.artists[0].name + "\r\n" + "\r\n"), function(err) {

                if (err) {
                    console.log(err);
                }
            });


        });

    } else {

        spotify.lookup({
            type: 'track',
            id: "0hrBpAOgrt8RXigk83LLNE"
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log(data.name)
            console.log(data.preview_url)
            console.log(data.album.name)
            console.log(data.album.artists[0].name)


        });
    }
}

function movieThis() {


    if (process.argv[3]) {

        var movieName = process.argv[3];
        var movieQuery = (movieName.split(' ').join('_'));

        request(('http://www.omdbapi.com/?t=' + movieQuery), function(error, response, body) {

            if (!error && response.statusCode == 200) {



                var info = JSON.parse(body); // Turn the returned string into an object we can modify/read

                console.log(info.Title); // * Title of the movie.
                console.log("Year: " + info.Year); // * Year the movie came out.
                console.log("IMDB Rating: " + info.imdbRating); // * IMDB Rating of the movie.
                console.log("Country: " + info.Country); // * Country where the movie was produced.
                console.log("Language: " + info.Language); // * Language of the movie.
                console.log(info.Plot); // * Plot of the movie.
                console.log("Starring " + info.Actors); // * Actors in the movie.
                console.log("Rotten Tomatoes Score: " + info.Ratings[1].Value); // * Rotten Tomatoes Rating.

                var rtFix = (info.Title.split(' ').join('_') + "_")

                console.log("Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + rtFix + info.Year);


                fs.appendFile("log.txt", (info.Title + "\r\n" + info.Year + "\r\n" + info.imdbRating +
                    "\r\n" + info.Country + "\r\n" + info.Language + "\r\n" + info.Plot +
                    "\r\n" + info.Actors + "\r\n" + "Rotten Tomatoes Score: " + info.Ratings[1].Value +
                    "Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + rtFix + info.Year + "\r\n" + "\r\n"), function(err) {

                    if (err) {
                        console.log(err);
                    }
                });


            } else if (error) {

                console.log("Please type in a valid movie name.")
            }
        });

    } else {


        var movieName = "Mr Nobody";
        var movieQuery = (movieName.split(' ').join('_'));

        request(('http://www.omdbapi.com/?t=' + movieQuery), function(error, response, body) {

            if (!error && response.statusCode == 200) {



                var info = JSON.parse(body); // Turn the returned string into an object we can modify/read

                console.log(info.Title); // * Title of the movie.
                console.log("Year: " + info.Year); // * Year the movie came out.
                console.log("IMDB Rating: " + info.imdbRating); // * IMDB Rating of the movie.
                console.log("Country: " + info.Country); // * Country where the movie was produced.
                console.log("Language: " + info.Language); // * Language of the movie.
                console.log(info.Plot); // * Plot of the movie.
                console.log("Starring " + info.Actors); // * Actors in the movie.
                console.log("Rotten Tomatoes Score: " + info.Ratings[1].Value); // * Rotten Tomatoes Rating.

                var rtFix = (info.Title.split(' ').join('_') + "_")

                console.log("Rotten Tomatoes URL: https://www.rottentomatoes.com/m/Mr_Nobody_2009");
                // * Rotten Tomatoes URL.

                fs.appendFile("log.txt", (info.Title + "\r\n" + info.Year + "\r\n" + info.imdbRating +
                    "\r\n" + info.Country + "\r\n" + info.Language + "\r\n" + info.Plot +
                    "\r\n" + info.Actors + "\r\n" + "Rotten Tomatoes Score: " + info.Ratings[1].Value +
                    "Rotten Tomatoes URL: https://www.rottentomatoes.com/m/Mr_Nobody_2009" + "\r\n" + "\r\n"), function(err) {

                    if (err) {
                        console.log(err);
                    }
                });


            } else if (error) {

                console.log("Please type in a valid movie name.")
            }
        });




    }
}