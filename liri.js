require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request-promise");
var keys = require("./keys.js");
var fs = require("fs-extra");

var command = process.argv[2];
var input = process.argv[3];

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var screenName = {screen_name: 'ConanOBrien'};

function doTheThing() {
    switch (command) {
        case 'my-tweets':
            twitter.get("statuses/user_timeline", screenName, function(error, tweets, response) {
                if (!error) {
                    for(var i = 0; i < 20; i++) {
                    console.log("@ConanOBrien: " +(JSON.stringify(tweets[i].text, null, 2))); //tweet text
                    console.log("tweeted on " +(JSON.stringify(tweets[i].created_at, null, 2)) + "\n"); //tweet created at
                    }
                }
            });
        break;

        case 'spotify-this-song':
            spotify.search({type: "track", query: input, limit: 1}, function(err, info) {
                if (!err) {
                console.log("\nArtist: " + JSON.stringify(info.tracks.items[0].album.artists[0].name));
                console.log("\nSong: " + input);
                    if (JSON.stringify(info.tracks.items[0].preview_url) === "null"){
                        console.log("\nSorry, no preview url found.")
                    }
                    else {
                    console.log("\nPreview URL: " + JSON.stringify(info.tracks.items[0].preview_url));
                    }
                console.log("\nAlbum Name: " + JSON.stringify(info.tracks.items[0].album.name));
                }
                else{
                    console.log(err);
                }
            });
        break;

        case 'movie-this':
            if (input) {
                request("http://www.omdbapi.com/?t=" + input + "&r=json&plot=short&apikey=trilogy")

                .then(response => {
                let data = JSON.parse(response);
                console.log("\nTitle: " + data.Title);
                console.log("\nYear: " + data.Year);
                console.log("\nIMDB Rating: " + data.imdbRating);
                console.log("\nRotten Tomatoes Rating: " + data.Ratings[1].Value);
                console.log("\nCountry of Production: " + data.Country);
                console.log("\nLanguage: " + data.Language);
                console.log("\nPlot: " + data.Plot);
                console.log("\nActors: " + data.Actors);
                })
            }
            else {
                request("http://www.omdbapi.com/?t=Mr. Nobody&r=json&plot=short&apikey=trilogy")

                .then(response => {
                let data = JSON.parse(response);
                console.log("\nTitle: " + data.Title);
                console.log("\nYear: " + data.Year);
                console.log("\nIMDB Rating: " + data.imdbRating);
                console.log("\nRotten Tomatoes Rating: " + data.Ratings[1].Value);
                console.log("\nCountry of Production: " + data.Country);
                console.log("\nLanguage: " + data.Language);
                console.log("\nPlot: " + data.Plot);
                console.log("\nActors: " + data.Actors);
                })
            };
        break;

        case 'do-what-it-says':
            fs.readFile("random.txt", "utf-8", function(err, data){
                if (!err) {
                    var splitData = data.split(", ", 2);
                    command = splitData[0];
                    input = splitData[1];
                    doTheThing();
                }
            });
        break;
    }
}

doTheThing();