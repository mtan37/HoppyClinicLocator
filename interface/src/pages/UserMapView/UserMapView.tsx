import React, { useEffect, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import './UserMapView.css';

import { MockClinicsData } from "../../MockClinicsData";
import { regularClinicMarker, emergencyClinicMarker, bothClinicMarker } from "./Components/Marker";

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

/**
 * Initialize map
 * @param param0 
 * @returns 
 */
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
    const GOOGLE_MAP_LEGEND_ID = "google_map_legend";
    useEffect(() => {
        // populate the div with id GOOGLE_MAP_DIV_ID with google map
        let map_element = document.getElementById(GOOGLE_MAP_DIV_ID);
        if (map_element == undefined ) return;
        let map = new google.maps.Map(map_element, {
            center: center,
            zoom: zoom
        })
        setMapObject(map);
    }, [""]);
  
    return (
        <>
            <div id={GOOGLE_MAP_DIV_ID} style={{ height: '100vh', width: '100%' }}>
            </div>
            <div id={GOOGLE_MAP_LEGEND_ID}></div>
        </>
    );
  }

  /**
   * Add a new market to the map, and all the event listener needed by each marker
   * @param map 
   * @param lat 
   * @param lng 
   */
const addMarker = (
    map: google.maps.Map,
    lat: number,
    lng: number,
    clinicType: number) => {
        let markerType = regularClinicMarker;
        switch (clinicType) {
            case 0: // regular
                markerType = regularClinicMarker;
                break;
            case 1: // emergency only
                markerType = emergencyClinicMarker;
                break;
            case 2: // both
                markerType = bothClinicMarker;
                break;
        }
        var marker = new google.maps.Marker({
            map: map,
            position: {lat, lng},
            icon: markerType
        });
        marker.addListener("click", () => {
            map.setZoom(12);
            map.panTo(marker.getPosition() as google.maps.LatLng);
        });
}

function UserMapView() {
    
    let api_key: string = "";
    const DEFAULT_CENTER = { lat: 44.500000, lng: -89.500000 };
    const DEFAULT_ZOOM = 10;
    const [userLocation, setUserLocation] = useState<{lat: number, lng: number}>(DEFAULT_CENTER);
    const [mapObject, setMapObject] = useState<google.maps.Map | undefined>(undefined);

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
        MockClinicsData.forEach(clinic => {
            // put together the address
            addMarker(mapObject, parseFloat(clinic.lat), parseFloat(clinic.lng), clinic["clinic type"]);
        })

    }, [mapObject])
    return (
        <Wrapper apiKey={api_key} render={render}>
            <MapComponent center={userLocation} zoom={DEFAULT_ZOOM} setMapObject={setMapObject}/>
        </Wrapper>
    ); 
}

export default UserMapView;