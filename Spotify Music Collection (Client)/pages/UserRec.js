import PageHeader from '../components/PageHaeder';
import {getSong} from './fetcher';
import { getPlaylist } from './fetcher';
import React , {useEffect} from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState} from 'react';
import Axios from 'axios';
// import { use } from '../../project_server_client/server/server';
// import LikeButton from '../../project_server_client/client/src/pages/LikeButton';
import ReactPaginate from 'react-paginate';

const PageHeaderText =
{
    "linkText":"Home",
    "heading":"Song Recommendation"
};




class UserRec extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            songList:[],
            playList:[],
            page: 1
        };

        this.userLike = this.userLike.bind(this);
        // this.userDislike = this.userDislike.bind(this);
        this.pageOnChange = this.changePage.bind(this);
        
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
    // setUsername = () => {
    //     const un = localStorage.getItem("username");
    //     return un;
    // }
    changePage = ({selected}) => {
        this.setState({page: selected + 1})
        console.log(selected)
    };

    userLike = (userID, songID) => {
        if (!window.localStorage.getItem("username")) {
            alert("Please log in first!");
            return;
        }
        else {
            fetch(`http://localhost:3001/like/${userID}/${songID}`, {
                method: 'GET'
              })
                .then(res => res.json())
                .then(res => {
                  //res is {status: "success"} if server -> db is sucessful
                  console.log(res);
                  if (res.status === "success") {
                    alert("Song added to your playlist!");
                  } if(res.status === "fail" ){
                    alert("This song is already in your playlist!");
                }
                })
                .catch(err => console.log(err));
                // window.location.reload(false);
        }

    }

    
    handlepageChange = ({selected}) => {
        var page=selected + 1
        filterParams( page)
        console.log(selected)
    };

    
    filterParams = async () => {
        if (location.search.indexOf('?') !== -1) {
            let params = {}
            let newarr = location.search.split('?')[1].split('&')
            newarr.forEach(i => {
                let key = i.split('=')[0]
                params[key] = i.split('=')[1]
            });
            const { userid } = params
            let { results,count } = await getsearch_genre(userid)
            console.log(results);
            setMusicData(results)
            setcount(count)
        }

    }

    // userDislike = (userID, songID) => {
    //     if (!window.localStorage.getItem("username")) {
    //         alert("Please log in first!");
    //         return;
    //     }
    //     else {
    //         fetch(`http://localhost:3001/dislike/${userID}/${songID}`, {
    //             method: 'GET'
    //           })
    //             .then(res => res.json())
    //             .then(res => {
    //               //res is {status: "success"} if server -> db is sucessful
    //               if (res.status === "success") {
    //                 alert("Sorry you don't like it!");
    //               } else {
    //                 alert("Error!");
    //               }
    //             })
    //             .catch(err => console.log(err));
    //             console.log(songID);
    //             window.location.reload(false);
    //     }

    // }
    

    
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
                            <div className="header-content">
                                                <a className="default-btn style-2 small-btn move-right" onClick={() => window.location.reload(false)}>Refresh<RefreshIcon/>
                                                       </a>
                                        </div>
                        </div>
                        <div className="activity-wrapper activity-loadmore">
                            <div className="row gy-3">
                                {
                                   this.state.songList.slice((this.state.page - 1)*10, (this.state.page - 1)*10 + 10).map((item) =>(
                                        <div className="col-12" key={item.Song_ID}>
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
                                                        <img src="http://localhost:3000/assets/images/logo/likes-button.png"  id = 'button' onClick = {() => this.userLike(window.localStorage.getItem("username"), String(item.Song_ID))}/>  
                                                        <a target='_blank' href={`https://open.spotify.com/track/${item.Song_ID.slice(-22)}`}>
                                                        &nbsp;&nbsp;&nbsp;
                                                    <img src="http://localhost:3000/assets/images/logo/spot_button.png" alt="Spotify Logo" />
                                                </a>
                                                <a>

                                                </a>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                }
                        <ReactPaginate 
              previousLabel={"<<"} 
              nextLabel={">>"} 
              pageCount={Math.ceil(this.state.playList.length / 10)} 
              onPageChange={this.pageOnChange}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              />
                                
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
