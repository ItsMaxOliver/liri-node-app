# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will recognize four different commands: 
    my-tweets
    spotify-this-song
    movie-this
    do-what-it-says

When the <b>my-tweets</b> command is given the 20 latest tweets from Chrissy Teigen will be shown with their date and time created.

When the <b>spotify-this-song</b> command is given the artist, the song title, the preview url and the album name will be shown for the specified song. If no song is specified then 'Volcanic Love' by The Aces will be shown.
    
    An example for what the command looks like when you specify a song is: 
            node liri spotify-this-song "Volcanic Love"
    
    The song title needs to be in quotes to work properly.

When the <b>movie-this</b> command is given the title, year, imdb rating, rotten tomatoes rating, country of production, language, plot and actors will be shown for the specified movie. If no movie is specified then information for the Marvel movie 'Black Panther' will be shown.

    An example for what the command looks like when you specify a song is:
            node liri movie-this "Black Panther"
            
    The movie title needs to be in quotes to work properly.
    
When the <b>do-what-it-says</b> command is given LIRI will read another file (random.txt) to figure out what to do.