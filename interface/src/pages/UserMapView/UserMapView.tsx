import React, { useEffect, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './UserMapView.css';

const render = (status: Status): ReactElement => {
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
    setMapObject
  }: {
    center: google.maps.LatLngLiteral;
    zoom: number;
    setMapObject: React.Dispatch<React.SetStateAction<google.maps.Map|undefined>>;
  }) {
    const GOOGLE_MAP_DIV_ID = "google_map_div";
    useEffect(() => {
        // populate the div with id GOOGLE_MAP_DIV_ID with google map
        let map_element = document.getElementById(GOOGLE_MAP_DIV_ID);
        if (map_element == undefined ) return;
        setMapObject(new google.maps.Map(map_element, {
            center: center,
            zoom: zoom
        }))
    }, [""]);
  
    return <div id={GOOGLE_MAP_DIV_ID} style={{ height: '100vh', width: '100%' }}/>;
  }

  /**
   * Add a new market to the map, and all the event listener needed by each marker
   * @param map 
   * @param lat 
   * @param lng 
   */
const addMarker = (map: google.maps.Map, geocoder: google.maps.Geocoder, address: string) => {

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK' && results != null) {

          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
          marker.addListener("click", () => {
            map.setZoom(12);
            map.panTo(marker.getPosition() as google.maps.LatLng);
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
}

function UserMapView() {
    let api_key: string = "";
    const DEFAULT_CENTER = { lat: 44.500000, lng: -89.500000 };
    const DEFAULT_ZOOM = 10;
    const [userLocation, setUserLocation] = useState<{lat: number, lng: number}>(DEFAULT_CENTER);
    const [mapObject, setMapObject] = useState<google.maps.Map | undefined>(undefined);
    const [geocoder, setGeoCoder] = useState<google.maps.Geocoder>(new google.maps.Geocoder());

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            setUserLocation({lat: position.coords.latitude, lng: position.coords.longitude})
        });
    }



    if (process.env.REACT_APP_GOOGLE_MAP_KEY != undefined) {
        api_key = process.env.REACT_APP_GOOGLE_MAP_KEY;
    }

    useEffect(() => {
        if (mapObject == undefined) return;
        
        // populate markers
        addMarker(mapObject, geocoder, "3840 S Moorland Road New Berlin, WI 53151")

    }, [mapObject])
    return (
        <Wrapper apiKey={api_key} render={render}>
            <MapComponent center={userLocation} zoom={DEFAULT_ZOOM} setMapObject={setMapObject} />
        </Wrapper>
    ); 
}

export default UserMapView;