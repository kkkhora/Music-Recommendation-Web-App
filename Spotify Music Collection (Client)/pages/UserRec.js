import PageHeader from '../components/PageHaeder';
import {getSong} from '../pages/fetcher';
import { getPlaylist } from '../pages/fetcher';
import React , {useEffect} from "react";
import { useState} from 'react';
import Axios from 'axios';
// import { use } from '../../project_server_client/server/server';
// import LikeButton from '../../project_server_client/client/src/pages/LikeButton';

const PageHeaderText =
{
    "linkText":"Home",
    "heading":"Song Recommendation Test"
};


// const username = "mruan";



class UserRec extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            songList:[],
            playList:[]
        };

        this.userLike = this.userLike.bind(this);
        this.userDislike = this.userDislike.bind(this);
        // console.log(props.router.query)
      //   this.songOnChange = this.songOnChange.bind(this);
      //   this.goToSearch = this.goToSearch.bind(this)
      }
      componentDidMount() {
        console.log(window.localStorage.getItem("username"));
        getSong(window.localStorage.getItem("username")).then(res => {
            this.setState({ songList: res.results })
        });

        console.log(this.state.username)

        getPlaylist(window.localStorage.getItem("username")).then(res => {
            this.setState({ playList: res.results })
        });

    }

    setUsername = () => {
        const un = localStorage.getItem("username");
        return un;
    }

    userLike = (userID, songID) => {

        if (!window.localStorage.getItem("username")) {
            alert("Please log in first!");
            return;
        }

        fetch(`http://localhost:3001/like/${userID}/${songID}`, {
            method: 'GET'
          })
            .then(res => res.json())
            .then(res => {
              //res is {status: "success"} if server -> db is sucessful
              if (res.status === "success") {
                alert("Thank you for liking it!");
              } else {
                alert("Error!");
              }
            })
            .catch(err => console.log(err));
            window.location.reload(false);
    }

    userDislike = (userID, songID) => {
        if (!window.localStorage.getItem("username")) {
            alert("Please log in first!");
            return;
        }

        fetch(`http://localhost:3001/dislike/${userID}/${songID}`, {
            method: 'GET'
          })
            .then(res => res.json())
            .then(res => {
              //res is {status: "success"} if server -> db is sucessful
              if (res.status === "success") {
                alert("Sorry you don't like it!");
              } else {
                alert("Error!");
              }
            })
            .catch(err => console.log(err));
            console.log(songID)
            window.location.reload(false);
    }
    

    
    render() {
    return (
        <div>
        <PageHeader text={PageHeaderText} />
        
        <section className="activity-section padding-top padding-bottom">

            
        <div className="container">
             <div className="section-header">
                <h3>Your Playlist</h3>
                <div className="nft-filter d-flex flex-wrap justify-content-center gap-15">

                </div>
    
            </div>
            <div className="activity-wrapper activity-loadmore">
                            <div className="row gy-3">
                                {
                                    this.state.playList.map((item) =>(
                                        <div className="col-12" key={item.id}>
                                            <div className="activity-item">
                                                <div
                                                    className="lab-inner d-flex flex-row-reverse align-items-center p-3 p-md-4">
                                                    <div className="lab-thumb me-3 me-md-4">
                                                        <img src={`${item.Track_image}`} width="250px" height="160px" alt="Category Image" />
                                                    </div>
                                                    <div className="lab-content" >
                                                        <h4>
                                                            {/* <Link href="/itemdetails"> */}
                                                            <a>{`${item.Song_name}`}</a>
                                                            {/* </Link> */}
                                                        </h4>
                                                        <p className="mb-2">{`${item.Song_genre}`}
                                                        </p>
                                                        <p className="user-id">By: 
                                                        {/* <Link href="/author"> */}
                                                        <a >{`${item.Artist_name}`}</a>
                                                        {/* </Link> */}
                                                        </p>
                                                        <p>Released: {`${item.Album_year}`}</p>
                                                        <button id = 'button' onClick = {() => this.userDislike(window.localStorage.getItem("username"), String(item.Song_ID))}> Unlike </button> 
                                                        <a target='_blank' href={`https://open.spotify.com/track/${item.Song_ID.slice(-22)}`}>

                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg" alt="Spotify Logo" width="40px" height="40px" />
                                                </a>
                                                <a>

                                                </a>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                }
                                
                            </div>
                        </div>

            <div className="section-wrapper">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-header">
                            <h3>Guess What You like</h3>
                        </div>
                        <div className="activity-wrapper activity-loadmore">
                            <div className="row gy-3">
                                {
                                    this.state.songList.map((item) =>(
                                        <div className="col-12" key={item.id}>
                                            <div className="activity-item">
                                                <div
                                                    className="lab-inner d-flex flex-row-reverse align-items-center p-3 p-md-4">
                                                    <div className="lab-thumb me-3 me-md-4">
                                                        <img src={`${item.Track_image}`} width="250px" height="160px" alt="Category Image" />
                                                    </div>
                                                    <div className="lab-content" >
                                                        <h4>
                                                            {/* <Link href="/itemdetails"> */}
                                                            <a>{`${item.Song_name}`}</a>
                                                            {/* </Link> */}
                                                        </h4>
                                                        <p className="mb-2">{`${item.Song_genre}`}
                                                        </p>
                                                        <p className="user-id">By: 
                                                        {/* <Link href="/author"> */}
                                                        <a >{`${item.Artist_name}`}</a>
                                                        {/* </Link> */}
                                                        </p>
                                                        <p>Released: {`${item.Album_year}`}</p>
                                                        <button id = 'button' onClick = {() => this.userLike(window.localStorage.getItem("username"), String(item.Song_ID))}> Like </button> 
                                                        <a target='_blank' href={`https://open.spotify.com/track/${item.Song_ID.slice(-22)}`}>

                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg" alt="Spotify Logo" width="40px" height="40px" />
                                                </a>
                                                <a>

                                                </a>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                }
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
        
        </div>
    )
    }
}

export default UserRec;
