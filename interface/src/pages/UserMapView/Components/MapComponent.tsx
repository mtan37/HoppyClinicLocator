import React, { useEffect, ReactElement, useState } from "react";
import { icons } from "./Marker";

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
/*
        const legend = document.getElementById(GOOGLE_MAP_LEGEND_ID) as HTMLElement;

        for (const key in icons) {
          //const type = icons[key];
          //const name = type.name;
          //const icon = type.icon;
          const div = document.createElement("div");
      
          div.innerHTML = '<svg width="10" height="10"> <circle cx="10" cy="10" r="3" stroke-width="0" fill="yellow" /> </svg>';
          legend.appendChild(div);
        }
      
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
        */
        
    }, [""]);
  
    return (
        <>
            <div id={GOOGLE_MAP_DIV_ID} style={{ height: '100vh', width: '100%' }}>
            </div>
            <div id={GOOGLE_MAP_LEGEND_ID}><h3>Legend</h3></div>
        </>
    );
  }

  export default MapComponent;