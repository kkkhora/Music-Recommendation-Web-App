import BannerSingle from './common/BannerSingle'
import BannerImages from "../data/Banner/BannerImages.json";
import Link from 'next/link';

var BannerImageListOne = BannerImages.slice(0,12);
var BannerImageListTwo = BannerImages.slice(11,24);

const Banner = () => {

    return(
        <div>
        <section className="banner-section style-1"  style={{backgroundImage:"url('assets/images/banner/bg1.jpg')"}}>
            <div className="container">
                <div className="banner-wrapper">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-8">
                            <div className="banner-content text-center">
                                <h2><span className="gradient-text-bluegreen">Discover</span>, Select
                                    And <span className="gradient-text-pink">Listen</span> to Extraordinary <span className="gradient-text-bluepink">Songs</span> </h2>
                                <p>Digital music platforms that gives you access to thousand of songs from creators all over the world.</p>
                                <div className="banner-btns d-flex flex-wrap justify-content-center">
                                    <Link href="/indextwo">
                                    <a className="default-btn move-top"><span>Pick Songs By Song Info</span> 
                                    </a>
                                    </Link>

                                    <Link href="/map">
                                    <a className="default-btn move-top"><span>Pick Songs By Country</span>
                                    </a>
                                    </Link>

                                    <Link href="/indexthree">
                                    <a className="default-btn move-top"><span>Pick Songs By Emotional Tendency</span>
                                    </a>
                                    </Link>

                                    <Link href="/UserRec">
                                    <a className="default-btn move-top"><span>Guess what you like</span>
                                    </a>
                                    </Link>


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

export default Banner;