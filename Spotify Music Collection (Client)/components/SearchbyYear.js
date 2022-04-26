

import Link from 'next/link';
import DiscreteSliderLabel from './Slider';
import { useState } from 'react';



    
const SearchbyYear = () => {
    const [query, setquery] = useState()
    const [value, setValue] = useState([1933, 2021]);
    const handleChangeVal = (e) => { 
        setquery(e.target.value)
    }

    return (
        <div>
            <section className="seller-section pb-100">
        <div className="container">
            <div className="section-header">
                <h3 className="header-title">Browse By Year</h3>
                <div className="header-content">
                </div>
            </div>
            <div className="section-wrapper">
                   <div>
                    <h6><span className="gradient-text-yello">Drag to select the year range:</span></h6>
                    <div> &nbsp;  </div>
                   <DiscreteSliderLabel value={value} setValue={setValue}/>
                    </div>
                    <div className="text-center mt-2z">
                        <Link href={`search/yearRange?startYear=${value[0]}&endYear=${value[1]}`}>
                        <a className="default-btn move-right"><span>Submit</span></a>
                        </Link>

                   
                </div>
                    <div className="seller-wrapper">
                        <form action="#" className="header__search">
                        <input type="text" onChange={(e)=>handleChangeVal(e)} placeholder="Search by Exact Year"value={query}></input>
                        </form>
                        <div> &nbsp;  </div>       
                        </div>
                        <div> &nbsp;  </div>                             
                    <div className="text-center mt-2z">
                        <Link href={`search/year?year=${query}`}>
                        <a className="default-btn move-right"><span>Submit</span></a>
                        </Link>
                     
                   
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}

export default SearchbyYear;