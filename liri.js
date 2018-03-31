require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var Request = require("request");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var screenName = {screen_name: 'whutturfacts'};

twitter.get("statuses/user_timeline", screenName, function(error, tweets, response) {
    if (!error) {
        for(var i = 0; i < 20; i++) {
        console.log("@whutturfacts: " +(JSON.stringify(tweets[i].text, null, 2))); //tweet text
        console.log("tweeted on " +(JSON.stringify(tweets[i].created_at, null, 2)) + "\n"); //tweet created at
        }
    }
});