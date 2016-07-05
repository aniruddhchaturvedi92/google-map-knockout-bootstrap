define(function(){
	// Create global locations array
	// Might want to make 'type' an array to allow multiple types later, e.g. walk and historic site
	var initialLocations = [{
		name: "Elan Valley Visitors Centre", 
		location: {
			lat: 52.2694,
			lng: -3.5721700000000283
		},
		address: "Rhayader, LD65HP",
		type: "Things to Do",
		images: ["images/test.JPG"],
		icons: {
			basic: 'lib/icons/marker-36.png',
			selected: 'lib/icons/marker-48.png'
		},
		description: "Elan Valley visitors centre",
		fourSq_VENUE_ID: "4e7b38f8887750b4e49fd921"
	},{
		name: "Devil's Bridge Falls",
		location: {
			lat: 52.3769462,
			lng: -3.849800500000015
		},
		address: "Aberystwyth, SY23 3JW",
		type: "Historic Site",
		images: [],
		icons: {
			basic: 'lib/icons/marker-36.png',
			selected: 'lib/icons/marker-48.png'
		},
		description: "Waterfall and three bridges, site of the legend of Devil's bridge. Pay at a turnstile to access the footpath to walk around the falls.",
		fourSq_VENUE_ID: "4be5d877cf200f474fd3133c"
	},{
		name: "Halfway Inn",
		location: {
			lat: 52.38113389999999,
			lng: -3.949633199999994
		},
		address: "Aberystwyth, SY23 4NE",
		type: "Food and Drink",
		images: [],
		icons: {
			basic: 'lib/icons/marker-36.png',
			selected: 'lib/icons/marker-48.png'
		},
		description: "Shabby pub stopoff on the way to Aberystwyth",
		fourSq_VENUE_ID: "4f6ccb30e4b0e00759fcb715"
	},{
		name: "The Glengower Hotel",
		location: {
			lat: 52.4205461,
			lng: -4.0842316000000665
		},
		address: "3 Victoria Terrace, Aberystwyth, SY23 2DH",
		type: "Food and Drink",
		images: [],
		icons: {
			basic: 'lib/icons/marker-36.png',
			selected: 'lib/icons/marker-48.png'
		},
		description: "Waterfront pub-style bar looking over the bay in Aberystwyth",
		fourSq_VENUE_ID: "4be1aefd8dd062b5c37b3e3c"
	},{
		name: "Little Italy",
		location: {
			lat: 52.4156335,
			lng: -4.081345899999974
		},
		address: "51 North Parade, Aberystwyth, SY23 2JN",
		type: "Food and Drink",
		images: [],
		icons: {
			basic: 'lib/icons/marker-36.png',
			selected: 'lib/icons/marker-48.png'
		},
		description: "Cheap and cheerful Italian restaurant, popular eating spot in Aber",
		fourSq_VENUE_ID: "4bb3ae9b35f0c9b670bcbc83"
	},{
		name: "Ultracomida",
		location: {
			lat: 52.41502,
			lng: -4.08689
		},
		address: "31 Pier Street, Aberystwyth, SY23 2LN",
		type: "Food and Drink",
		images: [],
		icons: {
			basic: 'lib/icons/marker-36.png',
			selected: 'lib/icons/marker-48.png'
		},
		description: "Deli/cafe",
		fourSq_VENUE_ID: "4bf27bbfa32e20a14d3cd557"
	}]

	return {
		getLocations: function() { 
			return initialLocations; 
		}
	};
});

