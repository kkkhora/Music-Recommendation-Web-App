const config = require('./config.json')
const mysql = require('mysql');
const express = require('express');
// const { query } = require('express');
// const app = express();

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();



// ********************************************
//                  ROUTES
// ********************************************

async function Search_length(sql) {

    let num = await new Promise(r => {
        connection.query(sql, function (error, results,) {
            if (results) {
                r(results)
            }
        })
    })

    let length = num.length
    console.log('length',length);
    return length
}

// async function validateUserInfo(req, res) {
//     if (req.session.loggedin) {
//         res.redirect('/home');
//     }
// }

async function registerResponse(req, res) {
    var username = req.body.username;
    // var email = req.body.email;
    var password = req.body.password;
    var check = 'select password from Users where username = "' + username + '"';
    // var register = "insert into Users (username, email, password) values (\"" + username + "\",\"" + email + "\",\"" + password + "\");";
    var register = "insert into Users (username, password) values (\"" + username + "\",\"" + password + "\");";
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
                // req.session.loggedin = true;
                // req.session.loggedin = username;
                // res.redirect('/');
            } else {
                res.json({
                    status: 'fail'
                });
            }
        }
    });
};

async function search_country(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (req.query.page - 1) * pagesize
        connection.query(`SELECT D.Song_ID, Song_name, D.Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results D JOIN Artist_info_dedup Aid on D.Artist_id = Aid.Artist_id
        WHERE Artist_country = '${req.query.countryCode}'
        LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(`SELECT D.Song_ID, Song_name, D.Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results D JOIN Artist_info_dedup Aid on D.Artist_id = Aid.Artist_id
        WHERE Artist_country = '${req.query.countryCode}'`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


async function search_year(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (req.query.page - 1) * pagesize

        let count = await Search_length(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year = '${req.query.year}'`)

        connection.query(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year = '${req.query.year}'
        LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results,count })
            }
        });
    } else {
        connection.query(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year = '${req.query.year}'`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


async function search_year_range(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (req.query.page - 1) * pagesize

        let count = await Search_length(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year >= '${req.query.startYear}' AND Album_year <= '${req.query.endYear}'`)
        
        connection.query(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year >= '${req.query.startYear}' AND Album_year <= '${req.query.endYear}'
        LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results,count })
            }
        });
    } else {
        connection.query(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Album_year >= '${req.query.startYear}' AND Album_year <= '${req.query.endYear}'`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


async function search_emotion_range(req, res) {
    if (req.query.happysad && !isNaN(req.query.happysad)) {
        if (req.query.page && !isNaN(req.query.page)) {

            const pagesize = req.query.pagesize ? req.query.pagesize : 10
            const offset = (req.query.page - 1) * pagesize
            let count = await Search_length(`SELECT D.Song_ID, D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'
            AND H_s = '${req.query.happysad}'`)
            connection.query(`SELECT D.Song_ID, D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'
            AND H_s = '${req.query.happysad}'
            LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results,count })
                }
            });
        } else {
            connection.query(`SELECT D.Song_ID, D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'
            AND H_s = '${req.query.happysad}'`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results,count })
                }
            });
        }
    } else {
        if (req.query.page && !isNaN(req.query.page)) {
            
            const pagesize = req.query.pagesize ? req.query.pagesize : 10
            const offset = (req.query.page - 1) * pagesize
            let count = await Search_length(`SELECT D.Song_ID, D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'`)

            connection.query(`SELECT D.Song_ID, D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'
            LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results,count })
                }
            });
        } else {
            connection.query(`SELECT D.Song_ID, D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
            FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID
            WHERE Acousticness >= '${req.query.minAcousticness}' AND Acousticness <= '${req.query.maxAcousticness}'
            AND Valence >= '${req.query.minValence}' AND Valence <= '${req.query.maxValence}'
            AND Danceability >= '${req.query.minDanceability}' AND Danceability <= '${req.query.maxDanceability}'
            AND Energy >= '${req.query.minEnergy}' AND Energy <= '${req.query.maxEnergy}'
            AND Instrumentalness >= '${req.query.minInstrumentalness}' AND Instrumentalness <= '${req.query.maxInstrumentalness}'
            AND Tempo >= '${req.query.minTempo}' AND Tempo <= '${req.query.maxTempo}'`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    }
}




async function search_song(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (req.query.page - 1) * pagesize


        if (req.query.name && req.query.artist) {
            let count = await Search_length(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Song_name LIKE '%${req.query.name}%' AND Artist_name LIKE '%${req.query.artist}%'`)
            connection.query(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Song_name LIKE '%${req.query.name}%' AND Artist_name LIKE '%${req.query.artist}%'
            LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results,count })
                }
            });
        } else if (req.query.name) {
            let count = await Search_length(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Song_name LIKE '%${req.query.name}%'`)
            connection.query(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Song_name LIKE '%${req.query.name}%'
            LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results ,count})
                }
            });
        } else if (req.query.artist) {
            let count =  await Search_length(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Artist_name LIKE '%${req.query.artist}%'`)
            connection.query(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Artist_name LIKE '%${req.query.artist}%'
            LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results ,count})
                }
            });
        }
    } else {
        if (req.query.name && req.query.artist) {
            connection.query(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Song_name LIKE '%${req.query.name}%' AND Artist_name LIKE '%${req.query.artist}%'`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else if (req.query.name) {
            connection.query(`SELECT Song_id, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Song_name LIKE '%${req.query.name}%'`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else if (req.query.artist) {
            connection.query(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
            FROM Display_results
            WHERE Artist_name LIKE '%${req.query.artist}%'`, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    }
}


async function search_genre(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (req.query.page - 1) * pagesize

        let count = await Search_length(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Song_genre LIKE '%${req.query.genre}%'`)

        connection.query(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Song_genre LIKE '%${req.query.genre}%'
        LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results, count})
            }
        });
    } else {
        connection.query(`SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        WHERE Song_genre LIKE '%${req.query.genre}%'`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


async function playlist(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (req.query.page - 1) * pagesize
        connection.query(`SELECT D.Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results D JOIN User_likes U ON D.Song_ID = U.Song_ID
        WHERE username = '%${req.query.user}%'
        LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(`SELECT D.Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results D JOIN User_likes U ON D.Song_ID = U.Song_ID
        WHERE username = '%${req.query.user}%'`, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

//frontend: if playlist is not null, use userRec_features and userRec_year; if playlist is null {[]}, use userRec_random.
async function userRec_features(req, res) {
    connection.query(`WITH User_features AS
        （SELECT AVG(acousticness) AS avg_acoustic, AVG(valence) AS avg_valence, AVG(Danceability) AS avg_dance, AVG(Energy) AS avg_energy, AVG(Instrumentalness) AS avg_instrument, AVG(Tempo) AS avg_tempo
        FROM User_likes U JOIN Song_info S ON U.Song_ID = S.Song_ID
        WHERE username = '%${req.query.user}%'）
        SELECT D.Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results D JOIN Song_info S ON D.Song_ID = S.Song_ID, User_features U
        WHERE acousticness >= avg_acoustic - 0.1 AND acousticness <= avg_acoustic + 0.1 AND 
        valence >= avg_valence - 0.1 AND valence <= avg_valence + 0.1 AND
        Danceability >= avg_dance - 0.1 AND Danceability <= avg_dance + 0.1 AND
        Energy >= avg_energy - 0.1 AND Energy <= avg_energy + 0.1 AND
        Instrumentalness >= avg_instrumental - 0.1 AND Instrumentalness <= avg_instrumental + 0.1 AND
        Tempo >= avg_tempo - 0.1 AND Tempo <= avg_Tempo
        AND D.Song_ID NOT IN (SELECT Song_ID FROM User_likes)
        ORDER BY RAND()
        LIMIT 5
        `, function (error, results, field) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//frontend: if playlist is not null, use userRec_features and userRec_year; if playlist is null {[]}, use userRec_random.
async function userRec_year(req, res) {
    connection.query(`WITH User_year AS
    （SELECT Album_year, Count(Album_year) AS num
    FROM User_likes U JOIN Display_results D ON U.Song_ID = D.Song_ID
    WHERE username = '%${req.query.user}%'
    GROUP BY Album_year
    ORDER BY num DESC
    LIMIT 1）
    SELECT D.Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
    FROM Display_results D, User_year U
    WHERE D.Album_year >= U.Album_year - 5 AND D.Album_year <= U.Album_year + 5
    AND D.Song_ID NOT IN (SELECT Song_ID FROM User_likes)
    ORDER BY RAND()
    LIMIT 5
    `, function (error, results, field) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function user_like(req, res){
    var username = req.params.username;
    var songID = req.params.song;
    connection.query(`
    INSERT INTO User_likes(username, Song_ID)
    VALUES("${username}", "${songID}")
    `, function(error, results, field){
        if(error){
            console.log(error)
            res.json({error: error})
        }else{
            res.json({status:"success"})
        }
    });
}

async function userRec_song(req, res){
if(req.query.user && !isNaN(req.query.user)){
    connection.query(`WITH User_most_like AS
    (select label, count(1) as song_unit
        FROM User_likes a inner join Song_Classifier b
    on a.Song_ID = b.Song_ID
        WHERE username = '%${req.params.user}%'
        group by label
        order by song_unit desc
        limit 1)
    select D.Song_ID, D.Song_name, Artist_name, Album_year, D.Song_genre, Track_image
    FROM Display_results D inner join Song_Classifier SC on D.Song_ID = SC.Song_ID
    where D.Song_ID not in (select Song_ID from User_likes)
    and label in (select label from User_most_like)
    ORDER BY RAND()
    limit 10
    `, function(error, results, field){
        if(error){
            console.log(error)
            res.json({error: error})
        }else if(results){
            res.json({results:results})
        }
    });
    }
    else {
        connection.query(`
        SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM Display_results
        ORDER BY RAND()
        LIMIT 10
        `, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });

    }
}

async function remove_like(req, res){
    var username = req.params.username;
    var songID = req.params.song;
    connection.query(`
    DELETE FROM User_likes
    WHERE username = "${username}" AND Song_ID = "${songID}"
    `, function(error, results, field){
        if(error){
            console.log(error)
            res.json({error: error})
        }else{
            res.json({status:"success"})
        }
    });
}

async function getPlayList(req, res){
    // if(req.query.user && !isNaN(req.query.user)){
        connection.query(`SELECT D.Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
        FROM  Display_results D 
        where Song_ID in (select Song_ID from User_likes where username = '${req.query.user}')`, function(error, results, field){
            if(error){
                console.log(error)
                res.json({error: error})
            }else if(results){
                res.json({results:results})
            }
        });
    // }
}


//frontend: if playlist is not null, use userRec_features and userRec_year; if playlist is null {[]}, use userRec_random.
async function userRec_random(req, res) {
    connection.query(`
    SELECT Song_ID, Song_name, Artist_name, Album_year, Song_genre, Track_image
    FROM Display_results
    ORDER BY RAND()
    LIMIT 5
    `, function (error, results, field) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

module.exports = {
    // validateUserInfo,
    registerResponse,
    loginResponse,
    search_country,
    search_year,
    search_year_range,
    search_emotion_range,
    search_song,
    search_genre,
    playlist,
    userRec_features,
    userRec_year,
    userRec_random,
    userRec_song,
    user_like,
    remove_like,
    getPlaylist
    
}
