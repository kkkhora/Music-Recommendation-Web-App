import PageHeader from '../components/PageHaeder';
import { getSong } from './fetcher';
import { getPlaylist } from './fetcher';
import React , {useEffect} from "react";
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
            // username:window.localStorage.getItem("username"),
            username:"mruan",
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

        getSong(this.state.username).then(res => {
            this.setState({ songList: res.results })
        });

        getPlaylist(this.state.username).then(res => {
            this.setState({ playList: res.results })
        })
    }

    userLike = (userID, songID) => {

        if (!this.state.username) {
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
        if (!this.state.username) {
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
                                                        <button id = 'button' onClick = {() => this.userDislike(this.state.username, String(item.Song_ID))}> Unlike </button> 
                                                        <a target='_blank' href={`https://open.spotify.com/track/${item.Song_ID.slice(-22)}`}>

                                                    <img src="http://localhost:3000/assets/images/logo/spotify_logo.png" alt="Spotify Logo" width="50px" height="50px" />
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
                                                        <button id = 'button' onClick = {() => this.userLike(this.state.username, String(item.Song_ID))}> Like </button> 
                                                        <a target='_blank' href={`https://open.spotify.com/track/${item.Song_ID.slice(-22)}`}>

                                                    <img src="http://localhost:3000/assets/images/logo/spotify_logo.png" alt="Spotify Logo" width="50px" height="50px" />
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
