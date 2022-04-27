import {useState} from "react"
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";
import ReactTootip from "react-tooltip";
// import {useNavigate} from "react-router-dom";
import Link from 'next/link';


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const countryCapitals = [{"CountryName":"Argentina","CapitalName":"Buenos Aires","CapitalLatitude":"-34.583333333333336","CapitalLongitude":"-58.666667","CountryCode":"AR","ContinentName":"South America"},
{"CountryName":"Austria","CapitalName":"Vienna","CapitalLatitude":"48.2","CapitalLongitude":"16.366667","CountryCode":"AT","ContinentName":"Europe"},
{"CountryName":"Australia","CapitalName":"Canberra","CapitalLatitude":"-35.266666666666666","CapitalLongitude":"149.133333","CountryCode":"AU","ContinentName":"Australia"},
{"CountryName":"Barbados","CapitalName":"Bridgetown","CapitalLatitude":"13.1","CapitalLongitude":"-59.616667","CountryCode":"BB","ContinentName":"North America"},
{"CountryName":"Belgium","CapitalName":"Brussels","CapitalLatitude":"50.833333333333336","CapitalLongitude":"4.333333","CountryCode":"BE","ContinentName":"Europe"},
{"CountryName":"Bulgaria","CapitalName":"Sofia","CapitalLatitude":"42.68333333333333","CapitalLongitude":"23.316667","CountryCode":"BG","ContinentName":"Europe"},
{"CountryName":"Brazil","CapitalName":"Brasilia","CapitalLatitude":"-15.783333333333333","CapitalLongitude":"-47.916667","CountryCode":"BR","ContinentName":"South America"},
{"CountryName":"Bahamas","CapitalName":"Nassau","CapitalLatitude":"25.083333333333332","CapitalLongitude":"-77.350000","CountryCode":"BS","ContinentName":"North America"},
{"CountryName":"Canada","CapitalName":"Ottawa","CapitalLatitude":"45.416666666666664","CapitalLongitude":"-75.700000","CountryCode":"CA","ContinentName":"Central America"},
{"CountryName":"Switzerland","CapitalName":"Bern","CapitalLatitude":"46.916666666666664","CapitalLongitude":"7.466667","CountryCode":"CH","ContinentName":"Europe"},
{"CountryName":"Chile","CapitalName":"Santiago","CapitalLatitude":"-33.45","CapitalLongitude":"-70.666667","CountryCode":"CL","ContinentName":"South America"},
{"CountryName":"China","CapitalName":"Beijing","CapitalLatitude":"39.916666666666664","CapitalLongitude":"116.383333","CountryCode":"CN","ContinentName":"Asia"},
{"CountryName":"Colombia","CapitalName":"Bogota","CapitalLatitude":"4.6","CapitalLongitude":"-74.083333","CountryCode":"CO","ContinentName":"South America"},
{"CountryName":"Cuba","CapitalName":"Havana","CapitalLatitude":"23.116666666666667","CapitalLongitude":"-82.350000","CountryCode":"CU","ContinentName":"North America"},
{"CountryName":"Czech Republic","CapitalName":"Prague","CapitalLatitude":"50.083333333333336","CapitalLongitude":"14.466667","CountryCode":"CZ","ContinentName":"Europe"},
{"CountryName":"Germany","CapitalName":"Berlin","CapitalLatitude":"52.516666666666666","CapitalLongitude":"13.400000","CountryCode":"DE","ContinentName":"Europe"},
{"CountryName":"Denmark","CapitalName":"Copenhagen","CapitalLatitude":"55.666666666666664","CapitalLongitude":"12.583333","CountryCode":"DK","ContinentName":"Europe"},
{"CountryName":"Estonia","CapitalName":"Tallinn","CapitalLatitude":"59.43333333333333","CapitalLongitude":"24.716667","CountryCode":"EE","ContinentName":"Europe"},
{"CountryName":"Egypt","CapitalName":"Cairo","CapitalLatitude":"30.05","CapitalLongitude":"31.250000","CountryCode":"EG","ContinentName":"Africa"},
{"CountryName":"Spain","CapitalName":"Madrid","CapitalLatitude":"40.4","CapitalLongitude":"-3.683333","CountryCode":"ES","ContinentName":"Europe"},
{"CountryName":"Finland","CapitalName":"Helsinki","CapitalLatitude":"60.166666666666664","CapitalLongitude":"24.933333","CountryCode":"FI","ContinentName":"Europe"},
{"CountryName":"France","CapitalName":"Paris","CapitalLatitude":"48.86666666666667","CapitalLongitude":"2.333333","CountryCode":"FR","ContinentName":"Europe"},
{"CountryName":"United Kingdom","CapitalName":"London","CapitalLatitude":"51.5","CapitalLongitude":"-0.083333","CountryCode":"GB","ContinentName":"Europe"},
{"CountryName":"Georgia","CapitalName":"Tbilisi","CapitalLatitude":"41.68333333333333","CapitalLongitude":"44.833333","CountryCode":"GE","ContinentName":"Europe"},
{"CountryName":"Croatia","CapitalName":"Zagreb","CapitalLatitude":"45.8","CapitalLongitude":"16.000000","CountryCode":"HR","ContinentName":"Europe"},
{"CountryName":"Hungary","CapitalName":"Budapest","CapitalLatitude":"47.5","CapitalLongitude":"19.083333","CountryCode":"HU","ContinentName":"Europe"},
{"CountryName":"Indonesia","CapitalName":"Jakarta","CapitalLatitude":"-6.166666666666667","CapitalLongitude":"106.816667","CountryCode":"ID","ContinentName":"Asia"},
{"CountryName":"India","CapitalName":"New Delhi","CapitalLatitude":"28.6","CapitalLongitude":"77.200000","CountryCode":"IN","ContinentName":"Asia"},
{"CountryName":"Iceland","CapitalName":"Reykjavik","CapitalLatitude":"64.15","CapitalLongitude":"-21.950000","CountryCode":"IS","ContinentName":"Europe"},
{"CountryName":"Italy","CapitalName":"Rome","CapitalLatitude":"41.9","CapitalLongitude":"12.483333","CountryCode":"IT","ContinentName":"Europe"},
{"CountryName":"Jersey","CapitalName":"Saint Helier","CapitalLatitude":"49.18333333333333","CapitalLongitude":"-2.100000","CountryCode":"JE","ContinentName":"Europe"},
{"CountryName":"Jamaica","CapitalName":"Kingston","CapitalLatitude":"18","CapitalLongitude":"-76.800000","CountryCode":"JM","ContinentName":"North America"},
{"CountryName":"Japan","CapitalName":"Tokyo","CapitalLatitude":"35.68333333333333","CapitalLongitude":"139.750000","CountryCode":"JP","ContinentName":"Asia"},
{"CountryName":"South Korea","CapitalName":"Seoul","CapitalLatitude":"37.55","CapitalLongitude":"126.983333","CountryCode":"KR","ContinentName":"Asia"},
{"CountryName":"Luxembourg","CapitalName":"Luxembourg","CapitalLatitude":"49.6","CapitalLongitude":"6.116667","CountryCode":"LU","ContinentName":"Europe"},
{"CountryName":"Latvia","CapitalName":"Riga","CapitalLatitude":"56.95","CapitalLongitude":"24.100000","CountryCode":"LV","ContinentName":"Europe"},
{"CountryName":"Mexico","CapitalName":"Mexico City","CapitalLatitude":"19.433333333333334","CapitalLongitude":"-99.133333","CountryCode":"MX","ContinentName":"Central America"},
{"CountryName":"Malaysia","CapitalName":"Kuala Lumpur","CapitalLatitude":"3.1666666666666665","CapitalLongitude":"101.700000","CountryCode":"MY","ContinentName":"Asia"},
{"CountryName":"Nigeria","CapitalName":"Abuja","CapitalLatitude":"9.083333333333334","CapitalLongitude":"7.533333","CountryCode":"NG","ContinentName":"Africa"},
{"CountryName":"Nicaragua","CapitalName":"Managua","CapitalLatitude":"12.133333333333333","CapitalLongitude":"-86.250000","CountryCode":"NI","ContinentName":"Central America"},
{"CountryName":"Netherlands","CapitalName":"Amsterdam","CapitalLatitude":"52.35","CapitalLongitude":"4.916667","CountryCode":"NL","ContinentName":"Europe"},
{"CountryName":"Norway","CapitalName":"Oslo","CapitalLatitude":"59.916666666666664","CapitalLongitude":"10.750000","CountryCode":"NO","ContinentName":"Europe"},
{"CountryName":"New Zealand","CapitalName":"Wellington","CapitalLatitude":"-41.3","CapitalLongitude":"174.783333","CountryCode":"NZ","ContinentName":"Australia"},
{"CountryName":"Panama","CapitalName":"Panama City","CapitalLatitude":"8.966666666666667","CapitalLongitude":"-79.533333","CountryCode":"PA","ContinentName":"Central America"},
{"CountryName":"Peru","CapitalName":"Lima","CapitalLatitude":"-12.05","CapitalLongitude":"-77.050000","CountryCode":"PE","ContinentName":"South America"},
{"CountryName":"Philippines","CapitalName":"Manila","CapitalLatitude":"14.6","CapitalLongitude":"120.966667","CountryCode":"PH","ContinentName":"Asia"},
{"CountryName":"Pakistan","CapitalName":"Islamabad","CapitalLatitude":"33.68333333333333","CapitalLongitude":"73.050000","CountryCode":"PK","ContinentName":"Asia"},
{"CountryName":"Poland","CapitalName":"Warsaw","CapitalLatitude":"52.25","CapitalLongitude":"21.000000","CountryCode":"PL","ContinentName":"Europe"},
{"CountryName":"Portugal","CapitalName":"Lisbon","CapitalLatitude":"38.71666666666667","CapitalLongitude":"-9.133333","CountryCode":"PT","ContinentName":"Europe"},
{"CountryName":"Romania","CapitalName":"Bucharest","CapitalLatitude":"44.43333333333333","CapitalLongitude":"26.100000","CountryCode":"RO","ContinentName":"Europe"},
{"CountryName":"Serbia","CapitalName":"Belgrade","CapitalLatitude":"44.833333333333336","CapitalLongitude":"20.500000","CountryCode":"RS","ContinentName":"Europe"},
{"CountryName":"Russia","CapitalName":"Moscow","CapitalLatitude":"55.75","CapitalLongitude":"37.600000","CountryCode":"RU","ContinentName":"Europe"},
{"CountryName":"Sweden","CapitalName":"Stockholm","CapitalLatitude":"59.333333333333336","CapitalLongitude":"18.050000","CountryCode":"SE","ContinentName":"Europe"},
{"CountryName":"Senegal","CapitalName":"Dakar","CapitalLatitude":"14.733333333333333","CapitalLongitude":"-17.633333","CountryCode":"SN","ContinentName":"Africa"},
{"CountryName":"Turkey","CapitalName":"Ankara","CapitalLatitude":"39.93333333333333","CapitalLongitude":"32.866667","CountryCode":"TR","ContinentName":"Europe"},
{"CountryName":"Ukraine","CapitalName":"Kyiv","CapitalLatitude":"50.43333333333333","CapitalLongitude":"30.516667","CountryCode":"UA","ContinentName":"Europe"},
{"CountryName":"United States","CapitalName":"Washington","CapitalLatitude":"38.89","CapitalLongitude":"-77.000000","CountryCode":"US","ContinentName":"America"},
{"CountryName":"Uruguay","CapitalName":"Montevideo","CapitalLatitude":"-34.85","CapitalLongitude":"-56.166667","CountryCode":"UY","ContinentName":"South America"},
{"CountryName":"Saint Vincent and the Grenadines","CapitalName":"Kingstown","CapitalLatitude":"13.133333333333333","CapitalLongitude":"-61.216667","CountryCode":"VC","ContinentName":"Central America"},
{"CountryName":"Venezuela","CapitalName":"Caracas","CapitalLatitude":"10.483333333333333","CapitalLongitude":"-66.866667","CountryCode":"VE","ContinentName":"South America"},
{"CountryName":"South Africa","CapitalName":"Pretoria","CapitalLatitude":"-25.7","CapitalLongitude":"28.216667","CountryCode":"ZA","ContinentName":"Africa"},
];
const markers = [];

