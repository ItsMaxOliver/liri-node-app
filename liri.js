require("dotenv").config();
const moment = require('moment');
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request-promise");
const keys = require("./keys.js");
const fs = require("fs-extra");
const chalk = require("chalk");

let command = process.argv[2];
let input = process.argv[3];

const spotify = new Spotify(keys.spotify);
const twitter = new Twitter(keys.twitter);

const screenName = {screen_name: 'ChrissyTeigen'};

function doTheThing() {
    
    switch (command) {
        
        case undefined:
            console.log(chalk.red.bold(`\nSorry no command was given. Please try again.

The commands you can choose from are 
    my-tweets
    spotify-this-song "Song Title Goes Here"
    concert-this "Artist/Band Name Goes Here"
    movie-this "Movie Title Goes Here"
    do-what-it-says`));
        break;
            
        case 'my-tweets':
            twitter.get("statuses/user_timeline", screenName, function(error, tweets) {
                if (!error) {
                    for(let i = 0; i < 10; i++) {
                        const datetime = tweets[i].created_at.slice(0, 16);
                        const year = tweets[i].created_at.slice(-4);
                        console.log(
                        chalk.blue(`\n@chrissyteigen:    ${(JSON.stringify(tweets[i].text, null, 2))}   
                        ${datetime} ${year}`)); 
                    }
                }
                else console.log(error);
            });
        break;

        case 'spotify-this-song':
            if(input === undefined || input === "" || input === " ") {
                input = "Volcanic Love";
            }
            
            spotify.search({type: "track", query: input, limit: 1}, function(err, info) {
                
                if (!err) {
                    console.log(chalk.green(`\nArtist: ${JSON.stringify(info.tracks.items[0].album.artists[0].name)} \nSong: ${input}`));
                    
                    if (JSON.stringify(info.tracks.items[0].preview_url) === "null"){
                        console.log(chalk.green(`Sorry, no preview url found.`));
                    }
                    else {
                        console.log(chalk.green(`Preview URL: ${JSON.stringify(info.tracks.items[0].preview_url)}`));
                    }
                    
                    console.log(chalk.green(`Album Name: ${JSON.stringify(info.tracks.items[0].album.name)}`));
                }
                else {
                    console.log(err);
                }
                
            });
        break;

        case 'concert-this':
            if(input === undefined || input === "" || input === " ") {
                input = "Alice Merton"
            }

            request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")

            .then( response => {
                let data = JSON.parse(response);
                if (data.length === 0) {
                    console.log(chalk.magenta(`\n Sorry, we don't have any concert information for ${input}. Please try another artist or band name.`));
                }
                else {
                    console.log(chalk.magenta(`\nConcert Information for ${input}`));
                    
                    for (let i = 0; i < data.length; i++) {
                        console.log(chalk.magenta(`\nVenue: ${data[i].venue.name}\nLocation: ${data[i].venue.city} , ${data[i].venue.region}\nDate: ${moment(data[i].datetime).format("MMM Do YYYY")}`));
                    }
                }
            })
        break;

        case 'movie-this':
            if (input) {
                request("http://www.omdbapi.com/?t=" + input + "&r=json&plot=short&apikey=trilogy")

                .then(response => {
                    let data = JSON.parse(response)
                    console.log(chalk.yellow(`\nTitle: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${data.imdbRating}`));

                    if(data.Ratings[1] === undefined) {
                        console.log(chalk.red(`Sorry no Rotten Tomatoes Rating found.`));
                    }
                    else {
                        console.log(chalk.yellow(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`));
                    }
                    console.log(chalk.yellow(`Country of Production: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}`));
                })
            }
            else {
                request("http://www.omdbapi.com/?t=Black%20Panther&r=json&plot=short&apikey=trilogy")

                .then(response => {
                    let data = JSON.parse(response);
                    console.log(chalk.gray(`\nTitle: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${data.imdbRating}\nRotten Tomatoes Rating: ${data.Ratings[1].Value}\nCountry of Production: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}`));
                })
            };
        break;

        case 'do-what-it-says':
            fs.readFile("random.txt", "utf-8", function(error, data){
                if (!error) {
                    const splitData = data.split(", ", 2);
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