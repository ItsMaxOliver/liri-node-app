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
    console.log(JSON.stringify(tweets, null, 2)); //tweet body
    }
});