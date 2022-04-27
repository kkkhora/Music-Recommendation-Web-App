SELECT Artist_name
FROM Artist_info_dedup
WHERE Artist_country = 'JP';

CREATE  index country_index ON Artist_info_dedup(Artist_country);

SELECT Artist_name
FROM Artist_info_dedup
WHERE Artist_country = 'JP';

DROP INDEX country_index ON Artist_info_dedup;


CREATE VIEW Display_results AS
    SELECT Song_info.Song_ID, Song_name, Mt.Artist_id, Artist_name, Album_year, Song_genre, Track_image
    FROM Song_info JOIN Master_table Mt on Song_info.Song_ID = Mt.Song_ID
        JOIN Album_info_dedup Aid on Mt.Album_id = Aid.Album_id
        JOIN Artist_info_dedup A on Mt.Artist_id = A.Artist_id
