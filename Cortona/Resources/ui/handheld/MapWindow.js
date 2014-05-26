//Map Window Component Constructor
function MapWindow() {
	//load component dependencies
	var MapView = require('ui/common/MapView');

	var path = 'ui/handheld/';

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT],
		statusBarStyle: Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK
	});
	
	//construct UI
	var mapView = new MapView();	
	self.add(mapView);
	
	var selfNav = Ti.UI.createView({
		top: 0,
		height: '64dp',
		backgroundColor: '#000000'
	});
	
	var navTitle = Ti.UI.createLabel({
		bottom: '12dp',
		text: '- ' + String(L('mappa')) + ' -',
		font: { fontSize: 16, fontFamily:'Helvetica Neue' },
		color: '#ffffff'
	});	
	selfNav.add(navTitle);
	
	var navBack = Ti.UI.createButton({
		width: '12dp',
   		height: '21dp',
		left: '8dp',
		bottom: '10dp',
		backgroundImage: 'back-arrow.png',
		color: '#ffffff'
	});	
	
	navBack.addEventListener('click', function(e) {
		var Window;
	    Window = require(path + 'ApplicationWindow');
	  	new Window().open();
	});
	
	selfNav.add(navBack);

	self.add(selfNav);

	return self;
}

//make constructor function the public component interface
module.exports = MapWindow;
