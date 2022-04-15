CREATE TABLE Users(
    username varchar(20),
    email varchar(50),
    password varchar(20),
    PRIMARY KEY (username)
);

CREATE TABLE User_likes(
    username varchar(20),
    Song_ID varchar(100),
    PRIMARY KEY (username, Song_ID),
    Foreign KEY (username) REFERENCES Users(username)
);
