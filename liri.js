"use strict";
/* jshint node: true */

let Spotify = require('node-spotify-api');
let axios = require('axios');

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);
  
console.log(keys.omdb.apiKey);
console.log(keys.spotify.id);
console.log(keys.spotify.secret);