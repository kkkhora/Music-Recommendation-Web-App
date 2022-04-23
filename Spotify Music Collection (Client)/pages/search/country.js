// import PageHeader from '../components/PageHaeder';
import React from 'react';
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
import {withRouter} from 'next/router';
import Link from "next/link";
// import { getSearchCountry } from '../fetcher'
const PageHeaderText =
{
    "linkText":"Home",
    "heading":"NFT Ranking"
};


class country extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        countryCode: props.router.query.countryCode,
        countryResults: [],
        page: 1,
      };
      
      // console.log(props.router.query)
      this.countryCodeOnChange = this.countryCodeOnChange.bind(this);
      this.pageOnChange = this.pageOnChange.bind(this)
    }
  
    // countryOnChange(value) {
    //   // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    //   // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    //   getAllMatches(null, null, value).then(res => {
    //     this.setState({matchesResults: res.results})
    //   })
    // }
  
    componentDidMount() {
      this.getSearchCountry();
      console.log(this.state.countryResults)
    }
  
    getSearchCountry(){
      fetch(`http://localhost:8080/search/country?countryCode=${this.state.countryCode}&page=${this.state.page}`, {
        method: "GET",
      }).then(res=> {
        return res.json();
      }, err => {
        console.log(err);
      }).then(res => {
        this.setState({countryResults: res.results})
      }).catch((err)=>console.log(err));
    };

    countryCodeOnChange(e){
      this.setState({
        countryCode: e.target.value,
      });
    }

    pageOnChange(e){
      this.setState({
        page: e.target.value,
      });
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
                    <li className="active">Song Display</li>
                    </div> 
                </div>
            </div>
        </div>
    </section>
        <section className="ranking-section padding-top padding-bottom">
        <div className="container">
            <div className="section-header">
                <div className="nft-filter d-flex flex-wrap align-items-center justify-content-center  gap-15">
                    <h3>Search Song by Country</h3>
                </div>
            </div>
            <div className="ranking-wrapper table-responsive">
                <table className="table table-hover rank-table">
                    <thead>
                        <tr>
                            <th scope="col">track id</th>
                            <th scope="col">Song Name</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Release Year </th>
                            <th scope="col">Genre </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.countryResults.map((item, i=1) =>(
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
                                            <div className="rank-col-content">
                                                <a href="#">{`${item.Song_name}`}</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rank-vol">
                                        <div className="rank-vol-inner d-flex flex-wrap align-items-center">
                                            <div className="rank-vol-thumb">

                                            </div>
                                            <div className="rank-vol-content">
                                                {`${item.Artist_name}`}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rank-owner">{`${item.Album_year}`}</td>
                                    <td className="rank-assets">{`${item.Song_genre}`}</td>
                                </tr>
                            ))
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    </section>
        </div>
      )
  
  }
    

}
export default withRouter(country)
// export default country
  