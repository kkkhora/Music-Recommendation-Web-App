import ActivitySingle from '../components/common/ActivitySingle';
import PageHeader from '../components/PageHaeder';



const PageHeaderText =
{
    "linkText":"Home",
    "heading":"All Developers"
};

const Activities = [
    {
        "id":1,
        "title":"Fonda TSANG",
        "by":"fonda@upenn.seas.edu",
    },
    {
        "id":2,
        "title":"Huaying GU",
        "by":"huaying@seas.upenn.edu",
    },
    {
        "id":3,
        "title":"Haoning GONG",
        "image":"assets/images/activity/01.gif",
        "by":"ghaoning@seas.upenn.edu",
    },
    {
        "id":4,
        "title":"Mingwei RUAN",
        "image":"assets/images/activity/01.gif",
        "by":"ruanm@seas.upenn.edu",
    }
];


const Activity = () => {


    return (
        <div>
        <PageHeader text={PageHeaderText} />
        
        <section className="activity-section padding-top padding-bottom">
        <div className="container">

            <div className="section-wrapper">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="section-header">
                            <h3>Developers</h3>
                            <div className="nft-filter d-flex flex-wrap justify-content-center gap-15">
                                <div className="form-floating">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="activity-wrapper activity-loadmore">
                            <div className="row gy-3">
                                {
                                    Activities.map((item) =>(
                                        <div className="col-12" key={item.id}>
                                            <ActivitySingle item={item} />
                                        </div>
                                    ))
                                }
                                
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

export default Activity;