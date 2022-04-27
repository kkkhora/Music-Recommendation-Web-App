import config from './config.json'

const getsearch_year = async (year,page=1, pagesize=10) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/year?year=${year}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getsearch_year_range = async (startYear, endYear,page=1, pagesize=10) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/yearRange?startYear=${startYear}&endYear=${endYear}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getsearch_emotion_range = async (minAcousticness, maxAcousticness, minValence, maxValence, minDanceability, maxDanceability, minEnergy, maxEnergy, minInstrumentalness, maxInstrumentalness, minTempo, maxTempo, happysad,page=1, pagesize=10) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/emotionRange?minAcousticness=${minAcousticness}&maxAcousticness=${maxAcousticness}&minValence=${minValence}&maxValence=${maxValence}&minDanceability=${minDanceability}&maxDanceability=${maxDanceability}&minEnergy=${minEnergy}&maxEnergy=${maxEnergy}&minInstrumentalness=${minInstrumentalness}&maxInstrumentalness=${maxInstrumentalness}&minTempo=${minTempo}&maxTempo=${maxTempo}happysad=${happysad}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getsearch_song = async (name,artist,page=1, pagesize=10) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/song?name=${name}&artist=${artist}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getsearch_genre = async (genre,page=1, pagesize=10) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/genre?genre=${genre}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}



export {

    getsearch_year,
    getsearch_year_range,
    getsearch_emotion_range,
    getsearch_song,
    getsearch_genre,

}