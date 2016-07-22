define(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBm8Vo8PUjj2HFaPBgfwKdTTjOyBo3LY-c&sensor=false!callback'], function() {
    // Google Maps API and all its dependencies will be loaded here.
    // Add error handling/timeout
    
    var map;

    var initMap = function() {
		    map = new google.maps.Map(document.getElementById('map'), {
		        center: {lat: 52.3610647, lng: -3.7881769},
		        zoom: 11,
		        mapTypeControl: false,
		        streetViewControl: false
		    });
		};

	initMap();

	return map;
});