for(var i = 0, len = countryCapitals.length; i < len; i++){
    markers.push({
        markerOffset: -5,
        name: countryCapitals[i].CountryName,
        countryCode: countryCapitals[i].CountryCode,
        coordinates: [countryCapitals[i].CapitalLongitude, countryCapitals[i].CapitalLatitude]});
}

const InteractiveMap = () => {
    // const history = useHistory();
    // const navigate = useNavigate();
    // const handleClick = () => {
    //     history.push("/index");
    // }
    const [content, setcontent] = useState("");

    return (
      <div>
         {/* <div style = {{display: 'flex', AlignItems: 'center', justifyContent:'center'}}></div> */}
        <h3>Click the RED DOT on the map!</h3>
        <ReactTootip place="top" type="info" effect="float">{content}</ReactTootip>
        {/* <div style = {{width: "1000px", borderStyle: "double", display: 'flex', AlignItems: 'center', justifyContent:'center', backgroundImage:"url('assets/background/pure white.jpg')"}}> */}
        <div className="map-wrapper">
        <ComposableMap data-tip="">
            <ZoomableGroup zoom={1}>
            <Geographies geography = {geoUrl}>
            {({geographies}) =>
            geographies.map((geo) => (
                <Geography
                    key = {geo.rsmKey}
                    geography={geo}
                    // onClick = {handleClick}
                    onMouseEnter = {()=>{
                       const{NAME} = geo.properties
                       setcontent(`${NAME}`);
                    }}
                    onMouseLeave = {()=>{setcontent("");}}
                    style = {{
                        hover: {
                            fill: "#F53",
                            outline: "none",
                        }
                    }}
                    />
            ))
            }
        </Geographies>
        {
            markers.map(({name,countryCode,coordinates, markerOffset})=> (
                <Marker key={name} coordinates = {coordinates}>
                    <Link href={{pathname: '/search/country', query: {countryCode: countryCode}}}>
                    <circle r = {3} fill="#F00" stroke="#fff" strokeWidth={1} onMouseEnter = {()=> {
                        setcontent(`${name}`);}}
                        />
                    </Link>
                </Marker>
            ) )
        }
            </ZoomableGroup>
        </ComposableMap>
        </div>
      </div>
    )
  }
  
  export default InteractiveMap;