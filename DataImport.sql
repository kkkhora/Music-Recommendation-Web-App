CREATE TABLE Song_original(
   Song_ID              varchar(100),
   Acousticness         DECIMAL(8,8),
   Valence              DECIMAL(4,4),
   Danceability         DECIMAL(4,4),
   Energy               DECIMAL(6,6),
   Instrumentalness     DECIMAL(8,8),
   Liveness             DECIMAL(4,4),
   Loudness             DECIMAL(10,3),
   Speechiness          DECIMAL(6,6),
   Tempo                DECIMAL(10,3),
   Duration             INT,
   Key_pitch            INT,
   H_s                  varchar(1),
   Track_image          varchar(100),
   Artist_image         varchar(100),
   PRIMARY KEY (Song_ID)
);

CREATE TABLE Artist_original(
    Song_ID             varchar(100),
    Song_name           varchar(100),
    Song_popularity     int,
    Artist_name         varchar(100),
    Artist_id           varchar(100),
    Artist_genre        varchar(100),
    Album_name          varchar(100),
    Album_id            varchar(100),
    Album_year          int,
    Song_genre          varchar(100),
    Artist_country      varchar(4),
    PRIMARY KEY (Song_ID)
);