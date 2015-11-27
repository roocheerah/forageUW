"use strict";
function initialize() {

    // global variables
    var events;  // stack of the JSON formatted events matching given zipcode

    // load data passed from the facebook API during login from local storage
    loadData();

    // loads facebook event data from local storage.
    function loadData(){
       events = localStorage.getItem('Events');

       //Checks whether the stored data exists
       if (!events) {
        return;
       }
      
       //Data exists in local storage
       alert("received data");
       console.log(events);
   
       //parse to Object Literal the JSON object
       for (var i =0; i < events.length; i++) {
        var temp = JSON.parse(events[i]);
        console.log(temp);
       }
    }
 
    // parses event information based on (1) Description, (2) Event Time and (3) Location
    function parseFacebookData() {
        for (var i = 0; i < events.length; i++) {
            var facebookEvent = events[i];
            var eventName = facebookEvent.name;

            // only look through the description for any matches if the event is current or in
            // the future.
            if (parseTime(facebookEvent.start_time, facebookEvent.end_time)) {
                // look through the description to find any indication of free events.
                parseDescription(facebookEvent.description);    
            }
        }
    }

    // parses the facebook event description to search for keywords
    function parseDescription(description) {
        var keywords = ["free", "swag"];
        var lines = description.split("[\n\t]");
        for (var i = 0; i < lines.length; i++) {
            var temp = line.toLowerCase();
            for (var j = 0; j < keywords.length; j++) {
                // TODO: Check for cases where multiple words in the keywords list is in the description
                if (strstr(temp, keywords[j])) {
                // found an event!
                // put a marker on the map!
                    geocodeLocation(sDate, description, location, name);
                }
            }
        }
    }

    //javascript function for getting the current date and time and comparing it to the venue to see if it matches 
    function parseTime(start, end){
        if (end) {
            var splitDate = end.split("-");
            for (var i = 0; i < splitDate.length; i+=3) {
                var year = parseInt(splitDate[i]);
                var month = parseInt(splitDate[i+1]);
                var day = parseInt(splitDate[i+2]);
            }
            var currentdate = new Date();
            if(year < currentdate.getFullYear()){ 
                return false; 
            } else if (year == currentdate.getFullYear()) {
                if (month < currentdate.getMonth()){
                    return false;
                } else if (month == currentdate.getMonth()) {
                    return (day - currentdate.getDate() >= 0) && checkTime(start, end);
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else { 
            return true; 
        }
    }

    //check if the event time is still valid
    function checkTime(start, end){
        if (end) {
            var splitTime1 = end.split("T");
            var midSplit = splitTime1[1].split("-");
            var splitTime2 = midSplit[0].split(":");
            var hour = splitTime2[0];
            var min = splitTime2[1];
            var sec = splitTime2[2];
            var currentdate = new Date();
            if(hour < currentdate.getHours()){ 
                return false; 
            } else if (hour == currentdate.getHours()) {
                if(min < currentdate.getMinutes()){
                    return false;
                }else if(min == currentdate.getMinutes()){
                    return (sec - currentdate.getSeconds() >= 0);
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }
    }
}

/*//parses the entered response in the search box
    function parseResponse() {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            makeGoogleMapObject(lat, lng);
            } 

            var closeEvents = [];

            // computes distance from given zipcode to location - if within 3200 meters, shows them
            for (var i = 0; i < exampleEvents.length; ++i) {
                var existingLatLong = new google.maps.LatLng(exampleEvents[i][1],
                exampleEvents[i][2]);
                var dist = google.maps.geometry.spherical.computeDistanceBetween(existingLatLong, latLong);
                if (Math.abs(dist) < 3200) {
                    closeEvents.push(exampleEvents[i]);
                }
            }
                  
            addExistingEvents(closeEvents);
    }*/
