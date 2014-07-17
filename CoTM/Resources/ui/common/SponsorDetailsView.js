//SponsorsDetailsView Component Constructor
function SponsorDetailsView(id) {
	//create object instance, a parasitic subclass of Observable
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT],
		height: Ti.UI.FILL
	});
	
	if (Titanium.Platform.name == 'iPhone OS') {
		
		self.applyProperties({ statusBarStyle: Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK });
			
		var navigation = Titanium.UI.iOS.createNavigationWindow({
		   window: self
		});
		
		var backButton = Titanium.UI.createButton({
			title: '',
		    width: '12dp',
	   		height: '21dp',
			left: '8dp',
			top: 33,
			backgroundImage: 'back-arrow.png'
		});
		
		backButton.addEventListener('click', function(){
		    navigation.close({animated:true});
		});
		
		navigation.add(backButton);
		navigation.open();
		
	}
		
	var db = Ti.Database.open('CoTM');
	
	var sponsorRow = db.execute('SELECT * FROM sponsor WHERE pid=' + id + ' LIMIT 0,1');
	if (sponsorRow.isValidRow()) {
	  var sponsorId = sponsorRow.fieldByName('pid');
	  var categoriaId = sponsorRow.fieldByName('cid');
	  var sponsorName = sponsorRow.fieldByName('name');
	  var sponsorLat = sponsorRow.fieldByName('lat');
	  var sponsorLng = sponsorRow.fieldByName('lng');
	  var sponsorIndirizzo = sponsorRow.fieldByName('description');
	  var sponsorTel = sponsorRow.fieldByName('tel');
	  var sponsorUrl = sponsorRow.fieldByName('web');
	  var sponsorEmail = sponsorRow.fieldByName('email');
	}
	sponsorRow.close();
    db.close();
    
    if(!Ti.Platform.Android) {
    	self.title = '- ' + sponsorName.toUpperCase() + ' -';
    } else {
    	self.title = sponsorName.toUpperCase();
    }
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } }); 
    
    var topLayout = Ti.UI.createView({
    	width: Ti.UI.FILL,
    	height: Ti.UI.SIZE,
    	layout: 'vertical',
    	top: '10dp',
	  	left: '10dp',
	  	right: '10dp'
    });
    
    var scrollView = Ti.UI.createScrollView({
	  contentWidth: Ti.UI.FILL,
	  showVerticalScrollIndicator: false,
	  width: Ti.UI.FILL,
	  top: '10dp',
	  layout: 'horizontal'
	});
    
    var botLayout = Ti.UI.createView({
    	width: Ti.UI.FILL,
    	height: Ti.UI.SIZE,
    	layout: 'vertical',
    	bottom: '10dp',
	  	left: '10dp',
	  	right: '10dp'
    });
    
    var thumb = Ti.UI.createImageView({
	  	top: '0dp',
	  	image: '/db/photos/' + sponsorId + '.jpg',
	  	width: Ti.UI.FILL,
	  	height: '180dp' /*fix android fill width bug*/
	});
	topLayout.add(thumb);
	
	var indirizzo = Ti.UI.createLabel({
	  	text: sponsorIndirizzo.toUpperCase(),
	  	top: '0dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#000000'
	});
	scrollView.add(indirizzo); 
	
	var targhetta_tel = Ti.UI.createLabel({
	  	text: String(L('tel')) + ' ',
	  	top: '10dp',
	  	width: Ti.UI.SIZE,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#CC0000'
	});
	scrollView.add(targhetta_tel);
	
	var tel = Ti.UI.createLabel({
	  	text: sponsorTel,
	  	top: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#000000'
	});
	tel.addEventListener('click', function(e) {
		Titanium.Platform.openURL('tel:' + sponsorTel);
	});
	scrollView.add(tel);
	
	var targhetta_web = Ti.UI.createLabel({
	  	text: String(L('web')) + ' ',
	  	top: '10dp',
	  	width: Ti.UI.SIZE,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#CC0000'
	});
	scrollView.add(targhetta_web);
	
	var web = Ti.UI.createLabel({
	  	text: sponsorUrl,
	  	top: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#000000'
	});
	web.addEventListener('click', function(e) {
		Titanium.Platform.openURL('http://' + sponsorUrl);
	});
	scrollView.add(web);
	
	var targhetta_email = Ti.UI.createLabel({
	  	text: String(L('email')) + ' ',
	  	top: '10dp',
	  	width: Ti.UI.SIZE,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#CC0000'
	});
	scrollView.add(targhetta_email);
	
	var email = Ti.UI.createLabel({
	  	text: sponsorEmail,
	  	top: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#000000'
	});
	email.addEventListener('click', function(e) {
		Titanium.Platform.openURL('mailto:' + sponsorEmail);
	});
	scrollView.add(email); 
		
	topLayout.add(scrollView);
	
	var Map = require('ti.map');	
	
	var mapView = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {
			latitude: sponsorLat, longitude: sponsorLng,
            latitudeDelta: 0.003, longitudeDelta: 0.003
        },
    	regionFit: true,
    	userLocation: true,
    	showsPointsOfInterest: false, //android only
    	animate: true, 
    	userLocationButton: false,
    	enableZoomControls: false
	});
	
	mapView.applyProperties({
		width: Ti.UI.FILL,
		height: '85dp',
		bottom: '0dp'
	});
	
	if (Ti.Platform.displayCaps.platformHeight == 568) {
		mapView.applyProperties({ height: '175dp' });
	}
	
	if (Ti.Platform.displayCaps.platformHeight > 700) {
		mapView.applyProperties({ height: '150dp' });
	}
	
	if (Ti.Platform.displayCaps.platformHeight > 900) {
		mapView.applyProperties({ height: '180dp' });
	}
	
	var sponsorPOI = Map.createAnnotation({
		latitude: sponsorLat,
		longitude: sponsorLng,
		pincolor: Map.ANNOTATION_GREEN
	});
	
	switch(categoriaId) {
		case 1:
			sponsorPOI.image = '/db/pins/mangiare.png';
			if(!Ti.Platform.Android) {
				sponsorPOI.leftButton = '/db/pins/mangiare_icon.png';
			}
			if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
				sponsorPOI.image = '/db/pins/mangiare@2x.png';
			}
			break;
		case 2:
			sponsorPOI.image = '/db/pins/dormire.png';
			if(!Ti.Platform.Android) {
				sponsorPOI.leftButton = '/db/pins/dormire_icon.png';
			}
			if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
				sponsorPOI.image = '/db/pins/dormire@2x.png';
			}
			break;
		case 3:
			sponsorPOI.image = '/db/pins/servizi.png';
			if(!Ti.Platform.Android) {
				sponsorPOI.leftButton = '/db/pins/servizi_icon.png';
			}
			if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
				sponsorPOI.image = '/db/pins/servizi@2x.png';
			}
			break;
	}
	
	mapView.addAnnotation(sponsorPOI);
	botLayout.add(mapView);
	
	self.add(topLayout);
	self.add(botLayout);
	
	if(Ti.Platform.Android) {
		self.addEventListener("postlayout", function(e) {
			scrollView.applyProperties({ height: Ti.UI.FILL });
		});
	} else {
		scrollView.applyProperties({ height: Ti.UI.FILL });
	}
	
	if (Ti.Platform.Android) {
		self.addEventListener('open', function(e) {
			var actionBar = self.getActivity().actionBar;
			actionBar.setDisplayHomeAsUp(true);
			actionBar.onHomeIconItemSelected = function() {
			    self.getActivity().finish();
			};
		});
	}

	return self;
}

module.exports = SponsorDetailsView;