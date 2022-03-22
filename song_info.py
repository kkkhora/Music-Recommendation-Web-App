import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time


client_credentials_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


song_info = pd.read_csv("song_info1.csv")
songID_list = song_info['song ID'].tolist()
i = 0
trackImage = []
artistImage = []
for songID in songID_list:
        print("getting ", i, " row...")
        #get track
        track = sp.track(songID)
        trackImageUrl = track['album']['images']
        if(trackImageUrl != []):
            trackImage.append(trackImageUrl[0]['url'])
        else:
            trackImage.append('N/A')
        
        artist = sp.artist(track["artists"][0]["external_urls"]["spotify"])
        artistImageUrl = artist['images']
        if(artistImageUrl != []):
            artistImage.append(artistImageUrl[0]['url'])
        else:
            artistImage.append('N/A')

        if i % 200 == 0:
            time.sleep(6)

        i = i + 1

song_info.insert(9, 'track image', trackImage, True)
song_info.insert(10, 'artist image', artistImage, True)
print("converting to csv...")
song_info.to_csv("add image.csv", mode='a', index = False)
print("csv successfully generated.")