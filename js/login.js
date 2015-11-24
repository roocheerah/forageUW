"use strict";

window.onload = function() {
  

  var accessKey;

  // Get the modal
  var modal = document.getElementById('myModal');

  var yesButton = document.getElementById('yes');
  var noButton = document.getElementById('no');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal 

  function openFunc() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {closeFunc()};

  function closeFunc() {
      modal.style.display = "none";
  }

  // If the user clicks on the yes button for continuing with facebook, redirect to main
  yesButton.onclick = function() {
    var events = JSON.stringify(findEvents());
    // saves data to local storage so the events can get picked up from any js file
    localStorage.setItem('Events', events);
    // reroute to the next page
    window.location.href = "http://roocheerah.github.io/forageUW/main";
  }

  // If the user clicks on the no button for not continuing with facebook.
  noButton.onclick = function() {
    window.location.href = "http://roocheerah.github.io/forageUW/";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event){
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      accessKey = response.authResponse.accessToken;
      // Need to have a pop-up dialog for continuing with previous users
      //var cont = window.confirm("Continue with facebook?");
      //if (cont) {
        // Should redirect to a different page with the map
      //  window.location.href = "http://roocheerah.github.io/forageUW/";
      //} else {
      //  window.location.href = "http://roocheerah.github.io/forageUW/";
      //}

      // Open the modal box for login stuff 
      openFunc();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '932297393472020',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  function findEvents() {
    var allEvents = [];
    FB.api(
      '/search',
      'GET',
      {"q":"98105","type":"event"},
      function(response) {
        // Insert your code here
        var data = response.data;
        console.log("Number of events matching that query are: " + data.length);
        for (var i = 0; i < response.data.length; ++i) {
          allEvents.push(response.data[i]);
        }
      }
    );

    FB.api(
      '/search',
      'GET',
      {"q":"98195","type":"event"},
      function(response) {
        // Insert your code here
        var data = response.data;
        console.log("Number of events matching that query are: " + data.length);
        for (var i = 0; i < response.data.length; ++i) {
          if (allEvents.indexOf(response.data[i]) == -1) {
            allEvents.push(response.data[i]);
          }
        }
      }
    );

    console.log("Printing out the allEventIds list again");
    console.log(allEvents);
    return allEvents;
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
    document.getElementById('fb_button').style.visibility = "hidden";
  }

};