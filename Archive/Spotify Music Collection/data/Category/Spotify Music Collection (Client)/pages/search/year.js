
import { useEffect, useState } from 'react';
//import PageHeader from '../components/PageHaeder';
import { getsearch_year } from '../fetcher';
import Link from "next/link";
import { Pagination } from 'antd';

const PageHeaderText =
{
    "linkText": "Home",
    "heading": "Search Results"
};


const song = () => {
    const [musicData, setMusicData] = useState([])
    const [count, setcount] = useState(0)

    const filterParams = async (page=1, pagesize=10) => {
        if (location.search.indexOf('?') !== -1) {
            let params = {}
            let newarr = location.search.split('?')[1].split('&')
            newarr.forEach(i => {
                let key = i.split('=')[0]
                params[key] = i.split('=')[1]
            });
            const { year } = params
            let { results,count } = await getsearch_year(year,page,pagesize)
            setMusicData(results)
            setcount(count)
            console.log(results);
        }

    }
    const handlepageChange = (page, pageSize) => {
        filterParams(page, pageSize) 
    }
    useEffect(() => {
        filterParams()
    }, [])
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
                            <h3>Search Song by Year</h3>
                        </div>
                    </div>
                    <div className="ranking-wrapper table-responsive">
                        <table className="table table-hover rank-table"
                            style={{
                                'table-layout': 'fixed',
                            }}>
                            <thead >
                                <tr>
                                    <th scope="col">Track id</th>
                                    <th scope="col" style={{ width: 200 }}>Song Name</th>
                                    <th scope="col">Artist</th>
                                    <th scope="col">Release Year </th>
                                    <th scope="col">Genre </th>
                                    <th scope="col">Spotify Link</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    musicData.map((item, i) => (
                                        <tr key={item.song_ID} >
                                            <th scope="row" className="rank-sl">{i + 1}</th>
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
                                                    <div className="rank-vol-content" style={{ width: 100 }} >
                                                        {item.Artist_name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="rank-owner" style={{ width: 100 }}>{item.Album_year}</td>
                                            <td className="rank-assets" style={{ width: 100 }}>{item.Song_genre}</td>
                                            {/* <td className="rank-assets" style={{ width: 100 }}>{item.Song_ID}</td> */}
                                            <td className="rank-assets"> 
                                              <a  target='_blank' href={`https://open.spotify.com/track/${item.Song_ID.split(':')[item.Song_ID.split(':').length-1]}`}>
                                              <img src="http://localhost:3000/assets/images/logo/spotify_logo3.png" alt="Spotify Logo" />
                                            </a></td>


                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                <Pagination  defaultCurrent={1} total={count}  onChange={ filterParams} />
                </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default song;