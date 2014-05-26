//Map Window Component Constructor
function MapWindow() {
	//load component dependencies
	var MapView = require('ui/common/MapView');

	//create component instance
	var self = Ti.UI.createWindow({
		title : "Mappa",
		backgroundColor: '#ffffff',
		navBarHidden: true,
		exitOnClose: false,
		orientationModes: [Ti.UI.PORTRAIT]
	});

	//construct UI
	var mapView = new MapView();
	self.add(mapView);

	return self;
}

//make constructor function the public component interface
module.exports = MapWindow;
