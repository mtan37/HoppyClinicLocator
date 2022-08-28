const icon_path = "M 12 15 L 15 14 L 15 11 L 14 10 L 15 7 L 14 7 L 13 10 L 11 10 L 10 7 L 9 7 L 10 10 L 9 11 L 9 14 Z M 12 2.016 Q 14.906 2.016 16.945 4.055 T 18.984 9 Q 18.984 10.453 18.257 12.328 T 16.499 15.844 T 14.46 18.914 T 12.749 21.187 L 11.999 21.984 Q 11.718 21.656 11.249 21.117 T 9.561 18.961 T 7.428 15.82 T 5.764 12.375 T 5.014 9 Q 5.014 6.094 7.053 4.055 T 11.998 2.016 Z";

export const regularClinicMarker = {
    path: icon_path,
    fillColor: "LightBlue",
    fillOpacity: 1,
    strokeWeight: .5,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

export const emergencyClinicMarker = {
    path: icon_path,
    fillColor: "LemonChiffon",
    fillOpacity: 1,
    strokeWeight: .5,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

export const bothClinicMarker = {
    path: icon_path,
    fillColor: "Indigo",
    fillOpacity: 1,
    strokeWeight: .5,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

// key names are used in legend generation
export const icons = {
    "Regular Clinic Only": regularClinicMarker,
    "Emergency Clinic Only": emergencyClinicMarker,
    "Full Service Clinic": bothClinicMarker};