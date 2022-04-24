import PageHeader from '../components/PageHaeder';
import InteractiveMap from '../components/InteractiveMap';
// import{BrowseRouter as Router} from 'react-router-dom';


const PageHeaderText =
{
    "linkText":"Home",
    "heading":"Find Songs by Country"
};


const country = () => {
    return (
      <div>
        <PageHeader text={PageHeaderText} />
        <InteractiveMap/> 
      </div>
    )
  }
  
  export default country;