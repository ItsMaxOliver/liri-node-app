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
        
    break;
    case 'movie-this':
        request("http://www.omdbapi.com/?t=" + input + "&r=json&plot=short&apikey=trilogy")
        .then(response => {
            let data = JSON.parse(response);
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country of Production: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
        })
    break;
    case 'do-what-it-says':
        fs.readFile("random.txt", function(err, data){
        if (err) {
            return console.log(err);
        }
        // working code here
    })
    break;
}