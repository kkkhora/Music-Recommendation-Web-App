import PageHeader from '../components/PageHaeder';
import Signin from '../components/Signin';



const PageHeaderText =
{
    "linkText":"Home",
    "heading":"Sign In Page"
};

const Policy = () => {


    return (
        <div>
        <PageHeader text={PageHeaderText} />
        <div className="login-section padding-top padding-bottom">
            <div className=" container">
                <div className="row g-5 align-items-center flex-md-row-reverse">
                    <div className="col-lg-5">
                        <Signin />
                    </div>
                    <div className="col-lg-7">
                        <div className="account-img">
                            <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="shape-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </div>
    )
}

export default Policy;