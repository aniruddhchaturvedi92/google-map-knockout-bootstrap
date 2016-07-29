require(['knockout', 'viewmodel', 'domReady'], function(ko, appViewModel) {
	'use strict';
    ko.applyBindings(new appViewModel());
});




// TODO:
// Load map and foursquare data asynchronously, and improve performance generally.

// Desirable: Fix active state of search icon (list icon works) and add a disabled state for when the filter is active.
// Hyperlink URL in foursquare data

// Custom markers (e.g. food and drink icon): glyphicon-cutlery, glyphicon-tree-conifer, glyphicon-tower (for historical stuff)
// glyphicon-map-marker, glyphicon-eye-open, glyphicon-home
// Small icon 50 px dark grey #333
// Selected icon 60 px green #009973


// List of actual places...
// Y Penty (special formatting)
// Hafod mansion, hafod river
// Viewpoint by bryn garw, Elan Valley
// Ynys las beach
// Halfway Inn, George Tavern
// Devil's Bridge Falls, Devil's Bridge Railway
// Aberystwyth Arts center
// That clean energy center... what's it called
// The Mecca
// Rob Ratray