"use strict"

var map;
var current_latitude;
var current_longitude;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    current_latitude = position.coords.latitude;
    current_longitude = position.coords.longitude; 
}

function initMap() {
  getLocation();
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: { lat: current_latitude, lng: current_longitude},
    zoom: 15
  });
  google.maps.event.addDomListener(window, 'load', initialize);
}

function initialize() {
	//load objects
    var find = document.getElementById('find');
    var events;
    //add events
    loadData();
    find.addEventListener("click", findEvents);
}

function findEvents() {
	document.getElementById('map-canvas').style.visibility = "visible";
	document.getElementById('moveLeft').style.width = "35%";
	document.getElementById('moveLeft').style.float = "left";
	document.getElementById('map-canvas').style.float = "right";
	document.getElementById('map-canvas').style.width = "60%";
	document.getElementById('body').style.paddingTop = "0";
	//document.getElementById('moveLeft').style.transform = "translate3d(200px,200px,0px)";
	//document.getElementById('moveLeft').style.animationTimingFunction = "ease-in";
}

//makes a new google maps object using the latitudes and longitudes
function makeGoogleMapObject(latitude, longitude){
    var latLong = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: latLong,
        map: map
    });
}


function geocodeLocation(sDate, description, location, name) {
    var geoCoder = new google.maps.Geocoder();
    var address = location;
    geoCoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            var eventDate = sDate.split("T")[0];
            var contentString = '<p id="eventName">Event: ' + name + '</p>' + '<p id = "startTime">Starts at: ' + eventDate + '!</p>' ;
            attachInfoWindow(marker, contentString);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//attach info window to given marker
function attachInfoWindow(marker, contentString) {
    var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 300   
    });

    google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map, marker);
    });
}

