define(['knockout', 'locations', 'jquery', 'domReady'], function(ko, locations, $) {
    return function appViewModel() {
    	var self = this;
    	// Fetch initial array of locations from locations.js
    	var places = locations.getLocations();
    
    	// *** GOOGLE MAPS ***

		// Store all the map markers in an array
		self.markers = [];

		// Create a single infowindow instance, which we can open in the relevant place with the relevant content later
		self.infoWindow = new google.maps.InfoWindow();

		// Calls the createMapMarker function for each place in the places array
		function pinPoster(places){
			for (var i=0; i<places.length; i++) {		
				createMapMarker(places[i]);
			}
		}

		// Creates and places a single map marker
		function createMapMarker(place) {

			// Define and place a marker
			// Each marker also comes with the property visible: true
			var marker = new google.maps.Marker({
				map: map,
				position: place.location,
				name: place.name,
				icon: place.icons.basic || marker,
				icons: [place.icons.basic, place.icons.selected]
			});

			// Open the infowindow when a marker is clicked
			marker.addListener('click', function(){
				self.selectPlace(place);
				self.infoWindow.open(map, marker);			
			});

			// Add the marker to the markers array
			self.markers.push(marker);
		}

		pinPoster(places);

		function isInfoWindowOpen(infoWindow){
    		var map = infoWindow.getMap();
    		return (map !== null && typeof map !== "undefined");
		}

		self.filterMarkers = function(){
			// Switch visible property of markers on and off depending on whether the place is
			// In the knockout filteredPlaces array
			// (Could use a library utility function for this, rather than two nested forEach loops?)
			self.markers.forEach(function(marker){
				var infoWindowOpen = isInfoWindowOpen(self.infoWindow);
				// First set visibility to false, and close all infowindows and the info area
				marker.setVisible(false);
				
				self.filteredPlaces().forEach(function(place){
					// If a marker corresponds to a place in the filtered list of places, set visibility back to true
					if (marker.name == place.name){
						marker.setVisible(true);
						if (infoWindowOpen){
							self.infoWindow.open(map, marker);
						}	
					}
				});
			});
			// Allow default event handling
			return true;
		};

		// *** KNOCKOUT ***

		// Create an observable array of places
		self.observablePlaces = ko.observableArray(places);
		// Create an observable to hold the text typed into the filter box
		self.filterInput = ko.observable("");
		// Create a filtered array of places
		self.filteredPlaces = ko.computed(function(){
        	return ko.utils.arrayFilter(self.observablePlaces(), function(place) {
            	return (( place.name.toLowerCase().indexOf(self.filterInput().toLowerCase()) != -1 ) || 
            		(place.type.toLowerCase().indexOf(self.filterInput().toLowerCase()) != -1));
        	});
		});

		self.clearFilter = function(){
			self.filterInput("");
			self.filterMarkers();
		};

		self.selectedPlaceDefault = { name: "", images: [""], fourSqData: { got: false, url: "" } };
		self.selectedPlace = ko.observable(self.selectedPlaceDefault);

		self.selectPlace = function(clickedPlace){ 
			self.infoWindow.setContent('<div>' + clickedPlace.name + '</div>');
			if (!clickedPlace.fourSqData){
				self.getFourSqData(clickedPlace);
				self.selectedPlace(clickedPlace);		
			}
			else {
				self.selectedPlace(clickedPlace);
				self.fourSqData(clickedPlace.fourSqData);
			}
			self.selectMarker();

		};

		self.selectedMarker = ko.computed(function(){
			return ko.utils.arrayFirst(self.markers, function(marker) {
            	return ( marker.name == self.selectedPlace().name );
        	});
		});
		
		// Animate a marker and open its infowindow when it is clicked
		self.selectMarker = function(){
			var currentMarker = self.selectedMarker();
			self.markers.forEach(function(marker){
				marker.setMap(null);
				if (marker == currentMarker){
					marker.icon = marker.icons[1];
				}
				else {
					marker.icon = marker.icons[0];
				}
				marker.setMap(map);
			});
			self.infoWindow.open(map, currentMarker);
			var latLng = currentMarker.getPosition();
			map.panTo(latLng);
		};

		// Create an observable that holds the current foursquare data to display
		// Set default attributes to avoid problems with binding to undefined
		self.fourSqDefaults = {
			url: "",
			shortUrl: "",
			imgSrc: "",
			phone: "",
			rating: "",
			hours: {
				status: "",
				timeframes: [{
					days: "",
					segments: [{
						renderedTime: ""
					}]
				}]
			},
			errorMessage: ""
		};
		self.fourSqData = ko.observable(self.fourSqDefaults);

		// *** FOURSQUARE API ***

		var fourSqUrl = "https://api.foursquare.com/v2/venues/";
		var fourSqClientId = "1Z0V4PX11GK3JIEOMVMKJWYS1LOLTZHHWENWKDAQKRJQ1B1K";
		// NEED TO SECURE THIS
		var fourSqClientSt = "X11PKDW53IBYLDHFXFXE12PL2N0F4NC3A5LMLXY2HCWFFQ4P";
		
		var url, VENUE_ID;

		self.getFourSqData = function(place){
			// Check whether the place has a foursquare entry (those that do have a venue ID in our locations array)
			if (place.fourSq_VENUE_ID){
				VENUE_ID = place.fourSq_VENUE_ID;
				// Create custom url for the API call
				url = fourSqUrl + VENUE_ID + "?client_id=" + fourSqClientId + "&client_secret=" + fourSqClientSt + "&v=20160609";
				// API call
				$.getJSON(url, function(data){
					// Take the bits of the data we want and store them in a variable
					var usefulData = {
						url: data.response.venue.url || "",
						shortUrl: data.response.venue.shortUrl,
						imgSrc: data.response.venue.bestPhoto.prefix + "200x200" + data.response.venue.bestPhoto.suffix,
						phone: data.response.venue.contact.phone || "",
						rating: data.response.venue.rating || "",
						hours: data.response.venue.hours || self.fourSqDefaults.hours,
						errorMessage: ""
					};
					// Now set the current foursquare data
					self.fourSqData(usefulData);
					// And cache it in the places array
					place.fourSqData = usefulData;

				}).fail(function(){
					// Use jquery extend to make a deep copy without changing fourSqDefaults
					var usefulData = $.extend(true, {}, self.fourSqDefaults);
					usefulData.errorMessage = "Couldn't get data from FourSquare.";
					self.fourSqData(usefulData);
					console.log("Error fetching FourSquare data");
				});
			}
			// If there is no foursquare entry for the place, empty the current entry
			else {
				var usefulData = $.extend(true, {}, self.fourSqDefaults);
				usefulData.errorMessage = "No FourSquare entry for this location.";
				self.fourSqData(usefulData);
			}
		};

		// These relate to the info area (not infoWindow)
		self.infoIsExpanded = ko.observable(true);
		self.minimizeInfo = function(){
			self.infoIsExpanded(false);
		};

		self.maximizeInfo = function(){
			self.infoIsExpanded(true);
		};

		// Figures out whether info area should be visible, depending on whether the currently selected place is in the
		// filtered list or not
		self.infoAreaVisible = ko.computed(function(){
        	return ko.utils.arrayFilter(self.filteredPlaces(), function(place) {
        		return self.selectedPlace().name == place.name;
        	}).length;
		});

		self.listIsOpen = ko.observable(true);
		self.toggleList = function(){
			self.listIsOpen(!self.listIsOpen());
		};

		self.searchIsOpen = ko.observable(false);
		self.toggleSearch = function(){
			self.searchIsOpen(!self.searchIsOpen());
			// Should also clear filter if search is hidden or grey out the search button while filter is active?
		};
    };
});





