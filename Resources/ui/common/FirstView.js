//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	self.orientationModes = [Titanium.UI.PORTRAIT];

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	//var label = Ti.UI.createLabel({
	//	color:'#000000',
	//	text:String.format(L('welcome'),'Titanium'),
	//	height:'auto',
	//	width:'auto'
	//});
	//self.add(label);

	//Add behavior for UI
	//label.addEventListener('click', function(e) {
	//	alert(e.source.text);
	//});
		
	var db = Ti.Database.install('/db/CoTM.sqlite', 'CoTM');
	if(Ti.Platform.osname != 'android')
		db.file.setRemoteBackup(false);	
	
	var Map = require('ti.map');	
	
	var mapView = Map.createView({
		mapType:Map.NORMAL_TYPE,
		region: {
			latitude:43.275556, longitude:11.988056,
            latitudeDelta:0.012, longitudeDelta:0.012
        },
        animate:true,
    	regionFit:true,
    	userLocation:true,
    	showsPointsOfInterest:false,
    	userLocationButton:true //android only
	});
		
	var sponsorRow = db.execute('SELECT sid, sname, sponsor_cat.cname, lat, lng, sponsor_cat.marker FROM sponsor JOIN sponsor_cat ON sponsor_cat.cid = sponsor.cid');
	while (sponsorRow.isValidRow())
	{
	  var sponsorId = sponsorRow.fieldByName('sid');
	  var sponsorName = sponsorRow.fieldByName('sname');
	  var sponsorLat = sponsorRow.fieldByName('lat');
	  var sponsorLng = sponsorRow.fieldByName('lng');
	  var sponsorCatName = sponsorRow.fieldByName('cname');
	  var sponsorCatMarker = sponsorRow.fieldByName('marker');
	  //Ti.API.info(sponsorId + ' ' + sponsorName + ' ' + sponsorLat + ' ' + sponsorLng + ' ' + sponsorCatName + ' ' + sponsorCatMarker);
	  
	  var sponsorPOI = Map.createAnnotation({
		  latitude: sponsorLat,
		  longitude: sponsorLng,
		  title: ' ' + sponsorName,
		  subtitle: ' ' + sponsorCatName,
		  leftButton: '/db/logos/' + sponsorId + '.jpg',
		  pid: sponsorId // custom property
	  });
	  
	  if (Ti.Platform.osname == 'android') {
	  	switch (sponsorCatMarker) {
	  		case '#CC0000':
	  			sponsorPOI.pincolor = Map.ANNOTATION_RED;
	  			break;
	  		case '#00CC00':
	  			sponsorPOI.pincolor = Map.ANNOTATION_GREEN;
	  			break;	
	  		case '#0000CC':
	  			sponsorPOI.pincolor = Map.ANNOTATION_AZURE;
	  			break;	
	  	}
	  } else {
        sponsorPOI.image = '/db/pins/' + sponsorCatMarker + '.gif';
      }
	  
	  mapView.addAnnotation(sponsorPOI);
	  sponsorRow.next();
	}
	
	sponsorRow.close();
    db.close();
	
	self.add(mapView);	
	
	// Handle click events on any annotations on this map.
	mapView.addEventListener('click', function(evt) {				
		if ( evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane') {
			//Ti.API.info(evt.title + ", id: " + evt.annotation.pid);
		   	//Create and Open the Details window with pid parameter			
			var sponsorDetails = require('/ui/common/SponsorDetailsView');
		   	new sponsorDetails(evt.annotation.pid).open();
		}
	});

	return self;
}

module.exports = FirstView;
