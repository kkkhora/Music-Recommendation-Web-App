import Link from 'next/link';

const ActivitySingle = ({item}) => {
    return(
        <div className="activity-item">
            <div
                className="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                
                <div className="lab-content">
                    <h4>
                        <Link href="/itemdetails">
                        <a>{`${item.title}`}</a>
                        </Link>
                    </h4>
                    <p className="user-id">Contact: 
                    <a >{`${item.by}`}</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ActivitySingle;
