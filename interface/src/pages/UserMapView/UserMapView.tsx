import { useEffect, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './UserMapView.css';

const render = (status: Status): ReactElement => {
    console.log("Test: I am here #2");
    switch (status) {
        case Status.LOADING:
            return <h3>{status} ..</h3>;
        case Status.FAILURE:
            return <h3>{status} ..</h3>;
        default:
            return <></>;
    }
};

function MapComponent({
    center,
    zoom,
  }: {
    center: google.maps.LatLngLiteral;
    zoom: number;
  }) {
    const GOOGLE_MAP_DIV_ID = "google_map_div";
    useEffect(() => {
        // populate the div with id GOOGLE_MAP_DIV_ID with google map
        let map_element = document.getElementById(GOOGLE_MAP_DIV_ID);
        if (map_element == undefined ) return;
        new google.maps.Map(map_element, {
            center: center,
            zoom: zoom
        })
    }, [""]);
  
    return <div id={GOOGLE_MAP_DIV_ID} style={{ height: '100vh', width: '100%' }}/>;
  }

function UserMapView() {
    let api_key: string = "";
    const DEFAULT_CENTER = { lat: -34.397, lng: 150.644 };
    const DEFAULT_ZOOM = 4;

    if (process.env.REACT_APP_GOOGLE_MAP_KEY != undefined) {
        api_key = process.env.REACT_APP_GOOGLE_MAP_KEY;
    }
    return (
        <Wrapper apiKey={api_key} render={render}>
            <MapComponent center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} />
        </Wrapper>
    ); 
}

export default UserMapView;