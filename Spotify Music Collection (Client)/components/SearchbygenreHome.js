
import CategoryList from '../data/Category/CategoryHome.json';
import Link from 'next/link';

//var LatestNewsList = NewsList.slice(0,3);

const SearchbygenreHome = () => {
    return(
        <div>
            <section className="blog-section pb-120">
        <div className="container">
            <div className="section-header">
                <h3 className="header-title"> Search song by Genre</h3>
                <div className="header-content">
                    <Link href="/indextwo">
                    <a
                        className="default-btn style-2 small-btn move-right"><span>View All
                            <i className="icofont-circled-right"></i></span></a>
                    </Link> 
                    </div>
            </div>

            <div className="section-wrapper">
            <div className="row row-cols-10 row-cols-md-5 row-cols-xl-auto g-2">
                    {
                        CategoryList.map((item) =>(
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

export default SearchbygenreHome