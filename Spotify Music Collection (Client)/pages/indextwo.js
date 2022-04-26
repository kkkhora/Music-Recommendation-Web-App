
import BannerTwo from '../components/BannerTwo';
import Searchbygenre from '../components/Searchbygenre';
import SearchbyYear from '../components/SearchbyYear';
import SearchbyName from '../components/SearchbyName';

const HomeTwo = () => {
  return (
    <div>
      <BannerTwo />
      <SearchbyName />
      <SearchbyYear/>
      <Searchbygenre/>
    </div>
  )
}

export default HomeTwo
