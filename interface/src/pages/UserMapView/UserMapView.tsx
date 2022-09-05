import React, { useEffect, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "./Components/MapComponent";

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

        markerType.anchor = new google.maps.Point(10, 23);
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