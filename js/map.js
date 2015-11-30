"use strict"

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 47.6550, lng: -122.3080},
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  google.maps.event.addDomListener(window, 'load', initialize);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
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
/*function makeGoogleMapObject(latitude, longitude){
    var latLong = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: latLong,
        map: map
    });
}*/


/*function geocodeLocation(sDate, description, location, name) {
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
*/
