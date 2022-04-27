import React, {useState} from 'react';
import {withRouter} from 'next/router';
import Link from "next/link";
import ReactPaginate from 'react-paginate';


class country extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        countryCode: props.router.query.countryCode,
        countryResults: [],
        page: 1,
      };
      
      // console.log(props.router.query)
      // this.countryCodeOnChange = this.countryCodeOnChange.bind(this);
      this.pageOnChange = this.changePage.bind(this)
    }
  
    componentDidMount() {
      this.getSearchCountry();
    };
  
    changePage = ({selected}) => {
        this.setState({page: selected + 1})
        console.log(selected)
    };

    
    getSearchCountry(){
      fetch(`http://localhost:3001/search/country?countryCode=${this.state.countryCode}`, {
        method: "GET",
      }).then(res=> {
        return res.json();
      }, err => {
        console.log(err);
      }).then(res => {
        this.setState({countryResults: res.results})
      }).catch((err)=>console.log(err));
    };

    // countryCodeOnChange(e){
    //   this.setState({
    //     countryCode: e.target.value,
    //   });
    // }
    
    userLike = (userID, songID) => {
        fetch(`http://localhost:3001/check/${userID}/${songID}`).then(res => {
            return res.json();
        }).then((data) => {
            
            if(data.status == 'success' ){
                alert("Thank you for liking this song!");
            }
            if(data.status == 'fail' ){
                alert("You already liked this song!");
            }   
        }
        )

    }
    render() {
  
      return (
        <div>
           <section className="page-header-section style-1">
        <div className="container">
            <div className="page-header-content">
                <div className="page-header-inner">
                    <div className="page-title">
                        <h2>Song Display </h2>

                    </div >
                    <div className="breadcrumb">
                    <li>
                    <Link href="/">
                    <a>Home</a>
                    </Link> 
                    </li>
                    <li>
                    <Link href="/map">
                    <a>Map</a>
                    </Link> 
                    </li>
                    <li className="actives">Song Display</li>
                    </div> 
                </div>
            </div>
        </div>
    </section>
        <section className="ranking-section padding-top padding-bottom">
        <div className="container">
            <div className="section-header">
                <div className="nft-filter d-flex flex-wrap align-items-center justify-content-center  gap-15">
                    <h3>Search Songs by Country</h3>
                </div>
            </div>
            <div className="ranking-wrapper table-responsive">
            <table className="table table-hover rank-table" style={{
                            'table-layout': 'fixed',
                        }}>
                    <thead>
                        <tr>
                            <th scope="col">Item Number</th>
                            <th scope="col">Song Name</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Release Year </th>
                            <th scope="col">Genre </th>
                            <th scope="col">Add to Playlist</th>
                            <th scope="col">Listen on Spotify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.countryResults.slice((this.state.page - 1)*10, (this.state.page - 1)*10 + 10).map((item, i=1) =>(
                                <tr key={item.song_ID}>
                                    <th scope="row" className="rank-sl">{i+1}</th>
                                    <td className="rank-collection">
                                        <div className="rank-col-inner d-flex flex-wrap align-items-center">
                                            <div className="rank-col-thumb">
                                                <a href="#">
                                                    <img className="rounded-circle" src={`${item.Track_image}`}
                                                        alt="Collection Image" />
                                                </a>

                                            </div>
                                            <div className="rank-col-content" style={{ width: 100 }}>
                                                <a href="#">{`${item.Song_name}`}</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rank-vol">
                                        <div className="rank-vol-inner d-flex flex-wrap align-items-center">
                                            <div className="rank-vol-thumb">

                                            </div>
                                            <div className="rank-vol-content" style={{ width: 100 }}>
                                                {`${item.Artist_name}`}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rank-owner" style={{ width: 100 }}>{`${item.Album_year}`}</td>
                                    <td className="rank-assets">
                                    <div className="rank-vol-content" style={{
                                                    width: 200, 'white-space': 'nowrap',
                                                    overflow: 'hidden',
                                                    'text-overflow': 'ellipsis'
                                                }}>
                                        {`${item.Song_genre}`}
                                    </div>
                                        </td>
                                    <td className="rank-assets">
                                                    <img src="http://localhost:3000/assets/images/logo/likes-button.png" id = 'button' onClick = {() => this.userLike(window.localStorage.getItem("username"), String(item.Song_ID))} alt="Likes" />
                                            </td>
                                    <td className="rank-assets">
                                                <a target='_blank' href={`https://open.spotify.com/track/${item.Song_ID.split(':')[item.Song_ID.split(':').length - 1]}`}>
                                                    <img src="http://localhost:3000/assets/images/logo/spotify_logo3.png" alt="Spotify Logo" />
                                                </a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
              <ReactPaginate 
              previousLabel={"<<"} 
              nextLabel={">>"} 
              pageCount={Math.ceil(this.state.countryResults.length / 10)} 
              onPageChange={this.pageOnChange}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              />
            </div>
        </div>
    </section>
        </div>
      )
  
  }
    

}
export default withRouter(country)
// export default country
  