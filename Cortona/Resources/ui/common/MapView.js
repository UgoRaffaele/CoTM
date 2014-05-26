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
			sid: sedeId // custom property
		});
		
		if(!Ti.Platform.Android) {
			sedePOI.applyProperties({ leftButton: '/db/pins/sede_icon.png' });
		}
		
		sedePOI.pincolor = Map.ANNOTATION_RED;
		sedePOI.image = '/db/pins/sede.png';
		
		mapView.addAnnotation(sedePOI);
		sediRow.next();
	}
	
	sediRow.close();
    db.close();
	
	self.add(mapView);	
	
	// Handle click events on any annotations on this map.
	mapView.addEventListener('click', function(evt) {
		
		var evento = (evt.clicksource == 'title') || (evt.clicksource == 'subtitle');
		
		if(!Ti.Platform.Android) {
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

module.exports = MapView;
