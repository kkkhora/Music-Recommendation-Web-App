const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

//SIGN IN
// app.post('/register', routes.registerResponse);
// app.post('/login', routes.loginResponse);
//interactive map
app.get('/search/country', routes.search_country)
app.get('/search/year', routes.search_year)
//scroll bar
app.get('/search/yearRange', routes.search_year_range)
//scroll bar
app.get('/search/emotionRange', routes.search_emotion_range)
//search box (use LIKE %) search by name and artist
app.get('/search/song', routes.search_song)
// sublist(use LIKE %)
app.get('/search/genre', routes.search_genre)
//user like a song
app.get('/userLike/:user/:songID', routes.user_like)
//user remove a like
app.get('/removeLike/:user/:songID', routes.remove_like)
//display
app.get('/userPlaylist/:user', routes.playlist)
//display recommendation page
app.get('/userRec/features/:user', routes.userRec_features)//if no user data, random(see below)
app.get('/userRec/year/:user', routes.userRec_year)//if no user data, random(see below)
app.get('/userRec/random', routes.userRec_random)




app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
