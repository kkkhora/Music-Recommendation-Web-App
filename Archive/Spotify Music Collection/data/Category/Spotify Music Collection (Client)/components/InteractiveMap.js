import {useState} from "react"
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation,
    ZoomableGroup,
} from "react-simple-maps";
import ReactTootip from "react-tooltip";
// import {useNavigate} from "react-router-dom";
import Link from 'next/link';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
    {
        markerOffset: -5,
        name: "US",
        coordinates: [-58.3816, -34.6037],
    },
    {
        markerOffset: -5,
        name:"Melbourne",
        coordinates:[144.963058, -37.813629]
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
        <h3>Click the red circle on the map to search songs!</h3>
        <ReactTootip>{content}</ReactTootip>
        <div style = {{width: "1200px", borderStyle: "double", justifyContent:'center', backgroundImage:"url('assets/background/pure white.jpg')"}}>
        <ComposableMap data-tip="">
            {/* <ZoomableGroup zoom={1}> */}
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
            markers.map(({name, coordinates, markerOffset})=> (
                <Marker key={name} coordinates = {coordinates}>
                    <Link href={{pathname: '/search/country', query: {countryCode: name}}}>
                    <circle r = {4} fill="#F00" stroke="#fff" strokeWidth={2}/>
                    </Link>
                    <text textAnchor="middle" y={markerOffset} style = {{fontFamily: "system-ui", fill: "#5D5A6D"}}>
                        {name}
                    </text>
                </Marker>
            ) )
        }
            {/* </ZoomableGroup> */}
        </ComposableMap>
        </div>
      </div>
    )
  }
  
  export default InteractiveMap;