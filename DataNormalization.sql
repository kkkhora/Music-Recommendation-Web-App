USE Songs_artist;

-- SONG_INFO
-- Retrieve data from original tables
DROP TABLE Song_info;
CREATE TABLE Song_info AS (
    SELECT
        a.Song_ID,
        a.Song_name,
        a.Song_genre,
        s.Acousticness,
        s.Valence,
        s.Danceability,
        s.Energy,
        s.Instrumentalness,
        s.Liveness,
        s.Loudness,
        s.Speechiness,
        s.Tempo,
        s.Duration,
        s.Key_pitch,
        s.H_s
    FROM Artist_original a, Song_original s
    WHERE a.Song_ID = s.Song_ID
);
-- Check parameters and sample data
SELECT COUNT(*) FROM Song_info;
SELECT * FROM Song_info LIMIT 100;

-- ALBUM_INFO
-- Retrieve data from original tables
DROP TABLE Album_info;
CREATE TABLE Album_info AS (
    SELECT
        a.Album_id,
        a.Album_name,
        a.Album_year,
        s.Track_image
    FROM Artist_original a, Song_original s
    WHERE a.Song_ID = s.Song_ID
);
-- Check duplicate rows
SELECT COUNT(*) FROM Album_info;
SELECT * FROM Album_info LIMIT 100;
SELECT Album_id, COUNT(Album_id) AS Num_id FROM Album_info GROUP BY Album_id ORDER BY Num_id DESC;
-- Create intermediate table
DROP TABLE Album_info_dedup;
CREATE TABLE Album_info_dedup LIKE Album_info;
-- Insert unique rows into intermediate table
INSERT INTO Album_info_dedup
    SELECT * FROM Album_info
    GROUP BY Album_id;
-- Check duplicate rows
SELECT COUNT(*) FROM Album_info_dedup;
SELECT * FROM Album_info_dedup LIMIT 100;
SELECT Album_id, COUNT(Album_id) AS Num_id FROM Album_info_dedup GROUP BY Album_id ORDER BY Num_id DESC;

-- ARTIST_INFO
-- Retrieve data from original tables
DROP TABLE Artist_info;
CREATE TABLE Artist_info AS (
    SELECT
        a.Artist_id,
        a.Artist_name,
        a.Artist_genre,
        s.Artist_image,
        a.Artist_country
    FROM Artist_original a, Song_original s
    WHERE a.Song_ID = s.Song_ID
);
-- Check duplicate rows
SELECT COUNT(*) FROM Artist_info;
SELECT * FROM Artist_info LIMIT 100;
SELECT Artist_id, COUNT(Artist_id) AS Num_id FROM Artist_info GROUP BY Artist_id ORDER BY Num_id DESC;
-- Create intermediate table
DROP TABLE Artist_info_dedup;
CREATE TABLE Artist_info_dedup LIKE Artist_info;
-- Insert unique rows into intermediate table
INSERT INTO Artist_info_dedup
    SELECT * FROM Artist_info
    GROUP BY Artist_id;
-- Check duplicate rows
SELECT COUNT(*) FROM Artist_info_dedup;
SELECT * FROM Artist_info_dedup LIMIT 100;
SELECT Artist_id, COUNT(Artist_id) AS Num_id FROM Artist_info_dedup GROUP BY Artist_id ORDER BY Num_id DESC;