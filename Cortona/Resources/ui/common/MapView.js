//FirstView Component Constructor
function MapView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
			
	var db = Ti.Database.install('/db/CoTM.sqlite', 'CoTM');
	if(Ti.Platform.osname != 'android')
		db.file.setRemoteBackup(false);	
	
	var Map = require('ti.map');	
	
	var mapView = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {
			latitude: 43.275556, longitude: 11.988056,
            latitudeDelta: 0.014, longitudeDelta: 0.014
        },
    	regionFit: true,
    	userLocation: true,
    	showsPointsOfInterest: false, //android only
    	animate: true, 
    	userLocationButton: true,
    	hideAnnotationWhenTouchMap: true
	});
	
	var sediRow = db.execute('SELECT sid, name, lat, lng, indirizzo FROM sedi');
	
	while (sediRow.isValidRow()) {
		var sedeId = sediRow.fieldByName('sid');
		var sedeName = sediRow.fieldByName('name');
		var sedeLat = sediRow.fieldByName('lat');
		var sedeLng = sediRow.fieldByName('lng');
		var sedeIndirizzo = sediRow.fieldByName('indirizzo');
		
		var sedePOI = Map.createAnnotation({
			latitude: sedeLat,
			longitude: sedeLng,
			title: sedeName,
			subtitle: sedeIndirizzo,
			pincolor: Map.ANNOTATION_RED,
			image: '/db/pins/sede.png',
			sid: sedeId // custom property
		});
		
		if(!Ti.Platform.Android && isiOS7()) {
			sedePOI.leftButton = '/db/pins/sede_icon.png';
		}
				
		if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
			sedePOI.image = '/db/pins/sede@2x.png';
		}
		
		mapView.addAnnotation(sedePOI);
		sediRow.next();
	}
	
	sediRow.close();
    db.close();
	
	self.add(mapView);	
	
	// Handle click events on any annotations on this map.
	mapView.addEventListener('click', function(evt) {
		
		var evento = (evt.clicksource == 'title') || (evt.clicksource == 'subtitle');
		
		if(!Ti.Platform.Android && isiOS7()) {
			evento = (evt.clicksource == 'leftButton') || (evt.clicksource == 'leftPane'); //fix iOS 7 bug
		}
		
		if ( evento ) {				
			if ( evt.annotation.pid ) {
				var sponsorDetails = require('/ui/common/SponsorDetailsView');
			   	new sponsorDetails(evt.annotation.pid).open();
			} else if ( evt.annotation.sid ) {
				var sedeDetails = require('/ui/common/SedeDetailsView');
			   	new sedeDetails(evt.annotation.sid).open();
			}
		}
	});

	return self;
}

// Function to test if device is iOS 7 (or later)
function isiOS7() {
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		if (major >= 7)
			return true;
	}
	return false;
}

module.exports = MapView;
