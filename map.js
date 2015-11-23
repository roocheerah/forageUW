"use strict"
window.onload = function(){
	var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: { lat: 47.6550, lng: -122.3080},
        zoom: 15
      });
    }
};