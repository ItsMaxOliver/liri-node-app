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

var screenName = {screen_name: 'ChrissyTeigen'};

function doTheThing() {
    
    switch (command) {
        
        case undefined:
            console.log(`
Sorry no command was given. Please try again.

The commands you can choose from are 
    my-tweets
    spotify-this-song "Song Title Goes Here"
    movie-this "Movie Title Goes Here"
    do-what-it-says`);
        break;
            
        case 'my-tweets':
            twitter.get("statuses/user_timeline", screenName, function(error, tweets) {
                if (!error) {
                    for(var i = 0; i < 20; i++) {
                        console.log("\n@chrissyteigen: " +(JSON.stringify(tweets[i].text, null, 2))); 

                        var datetime = tweets[i].created_at.slice(0, 16);
                        var year = tweets[i].created_at.slice(-4);

                        console.log("   tweeted on " + datetime + " " + year); 
                    }
                }
                else {
                    console.log(error);
                }
            });
        break;

        case 'spotify-this-song':
            if(input === undefined || input === "" || input === " ") {
                input = "Volcanic Love";
            }
            
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
                else {
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
                    if(data.Ratings[1] === undefined) {
                        console.log("\nSorry no Rotten Tomatoes Rating found.")
                    }
                    else {
                        console.log("\nRotten Tomatoes Rating: " + data.Ratings[1].Value);
                    }
                    console.log("\nCountry of Production: " + data.Country);
                    console.log("\nLanguage: " + data.Language);
                    console.log("\nPlot: " + data.Plot);
                    console.log("\nActors: " + data.Actors);
                })
            }
            else {
                request("http://www.omdbapi.com/?t=Black%20Panther&r=json&plot=short&apikey=trilogy")

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
            fs.readFile("random.txt", "utf-8", function(error, data){
                if (!error) {
                    var splitData = data.split(", ", 2);
                    command = splitData[0];
                    input = splitData[1];
                    doTheThing();
                }
                else {
                    console.log(error);
                }
            });
        break;
    }
}

doTheThing();