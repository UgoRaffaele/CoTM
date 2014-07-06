//InfoDetailsView Component Constructor
function InfoDetailsView(id) {
	//create object instance, a parasitic subclass of Observable
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT],
		height: Ti.UI.FILL
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
		
	var title = [ 
		String(L('cotm_2014')).toUpperCase(),
		String(L('biglietti')).toUpperCase(),
		String(L('contatti')).toUpperCase()
	];
	
    if(!Ti.Platform.Android) {
    	self.title = '- ' + title[id] + ' -';
    } else {
    	self.title = title[id];
    }
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } }); 
	
	var MainView = Ti.UI.createScrollView({
		contentWidth: Ti.UI.FILL,
		showVerticalScrollIndicator: true,
		width: Ti.UI.FILL,
		layout: 'vertical',
		top: '10dp',
		right: '10dp',
		bottom: '10dp',
		left: '10dp'
	});
	
	switch(id) {
		case 0:	
			var testo_cotm = Ti.UI.createLabel({
				text: String(L('testo_cotm')),
				top: '0dp',
				width: Ti.UI.FILL,
				font: { fontSize: '14dp', fontFamily:'Helvetica Neue' },
				color: '#000000'
			});
			MainView.add(testo_cotm);
			break;
		case 1:	
			var testo_biglietti = Ti.UI.createLabel({
				text: String(L('testo_biglietti')),
				top: '0dp',
				width: Ti.UI.FILL,
				font: { fontSize: '14dp', fontFamily:'Helvetica Neue' },
				color: '#000000'
			});
			MainView.add(testo_biglietti);
			
			var Map = require('ti.map');	
	
			var mapView = Map.createView({
				mapType: Map.NORMAL_TYPE,
				region: {
					latitude: 43.27438, longitude: 11.986754,
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
				height: '180dp',
				bottom: '0dp',
				top: '10dp'
			});
		    
		    var sedePOI = Map.createAnnotation({
				latitude: 43.27438,
				longitude: 11.986754,
				pincolor: Map.ANNOTATION_RED,
				image: '/db/pins/sede.png'
			});
			
			if(Ti.Platform.Android && Ti.Platform.displayCaps.dpi > 160 ) {
				sedePOI.image = '/db/pins/sede@2x.png';
			}
			
			mapView.addAnnotation(sedePOI);
			
			MainView.add(mapView);
			
			break;
		case 2:	
			var testo_contatti = Ti.UI.createLabel({
				text: String(L('testo_contatti')),
				top: '0dp',
				width: Ti.UI.FILL,
				font: { fontSize: '14dp', fontFamily:'Helvetica Neue' },
				color: '#000000'
			});
			MainView.add(testo_contatti);
			break;
	}
	
	self.add(MainView);

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

module.exports = InfoDetailsView;