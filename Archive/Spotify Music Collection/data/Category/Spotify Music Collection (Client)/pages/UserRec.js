import React from 'react';
import PageHeader from '../components/PageHaeder';
// import {
//     Table,
//     Pagination,
//     Select,
//     Row,
//     Col,
//     Divider,
//     Slider,
//     Rate 
// } from 'antd'
// import {withRouter} from 'next/router';
// import Link from "next/link";
// import { getSearchCountry } from '../fetcher'
// const PageHeaderText =
// {
//     "linkText":"Home",
//     "heading":"NFT Ranking"
// };

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
    // goToSpotify(songId) {
    //     window.location = `https://open.spotify.com/track/${songId}`
    // }
  
    componentDidMount() {
        fetch(`http://localhost:8080/userRec/song?user=mruan`, {
            method: "GET",
          }).then(res=> {
            return res.json();
          }, err => {
            console.log(err);
          }).then(res => {
            this.setState({songList: res.results})
          }).catch((err)=>console.log(err));
      console.log(this.state.songList);

    }
  
    



    render() {
        return(
            <div>
            <section className="catergory-section padding-top padding-bottom">
        <div className="container">
            <div className="section-header">
                <h3 className="header-title">Guest what you like</h3>
                <div className="header-content">
                    <Link href="/exploretwo">
                    <a
                        className="default-btn style-2 small-btn move-right"><span>View All
                            <i className="icofont-circled-right"></i></span>
                    </a>
                    </Link> 
                            
                    </div>
            </div>
            <div className="category-wrapper">
                <div className="row row-cols-2 row-cols-lg-4 row-cols-xl-auto g-3">
                    {
                        this.state.songList.map((item) =>(
                            <div className="col" key={item.Song_id}>
                                <div className="cat-item">
                                    {/* <a href={`/search_song?id=${item.Song_id}`} > */}
                        
                                    <div className="cat-inner">
                                        <div className="cat-thumb">
                                        <a href={`https://open.spotify.com/track/${item.Song_ID.slice(-22)}`} >
                                            <img src={`${item.Track_image}`} width="128px" height="72px" alt="Category Image" />
                                            </a>
                                        </div>
                                        <div className="cat-content">
                                            <h6><a>{`${item.Song_name}`}</a></h6>
                                            <button onClick = {handleLike}> Like </button>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    </section>
        </div>
        ) 
 
  
  }
    

}

export default UserRec
// export default getRec()
// export default country