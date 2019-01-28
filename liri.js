"use strict";
/* jshint node: true */

let Spotify = require('node-spotify-api');
let axios = require('axios');
let moment = require('moment');

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);

// Spotify Search
function spotifySearch(songName) {
    let searchForSong = "Indiscipline";

    if (songName != undefined) {
        searchForSong = songName;
    }
    // SPOTIFY
    spotify.search({
        type: 'track',
        query: searchForSong
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // let displayData = JSON.stringify(data, null, 2);
        //console.log(displayData);

        console.log(`\nSong: ${searchForSong}`);

        for (let i in data.tracks.items) {
            console.log("\nSong Information");
            console.log("----------------");
            console.log(`Artist: ${data.tracks.items[i].artists[0].name}`);
            console.log(`Song Preview: ${data.tracks.items[i].external_urls.spotify}`);
            console.log(`Album: ${data.tracks.items[i].album.name}`);
        }
    });
}

// OMDB Search
// We then run the request with axios module on a URL with a JSON
function searchOMDB(movieName) {
    let searchForMovie = "Mr. Nobody";

    if (movieName != undefined) {
        searchForMovie = movieName;
    }

    axios.get(`http://www.omdbapi.com/?t=${searchForMovie}&y=&plot=short&apikey=${keys.omdb.apiKey}`)
        .then(
            function (response) {
                console.log(`Title: ${response.data.Title}`);
                console.log(`Year: ${response.data.Year}`);
                console.log(`IMDB Rating: ${response.data.IMDBRating}`);
                console.log(`Rotten Tomatoes Rating: ${response.data.RottenTomatoesRating}`);
                console.log(`Country: ${response.data.Country}`);
                console.log(`Language: ${response.data.Language}`);
                console.log(`Plot: ${response.data.Plot}`);
                console.log(`Actors: ${response.data.Actors}`);
            }
        )
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
            }
        });
}

// Band Search
function searchBand(bandName) {
    let searchForBand = "Bluedot";

    if (bandName != undefined) {
        searchForBand = bandName;
    }

    let requestURL = `https://rest.bandsintown.com/artists/${searchForBand}/events?app_id=${keys.bandsInTown.apiKey}`;

    axios.get(requestURL)
        .then(
            function (response) {
                console.log(`\n${searchForBand} Upcoming concerts`);

                // print each upcoming evennt
                for (let i in response.data) {
                    console.log("\nPLAYING AT INFO");
                    console.log("----------------");
                    console.log(`Name: ${response.data[i].venue.name}`);
                    console.log(`Location: ${response.data[i].venue.city}`);
                    let displayDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
                    console.log(`Date: ${displayDate}`);
                }
            }
        )
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
            }
        });
}

// Get task to do from the file random.txt
function taskFromFile() {

}

// Help for command line
function moduleHelp() {
    console.log(`Available Commands on ${moment().format("YYYY/MM/DD")}`);
    console.log(`node liri.js ?`);
    console.log(`node liri.js concert-this <artist/band name here>`);
    console.log(`node liri.js spotify-this-song '<song name here>'`);
    console.log(`node liri.js movie-this '<movie name here>'`);
    console.log(`node liri.js do-what-it-says`);
}

let command = process.argv[2];
let parameter = process.argv[3];

// Need help
switch (command) {
    case `spotify-this-song`:
        spotifySearch(parameter);
        break;

    case `movie-this`:
        searchOMDB(parameter);
        break;

    case `concert-this`:
        searchBand(parameter);
        break;

    case `do-what-it-says`:
        taskFromFile(parameter);
        break;

    case `?` || `help`:
        moduleHelp();
        break;

    default:
        moduleHelp();
        break;

}