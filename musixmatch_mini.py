from musixmatch import Musixmatch
import pandas as pd
import time

# use your own developer key by signing up at https://developer.musixmatch.com/plans, then click username - dashboard - applications to find the key
api_key = '<your key>'
musixmatch = Musixmatch(api_key)

# test codes
# lyrics = musixmatch.matcher_lyrics_get('Hold On', 'Alabama Shakes')
# # print(lyrics)
# print(lyrics["message"]["body"]["lyrics"]["lyrics_body"])

# trackInfo = musixmatch.matcher_track_get('Talk To Me (feat. Conor Maynard & RANI) - Sam Feldt Edit', 'M√∂we')
# print(trackInfo)
# if(trackInfo['message']['body'] == []):
#     print('yes')
# if(trackInfo['message']['body'] == ''):
#     print('yes empty string')
# if(trackInfo['message']['body'] == ''):
#     print("no match")
# trackID = trackInfo['message']['body']['track']['track_id']
# print(trackID)
# music_genre_list = trackInfo['message']['body']['track']['primary_genres']['music_genre_list']
# genre = ''
# for i in music_genre_list:
#     genre += i['music_genre']['music_genre_name'] + ','
# genre = genre[:-1]
# print(genre)

# trackInfo = musixmatch.matcher_track_get('Silver Lining', 'Mt. Joy')
# print(trackInfo)
# if(trackInfo['message']['body'] != ''):
#     trackID = trackInfo['message']['body']['track']['track_id']
#     artistID = trackInfo['message']['body']['track']['artist_id']
# if(artistID is not None):
#     artistInfo = musixmatch.artist_get(artistID)
#     print(artistInfo)
#     artist_country = artistInfo['message']['body']['artist']['artist_country']


# api_call = 'https://api.musixmatch.com/ws/1.1/' + 'track.lyrics.mood.get' + "?format=json&callback=callback" + "&track_id=" + str(trackID) + api_key
# request = requests.get(api_call)
# data = request.json()
# print(data)

# api_call = 'https://api.musixmatch.com/ws/1.1/track.get?format=json&callback=callback&track_id=15953433'
# request = requests.get(api_call)
# data = request.json()
# print(data)


#import corresponding csv file
data = pd.read_csv("song_info1401-2400.csv")
songName_list = data['song name'].tolist()
artist_list = data['artist name'].tolist()

def get_data(songName_list, artist_list):
    
    # Create empty dataframe
    track_features_list = ["song name", "genre", "artist name", "artist country"]
    track_df = pd.DataFrame(columns = track_features_list)
    i = 0
    while i < len(songName_list):
        print("getting ", i, " row...")
        #get track
        trackInfo = musixmatch.matcher_track_get(songName_list[i], artist_list[i])
        if(trackInfo['message']['body'] != [] and trackInfo['message']['body'] != ''):
            trackID = trackInfo['message']['body']['track']['track_id']

            genre = ''
            if(trackInfo['message']['body']['track']['primary_genres'] != '' and trackInfo['message']['body']['track']['primary_genres']['music_genre_list'] != []):
                music_genre_list = trackInfo['message']['body']['track']['primary_genres']['music_genre_list']
                for item in music_genre_list:
                    genre += item['music_genre']['music_genre_name'] + ','
                genre = genre[:-1]

            artistID = trackInfo['message']['body']['track']['artist_id']
            if(artistID is not None):
                artistInfo = musixmatch.artist_get(artistID)
                artist_country = artistInfo['message']['body']['artist']['artist_country']
            else:
                artist_country = ''
        else:
            genre = ''
            artist_country = ''

        # Create empty dict
        track_features = {}
        # Get metadata
        track_features["song name"] = songName_list[i]
        track_features["genre"] = genre
        track_features["artist name"] = artist_list[i]
        track_features["artist country"] = artist_country
        
            
        # Concat the dfs
        track_info_df = pd.DataFrame(track_features, index=[0])
        track_df = pd.concat([track_df, track_info_df], ignore_index = True)
        print(i, " row done.")

        # if row = 200, 400 sleep for 6s
        if i == 200 or i == 400 or i == 600 or i == 800:
            time.sleep(6)

        i = i + 1
        # gc.collect()
    return track_df

track_df = get_data(songName_list, artist_list)
print("converting to csv...")
track_df.to_csv("countryANDgenre.csv", mode='a', index = False)
print("csv successfully generated.")
