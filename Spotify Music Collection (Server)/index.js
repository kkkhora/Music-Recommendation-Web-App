const express = require('express');
const mysql = require('mysql');
// const express = require('express');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// const db = 

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.json());

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
app.get('/search/song',routes.search_song)
//sublist(use LIKE %)
app.get('/search/genre',routes.search_genre)
//display
app.get('/userPlaylist',routes.playlist)
//display
app.get('/userRec/features',routes.userRec_features)//if no user data, random
app.get('/userRec/country',routes.userRec_year)//if no user data, random
//app,get('/userRec/year',routes.userRec_random)//if no user data, random
//post user registration information
// app.post('/register', (req, res) => {

//     const username = req.body.username
//     const password = req.body.password

//     connection.query("INSERT INTO Users (username, password) VALUES (?, ?)", 
//     [username, password], 
//     (err, result) => {
//         console.log(err);
//     })
// })
app.post('/register', routes.registerResponse)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
