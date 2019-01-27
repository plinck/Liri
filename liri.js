"use strict";
/* jshint node: true */

let Spotify = require('node-spotify-api');
let axios = require('axios');
let moment = require('moment');

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);
  
// Need help
if (process.argv[2] == undefined || process.argv[2] == "?") {
    console.log(`Available Commands on ${moment().format("YYYY/MM/DD")}`);
    console.log(`node liri.js concert-this <artist/band name here>`);
    console.log(`node liri.js spotify-this-song '<song name here>'`);
    console.log(`node liri.js movie-this '<movie name here>'`);
    console.log(`node liri.js do-what-it-says`);
}

console.log(keys.omdb.apiKey);
console.log(keys.spotify.id);
console.log(keys.spotify.secret);
