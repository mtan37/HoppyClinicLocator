import React, { useEffect, ReactElement, useState } from "react";

import "./MapComponent.css";

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
    useEffect(() => {
        // populate the div with id GOOGLE_MAP_DIV_ID with google map
        let map_element = document.getElementById(GOOGLE_MAP_DIV_ID);
        if (map_element == undefined ) return;

        let noPoi = [
          {
              featureType: "poi",
              stylers: [
                { visibility: "off" }
              ]   
            }
          ];
        let map = new google.maps.Map(map_element, {
            mapTypeControl: false,
            streetViewControl: false,
            center: center,
            zoom: zoom,
            styles: noPoi
        })
        setMapObject(map);
        
    }, [""]);
  
    return (
        <>
            <div id={GOOGLE_MAP_DIV_ID} className={"map_component_container"}>
            </div>
        </>
    );
  }

  export default MapComponent;