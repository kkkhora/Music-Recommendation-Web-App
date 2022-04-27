import Head from 'next/head';
import BannerTwo from '../components/BannerTwo';
import Searchbygenre from '../components/Searchbygenre';
import LiveAuction from '../components/LiveAuction';
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
