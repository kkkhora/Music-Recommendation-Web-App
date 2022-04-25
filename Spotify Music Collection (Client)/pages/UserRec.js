import PageHeader from '../components/PageHaeder';
import {getSong} from '../pages/fetcher'
import React , {useEffect} from "react";
import Axios from 'axios';
// import LikeButton from '../../project_server_client/client/src/pages/LikeButton';

const PageHeaderText =
{
    "linkText":"Home",
    "heading":"Song Recommendation"
};

const handleLike = () => {

    console.log("I like this song");
}

const username = "mruan";


const Like = (userID, songID) => {
    // Axios.post('http://localhost:8080/like', {
    //     username: userID, 
    //     songID: songID
    // }).then(response => {
    //     console.log("error");
    // })
    console.log(userID); 
    console.log(songID); 
}

class UserRec extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
  
          songList:[],
          page: 1
        };
        
        // console.log(props.router.query)
      //   this.songOnChange = this.songOnChange.bind(this);
      //   this.goToSearch = this.goToSearch.bind(this)
      }
      componentDidMount() {
        getSong().then(res => {
        this.setState({ songList: res.results })
    })

    }

    
    render() {
    return (
        <div>
        <PageHeader text={PageHeaderText} />
        
        <section className="activity-section padding-top padding-bottom">
        <div className="container">

            <div className="section-wrapper">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-header">
                            <h3>Guess What You like</h3>
                            <div className="nft-filter d-flex flex-wrap justify-content-center gap-15">
                                <div className="form-floating">
                                    <select className="form-select" id="sortSelect"
                                        aria-label="Floating label select example">
                                        <option>Newest</option>
                                        <option value="1">Trending</option>
                                        <option value="2">Most Viewed</option>
                                        <option value="3">Less Viewed</option>
                                        <option value="3">Ending Soon</option>
                                        <option value="3">Recently Sold </option>
                                        <option value="3">Recently Created </option>
                                        <option value="3">Recently Viewed </option>
                                        <option value="3">Ending Soon</option>
                                    </select>
                                    <label>Sort By</label>
                                </div>
                            </div>
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
                                                        <button id = 'button' onClick = {() => Like(username, item.Song_ID)}> Like </button> 
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
                                    // this.state.songList.map((item) =>(
                                    //     <div className="col" key={item.Song_id}>
                                    //         <div className="cat-item">                                    
                                    //             <div className="cat-inner">
                                    //                 <div className="cat-thumb">
                                    //                 <a href={`https://open.spotify.com/track/${item.Song_ID.slice(-22)}`} >
                                    //                     <img src={`${item.Track_image}`} width="160px" height="160px" alt="Category Image" />
                                    //                     </a>
                                    //                 </div>
                                    //                 <div className="cat-content">
                                    //                     <h6><a>{`${item.Song_name}`}</a></h6>
                                    //                     <button onClick = {handleLike}> Like </button>
                                    //                 </div>
                                    //             </div>
                                              
                                    //         </div>
                                    //     </div>
                                    // ))
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
