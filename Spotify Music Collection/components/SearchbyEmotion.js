import Collector from './common/Collector';
import User from '../data/User/Users.json';
import Link from 'next/link';
import DiscreteSliderLabel4 from './Slider_others';
import DiscreteSliderLabel3 from './Slider_Tempo';
import Explaintion from './Explaintion';
import Explaintion2 from './Explaintion2';
import Explaintion3 from './Explaintion3';
import Explaintion4 from './Explaintion4';
import Explaintion5 from './Explaintion5';
import Explaintion6 from './Explaintion6';
import Explaintion7 from './Explaintion7';
import Checkbox from './Checkbox';
import { useState } from 'react';

var TopCollector = User.slice(0, 9);


const SearchbyEmotion = () => {
    const [value, setvalue] = useState({
        Acousticness: [0, 1],
        Valence: [0, 1],
        Danceability: [0, 1],
        Energy: [0, 1],
        Instrumentalness: [0, 1],
        Tempo: [0, 223],
        // minAcousticness:'',
        // maxAcousticness:'',
        // minValence:'',
        // maxValence:'',
        // minDanceability:'',
        // maxDanceability:'',
        // minEnergy:'',
        // maxEnergy:'',
        // minInstrumentalness:'',
        // maxInstrumentalness:'',
        // minTempo:'',
        // maxTempo:'',
        happysad: 'h'
        // happy:'',
        // sad:''
    });

    const handlechange = (filed, newValue) => {
        setvalue({
            ...value,
            [`${filed}`]: newValue
        });
    }

    const handlecheckbox = (filed, val) => {
        if (filed === 's') {
            setvalue({
                ...value,
                happysad: (value.happysad === filed && !val) ? 'h' : 's'
            });
        } else {
            setvalue({
                ...value,
                happysad: (value.happysad === filed && !val) ? 's' : 'h'
            });
        }


    }

    return (
        <div>
            <section className="seller-section pb-100">
                <div className="container">
                    <div className="section-header">
                        <h3 className="header-title">Browse By Emotional Tendency </h3>
                        <div className="header-content">
                        </div>
                    </div>
                    <div className="section-wrapper">
                        <div className="seller-wrapper">
                            <div>

                                <h6><span className="gradient-text-yello">Drag to select the emotional tendency range:</span></h6>
                                <div> &nbsp;  </div>
                                <h8><span className="gradient-text-yello">Accousticness:<Explaintion /></span></h8><DiscreteSliderLabel4 value={value} setvalue={handlechange} filed='Acousticness' />
                                <h8><span className="gradient-text-yello">Valence:<Explaintion2 /></span></h8><DiscreteSliderLabel4 value={value} setvalue={handlechange} filed='Valence' />
                                <h8><span className="gradient-text-yello">Danceability:<Explaintion3 /></span></h8><DiscreteSliderLabel4 value={value} setvalue={handlechange} filed='Danceability' />
                                <h8><span className="gradient-text-yello">Energy:<Explaintion4 /></span></h8><DiscreteSliderLabel4 value={value} setvalue={handlechange} filed='Energy' />
                                <h8><span className="gradient-text-yello">Instrumentalness:<Explaintion5 /></span></h8><DiscreteSliderLabel4 value={value} setvalue={handlechange} filed='Instrumentalness' />
                                <h8><span className="gradient-text-yello">Tempo:<Explaintion6 /></span></h8><DiscreteSliderLabel3 value={value} setvalue={handlechange} filed='Tempo' />
                                <h8><span className="gradient-text-yello">Happy<Checkbox value={value} setvalue={handlecheckbox} filed='h' />/ Sad<Checkbox value={value} setvalue={handlecheckbox} filed='s' /><Explaintion7 /></span></h8>

                            </div>


                            <div> &nbsp;  </div>
                        </div>
                        <div> &nbsp;  </div>
                        <div className="text-center mt-2z">
                            <Link href={{
                                pathname: 'search/emotionRange',
                                query: {
                                    minAcousticness: value.Acousticness[0],
                                    maxAcousticness: value.Acousticness[1],
                                    minValence: value.Valence[0],
                                    maxValence: value.Valence[1],
                                    minDanceability: value.Danceability[0],
                                    maxDanceability: value.Danceability[1],
                                    minEnergy: value.Energy[0],
                                    maxEnergy: value.Energy[1],
                                    minInstrumentalness: value.Instrumentalness[0],
                                    maxInstrumentalness: value.Instrumentalness[1],
                                    minTempo: value.Tempo[0],
                                    maxTempo: value.Tempo[1],
                                    happysad:value.happysad
                                },
                            }}>
                                <a className="default-btn move-right"><span>Submit</span></a>
                            </Link>



                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SearchbyEmotion;