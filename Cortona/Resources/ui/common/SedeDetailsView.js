//SedeDetailsView Component Constructor
function SedeDetailsView(id) {
	//create object instance, a parasitic subclass of Observable
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT]
	});
	
	if (Titanium.Platform.name == 'iPhone OS') {
		
		self.applyProperties({ statusBarStyle: Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK });
		
		var theTop = isiOS7() ? 33 : 0;
	
		var navigation = Titanium.UI.iOS.createNavigationWindow({
		   window: self
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
	
	var sedeRow = db.execute('SELECT * FROM sedi WHERE sid=' + id + ' LIMIT 0,1');
	if (sedeRow.isValidRow()) {
	  var sedeId = sedeRow.fieldByName('sid');
	  var sedeName = sedeRow.fieldByName('name');
	  var sedeLat = sedeRow.fieldByName('lat');
	  var sedeLng = sedeRow.fieldByName('lng');
	  var sedeIndirizzo = sedeRow.fieldByName('indirizzo');
	  var sedeOrari = sedeRow.fieldByName('orari');
	  var sedeTicket = sedeRow.fieldByName('ticket');
	}
	sedeRow.close();
    db.close();
    
    if(!Ti.Platform.Android) {
    	self.title = '- ' + sedeName.toUpperCase() + ' -';
    } else {
    	self.title = sedeName.toUpperCase();
    }
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } }); 
    
    var hor = Ti.UI.createView({
    	layout: 'horizontal',
    	height: Ti.UI.SIZE,
    	top: '0dp'
    });
    
    var textOrari = Ti.UI.createLabel({
    	text: String(L('orari')),
		color: '#CC0000',
		top: '10dp',
		left: '10dp',
		right: '10dp',
		width: Ti.UI.FILL,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' }
	});
	hor.add(textOrari); 
	
	var longTextOrari = Ti.UI.createLabel({
    	text: sedeOrari,
		color: '#000',
		top: '10dp',
		left: '10dp',
		right: '10dp',
		width: Ti.UI.FILL,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' }
	});
	hor.add(longTextOrari);    
	
	var textIndirizzo = Ti.UI.createLabel({
    	text: String(L('indirizzo')),
		color: '#CC0000',
		top: '10dp',
		left: '10dp',
		right: '10dp',
		width: Ti.UI.FILL,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' }
	});
	hor.add(textIndirizzo);
	
	var longTextIndirizzo = Ti.UI.createLabel({
    	text: sedeIndirizzo,
		color: '#000',
		top: '10dp',
		left: '10dp',
		right: '10dp',
		width: Ti.UI.FILL,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' }
	});
	hor.add(longTextIndirizzo);    
	
	var textTicket = Ti.UI.createLabel({
    	text: String(L('ticket')),
		color: '#CC0000',
		top: '10dp',
		left: '10dp',
		font: { fontSize: 16, fontFamily:'Helvetica Neue' },
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	hor.add(textTicket);  
	
	var longTextTicket = Ti.UI.createLabel({
    	text: sedeTicket,
		color: '#000',
		top: '10dp',
		left: '10dp',
		right: '10dp',
		width: Ti.UI.FILL,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' },
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	hor.add(longTextTicket);    
    
    var mostre = Ti.UI.createButton({
		color: '#FFFFFF',
		title: '- ' + String(L('vedi_mostre')) + ' -',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' },
		top: '20dp',
		left: '10dp',
		right: '10dp',
		width: Ti.UI.FILL,
		backgroundColor: '#e10613',
		borderRadius: 6
	});
	
	hor.add(mostre);
	
	mostre.addEventListener('click', function(evt) {
		var mostreListView = require('/ui/common/MostreListView');
		new mostreListView(sedeId).open();
	});
        
    var Map = require('ti.map');	
	
	var mapView = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {
			latitude: sedeLat, longitude: sedeLng,
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
		height: '150dp',
		left: '10dp',
		right: '10dp',
		bottom: '10dp'
	});
    
    var sedePOI = Map.createAnnotation({
		latitude: sedeLat,
		longitude: sedeLng,
		pincolor: Map.ANNOTATION_RED,
		image: '/db/pins/sede.png'
	});
	
	if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
		sedePOI.image = '/db/pins/sede@2x.png';
	}
	
	mapView.addAnnotation(sedePOI);
	
	self.add(hor);
	self.add(mapView);
	
	var ret = (20 * Ti.Platform.displayCaps.platformHeight) / Ti.Platform.displayCaps.dpi;
	if (Ti.Platform.Android) {
		self.addEventListener("postlayout", function(e) {
			mapView.applyProperties({
				height: (self.getRect().height - ( hor.getRect().height + ret ))
			});
		});
	} else {
		mapView.applyProperties({
			height: (self.getRect().height - ( hor.getRect().height + ret ))
		});
	}
	
	return self;
}

// Function to test if device is iOS 7 (or later)
function isiOS7()
{
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

module.exports = SedeDetailsView;