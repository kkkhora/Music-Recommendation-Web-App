import CategoryList from "../data/Category/Category.json";
import Link from 'next/link';
import { useState } from 'react';

var CategoryGetList = CategoryList;

const Searchbygenre = () => {
    const [query, setquery] = useState({genre:''})

const handleChangeVal = (e,field) => { 
    setquery({
        ...query,
        [`${field}`]:e.target.value
    })
 }
    return(
        <div>
            <section className="catergory-section padding-top padding-bottom">
        <div className="container">
            <div className="section-header">
                <h3 className="header-title">Browse By Song Genre</h3>
                
            </div>
            <div className="category-wrapper">
                <div className="row row-cols-10 row-cols-md-5 row-cols-xl-auto g-2">
                    {
                        CategoryGetList.map((item) =>(
                            <div className="col" key={item.id}>
                                <div className="cat-item">
                                    <Link href={{pathname: '/search/genre', query: {genre:item.name}}}>
                                    <div className="cat-inner">
                                        <div className="cat-thumb">
                                            <img src={`${item.image}`} alt="Category Image" />
                                        </div>
                                        <div className="cat-content">
                                            <h6><a>{`${item.name}`}</a></h6>
                                        </div>
                                    </div>
                                    </Link>
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

export default Searchbygenre 