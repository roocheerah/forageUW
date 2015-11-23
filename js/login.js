"use strict";

window.fbAsyncInit = function() {
  FB.init({
    appId      : '932297393472020',
    xfbml      : true,
    version    : 'v2.5'
  });
  };

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var accessKey;
                
  function statusChangeCallback(response) {
          
    if (response.status === 'connected') {
      console.log("connected!");
        // Logged into your app and Facebook.
        accessKey = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
        console.log("needs to log into app");
    } else {
        console.log("needs to log into fb");
    }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
  });
}