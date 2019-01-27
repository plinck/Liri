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

        console.log(data.tracks.items[0].artists[0].name);
    });
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

    case `?` || `help`:
        moduleHelp();
        break;

    default:
        moduleHelp();
        break;

}

console.log(keys.omdb.apiKey);
