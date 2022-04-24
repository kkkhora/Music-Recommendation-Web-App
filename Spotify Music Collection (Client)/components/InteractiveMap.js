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

const markers = [
    {
        markerOffset: -5,
        name: "Argentina",
        countryCode: "AR",
        coordinates: [-58.3816, -34.6037],
    },
    {
        markerOffset: -5,
        name: "Austria",
        countryCode:"AT",
        coordinates:[16.366667, 48.2]
    },
    {
        markerOffset: -5,
        name: "Australia",
        countryCode:"AU",
        coordinates:[149, -35]
    },
    {
        markerOffset: -5,
        name:"Barbados",
        countryCode:"BB",
        coordinates:[-59, 13]
    },
    {
        markerOffset: -5,
        name:"Belgium",
        countryCode:"BE",
        coordinates:[4, 50]
    },
    {
        markerOffset: -5,
        name:"Bulgaria",
        countryCode:"BG",
        coordinates:[-1, 12]
    },
    {
        markerOffset: -5,
        name:"Brazil",
        countryCode:"BR",
        coordinates:[-48, -16]
    },
    {
        markerOffset: -5,
        name:"Bahamas",
        countryCode:"BS",
        coordinates:[-77, 25]
    },
    {
        markerOffset: -5,
        name:"Canada",
        countryCode:"CA",
        coordinates:[-76, 45]
    },
    {
        markerOffset: -5,
        name:"Switzerland",
        countryCode:"CH",
        coordinates:[7.46667, 46.91666]
    },
    {
        markerOffset: -5,
        name:"Chile",
        countryCode:"CL",
        coordinates:[-70.6667, -33.45]
    },
    {
        markerOffset: -5,
        name:"China",
        countryCode:"CN",
        coordinates:[116, 40]
    },
    {
        markerOffset: -5,
        name:"Colombia",
        countryCode:"CO",
        coordinates:[-74, 4.6]
    },
    {
        markerOffset: -5,
        name:"Cuba",
        countryCode:"CU",
        coordinates:[-82.3, 23.11]
    },
    {
        markerOffset: -5,
        name:"Cyprus",
        countryCode:"CZ",
        coordinates:[14.4667, 50.083]
    },
];

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
        <h3>Click the red circle on the map to search songs!</h3>
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
                    <circle r = {4} fill="#F00" stroke="#fff" strokeWidth={2} onMouseEnter = {()=> {
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