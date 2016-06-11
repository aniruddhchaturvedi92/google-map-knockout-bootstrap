
// Configure RequireJS
requirejs.config({
	baseUrl: "",
	shim: {
        "bootstrap" : { "deps" :['jquery'] }
    },
	paths: {
		jquery: 'lib/jquery.min',
		bootstrap: 'lib/bootstrap-3.3.6-dist/js/bootstrap.min',
		knockout: 'lib/knockout-3.4.0',
		domReady: 'lib/domReady',
		app: 'js/app',
		locations: 'js/locations',
		viewmodel: 'js/viewmodel'
	}
});