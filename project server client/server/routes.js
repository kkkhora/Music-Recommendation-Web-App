const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
const { query } = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//               LOGIN ROUTES
// ********************************************

async function registerResponse(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var check = 'select password from Users where username = "' + username + '"';
    var register = "insert into Users (username, email, password) values (\"" + username + "\",\"" + email + "\",\"" + password + "\");";
    connection.query(check, function (err, result) {
      var message = JSON.stringify(result);
      if (message.length == 2) {
        connection.query(register, function (err) {
          if (err) console.log("Insert error: ", err);
          else {
            res.json({
              name: username,
              status: 'success'
            });
          }
        });
      } else {
        res.json({
          status: 'fail'
        });
        console.log("The user already exist!");
      }
    });
  };

async function loginResponse(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var check = 'select password from Users where username = "' + username + '"';
    connection.query(check, function (err, result) {
      var message = JSON.stringify(result);
      if (message.length == 2) {
        res.json({
          status: 'unexist'
        });
      } else {
        message = JSON.parse(message);
        if (err) {
          res.json({
            status: 'error'
          });
        }
        if (message[0].password == password) {
          res.json({
            name: username,
            status: 'success'
          });
        } else {
          res.json({
            status: 'fail'
          });
        }
      }
    });
  };
  
async function search_country(req, res){
    if(req.query.page && !isNaN(req.query.page)){
        const pagesize = req.query.pagesize ? req.query.pagesize: 10
        const offset = (req.query.page - 1) * pagesize
        connection.query(`SELECT Song_name, D.Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results D JOIN Artist_info_dedup Aid on D.Artist_id = Aid.Artist_id
        WHERE Artist_country = '${req.query.countryCode}'
        LIMIT ${pagesize} OFFSET ${offset}`, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });
    }else{
        connection.query(`SELECT Song_name, D.Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results D JOIN Artist_info_dedup Aid on D.Artist_id = Aid.Artist_id
        WHERE Artist_country = '${req.query.countryCode}'`, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });
    }
} 


async function search_year(req, res){
    if(req.query.page && !isNaN(req.query.page)){
        const pagesize = req.query.pagesize ? req.query.pagesize: 10
        const offset = (req.query.page - 1) * pagesize
        connection.query(`SELECT Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year = '${req.query.year}'
        LIMIT ${pagesize} OFFSET ${offset}`, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });
    }else{
        connection.query(`SELECT Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year = '${req.query.year}'`, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });
    }
}


async function search_year_range(req, res){
    if(req.query.page && !isNaN(req.query.page)){
        const pagesize = req.query.pagesize ? req.query.pagesize: 10
        const offset = (req.query.page - 1) * pagesize
        connection.query(`SELECT Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year >= '${req.query.startYear}' AND Album_year <= '${req.query.endYear}'
        LIMIT ${pagesize} OFFSET ${offset}`, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });
    }else{
        connection.query(`SELECT Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year >= '${req.query.startYear}' AND Album_year <= '${req.query.endYear}'`, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });
    }
}


async function search_emotion_range(req, res){
    if(req.query.happysad){
        if(req.query.page && !isNaN(req.query.page)){
            const pagesize = req.query.pagesize ? req.query.pagesize: 10
            const offset = (req.query.page - 1) * pagesize
            connection.query(`SELECT D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'
            AND H_s = '${req.query.happysad}'
            LIMIT ${pagesize} OFFSET ${offset}`, function(error, results, field){
                if(error){
                    console.log(error)
                    res.json({error: error})
                }else if(results){
                    res.json({results:results})
                }
            });
        }else{
            connection.query(`SELECT D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'
            AND H_s = '${req.query.happysad}'`, function(error, results, field){
                if(error){
                    console.log(error)
                    res.json({error: error})
                }else if(results){
                    res.json({results:results})
                }
            });
        }
    }else{
        if(req.query.page && !isNaN(req.query.page)){
            const pagesize = req.query.pagesize ? req.query.pagesize: 10
            const offset = (req.query.page - 1) * pagesize
            connection.query(`SELECT D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'
            LIMIT ${pagesize} OFFSET ${offset}`, function(error, results, field){
                if(error){
                    console.log(error)
                    res.json({error: error})
                }else if(results){
                    res.json({results:results})
                }
            });
        }else{
            connection.query(`SELECT D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'`, function(error, results, field){
                if(error){
                    console.log(error)
                    res.json({error: error})
                }else if(results){
                    res.json({results:results})
                }
            });
        }
    }
    }

    







module.exports = {
    // registerResponse,
    // loginResponse,
    search_country,
    search_year,
    search_year_range,
    search_emotion_range
}