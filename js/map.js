"use strict"

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: { lat: 47.6550, lng: -122.3080},
    zoom: 15
  });
  google.maps.event.addDomListener(window, 'load', initialize);
}
