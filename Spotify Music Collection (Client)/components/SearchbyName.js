
import Link from 'next/link';
import { getsearch_song, } from '../pages/fetcher'
import { useState } from 'react';



const SearchbyName = () => {

    const [query, setquery] = useState({name:'',artist:''})

const handleChangeVal = (e,field) => { 
    setquery({
        ...query,
        [`${field}`]:e.target.value
    })
 }

    return (
        <div>
            <section className="seller-section pb-100">
        <div className="container">
            <div className="section-header">
                <h3 className="header-title">Browse By Song Name or Artist Name</h3>
                <div className="header-content">
                <Link href="/indextwo">
                    <a
                        className="default-btn style-2 small-btn move-right"><span>Refresh
                            <i className="icofont-circled-right"></i></span></a>
                    </Link> 
                </div>
            </div>
            <div className="section-wrapper">
                <div className="seller-wrapper">
                        <form action="#" className="header__search">
                        <input type="text" onChange={(e)=>handleChangeVal(e,'name')} placeholder="Search by Song Name" name="song" value={query.name}></input>
                        </form> 
                        <div> &nbsp;  </div>  
                        <div> &nbsp;  </div>  
                        <form action="#" className="header__search">
                        <input type="text" onChange={(e)=>handleChangeVal(e,'artist')}  placeholder="Search by Artist Name" name="artist" value={query.artist}></input>
                        </form>  
                        </div>     
                        <div> &nbsp;  </div>                 
                    <div className="text-center mt-2z">
                        <Link href={`/search/song?name=${query.name}&artist=${query.artist}`}>
                        <a className="default-btn move-right"><span>Submit</span></a>
                        </Link>
                      
                       
                        <div> &nbsp;  </div>  
                        <div> &nbsp;  </div>  
                    
           
              
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}

export default SearchbyName;