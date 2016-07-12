require(['knockout', 'viewmodel', 'domReady'], function(ko, appViewModel) {
    ko.applyBindings(new appViewModel());
});




// TODO:
// Error handling: use a timeout to check if map object exists?
// Load map and foursquare data asynchronously, and improve performance generally.
// Bug: infoarea now minimizes when selected place is filtered out. But now have confusion between info being closed vs minimized
// Bug: marker icons 404 not found on gh-pages. Wait 10 mins and see...

// Style infoarea
// Custom markers (e.g. food and drink icon): glyphicon-cutlery, glyphicon-tree-conifer, glyphicon-tower (for historical stuff)
// glyphicon-map-marker, glyphicon-eye-open, glyphicon-home
// Small icon 50 px dark grey #333
// Selected icon 60 px green #009973


// Tidy up variable definitions, got lots of vars at the moment


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