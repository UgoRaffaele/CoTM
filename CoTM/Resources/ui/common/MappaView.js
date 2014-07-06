//MappaView Component Constructor
function MappaView() {
	//create object instance, a parasitic subclass of Observable
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT]
	});
	
	if (Titanium.Platform.name == 'iPhone OS') {
		
		self.applyProperties({ statusBarStyle: Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK });
		
		var theTop = isiOS7() ? 33 : 0;
	
		var navigation = Titanium.UI.iOS.createNavigationWindow({
		   window: self,
		   backgroundColor: '#000000'
		});
		
		var backButton = Titanium.UI.createButton({
			title: '',
		    width: '12dp',
	   		height: '21dp',
			left: '8dp',
			top: theTop,
			backgroundImage: 'back-arrow.png'
		});
		
		backButton.addEventListener('click', function(){
		    navigation.close({animated:true});
		});
		
		navigation.add(backButton);
		navigation.open();
		
	} 
	
	var db = Ti.Database.open('CoTM');
	
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
    
    var sponsorRow = db.execute('SELECT pid, cid, name, lat, lng, description FROM sponsor');
	
	while (sponsorRow.isValidRow()) {
		var sponsorId = sponsorRow.fieldByName('pid');
		var categoriaId = sponsorRow.fieldByName('cid');
		var sponsorName = sponsorRow.fieldByName('name');
		var sponsorLat = sponsorRow.fieldByName('lat');
		var sponsorLng = sponsorRow.fieldByName('lng');
		var sponsorIndirizzo = sponsorRow.fieldByName('description');
		
		var sponsorPOI = Map.createAnnotation({
			latitude: sponsorLat,
			longitude: sponsorLng,
			title: sponsorName,
			subtitle: sponsorIndirizzo,
			pincolor: Map.ANNOTATION_GREEN,
			pid: sponsorId // custom property
		});
		
		switch(categoriaId) {
			case 1:
				sponsorPOI.image = '/db/pins/mangiare.png';
				if(!Ti.Platform.Android && isiOS7()) {
					sponsorPOI.leftButton = '/db/pins/mangiare_icon.png';
				}
				if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
					sponsorPOI.image = '/db/pins/mangiare@2x.png';
				}
				break;
			case 2:
				sponsorPOI.image = '/db/pins/dormire.png';
				if(!Ti.Platform.Android && isiOS7()) {
					sponsorPOI.leftButton = '/db/pins/dormire_icon.png';
				}
				if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
					sponsorPOI.image = '/db/pins/dormire@2x.png';
				}
				break;
			case 3:
				sponsorPOI.image = '/db/pins/servizi.png';
				if(!Ti.Platform.Android && isiOS7()) {
					sponsorPOI.leftButton = '/db/pins/servizi_icon.png';
				}
				if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
					sponsorPOI.image = '/db/pins/servizi@2x.png';
				}
				break;
		}
		
		mapView.addAnnotation(sponsorPOI);
		sponsorRow.next();
	}
	
	sponsorRow.close();
    db.close();
    
    if(!Ti.Platform.Android) {
    	self.title = '- ' + String(L('mappa')).toUpperCase() + ' -';
    } else {
    	self.title = String(L('mappa')).toUpperCase();
    }
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } });
	
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

module.exports = MappaView;
