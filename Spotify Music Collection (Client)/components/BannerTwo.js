import Link from 'next/link';

const BannerTwo = () => {
    return (
        <section className="banner-section" style={{backgroundImage:"url('assets/images/banner/bg-1.jpg')"}}>
            <div className="container">
                <div className="banner-wrapper">
                    <div className="row align-items-center g-7">
                        <div className="col-lg-7">
                            <div className="banner-content">
                                <h1 className="mb-3"><span className="gradient-text-orange">Search</span> For Your Favourite
                                    <span className="gradient-text-pink"> Songs</span>
                                </h1>
                                <p className="mb-5">You can browse your favourite songs by song name, year, genre and artist name.</p>
                            </div>



                    <div className="breadcrumb">
                    <li >
                    <Link href="/">
                    <a style={{color: '#ebf0ff', fontWeight: 'bold', fontSize: '18px'}}>← Back to Home</a>
                    </Link> 
                    </li>
                    </div>
 

                        </div>
                        <div className="col-lg-3">
                            <div className="banner-image">
                                <img src="assets/images/banner/banner_img.png" alt="NFT Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerTwo