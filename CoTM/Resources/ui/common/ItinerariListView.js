//ItinerariListView Component Constructor
function ItinerariListView() {
	//create object instance, a parasitic subclass of Observable
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT]
	});
	
	var scrollView = Ti.UI.createScrollView({
	  contentWidth: Ti.UI.FILL,
	  showVerticalScrollIndicator: true,
	  width: Ti.UI.FILL,
	  layout: 'vertical'
	});
	
	var Map = require('ti.map');
	
	if (Titanium.Platform.name == 'iPhone OS') {
		
		self.applyProperties({ statusBarStyle: Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK });
			
		var navigation = Titanium.UI.iOS.createNavigationWindow({
		   window: self,
		   backgroundColor: '#000000'
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
	
	var query = 'SELECT * FROM itinerari_cat ORDER BY iid';
	
	var itinerariRow = db.execute(query);
	while (itinerariRow.isValidRow()) {
	  var itinerarioId = itinerariRow.fieldByName('iid');
	  var itinerarioName = itinerariRow.fieldByName('itinerario');
	  var itinerarioDurata = itinerariRow.fieldByName('durata');
	  	  
	  var itinerario = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: Ti.UI.SIZE,
	  	layout: 'vertical',
	  	top: '10dp',
	  	bottom: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	borderColor: '#CCC',
	  	borderWidth: '1dp',
	  	iid: itinerarioId
	  });
	  
	  var mapView = Ti.UI.createImageView({
		width: Ti.UI.Fill,
	  	height: '180dp',
	  	top: '0dp',
	  	left: '0dp',
	  	right: '0dp',
	  	bottom: '10dp',
	  	image: '/db/itinerari/' + itinerarioId + '.png'
	  });
	 
	  itinerario.add(mapView);
	  
	  var hor = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '20dp',
	  	layout: 'horizontal',
	  	top: '0dp',
	  	left: '0dp',
	  	right: '0dp',
	  	bottom: '10dp'
	  });
	  
	  var titolo = Ti.UI.createLabel({
	  	text: itinerarioName.toUpperCase(),
	  	top: '0dp',
	  	left: '10dp',
	  	width: '80%',
	  	height: Ti.UI.SIZE,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#CC0000'
	  });
	  
	  var durata = Ti.UI.createLabel({
	  	text: itinerarioDurata,
	  	top: '00dp',
	  	right: '10dp',
	  	width: Ti.UI.FILL,
	  	height: Ti.UI.SIZE,
	  	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000'
	  });
	  
	  hor.add(titolo);
	  hor.add(durata);
	  itinerario.add(hor);
	  scrollView.add(itinerario);
	  
	  itinerario.addEventListener('click', function(e) {
 	  	  var itinerarioDetails = require('/ui/common/ItinerarioDetailsView');
		  new itinerarioDetails(this.iid).open();
 	  });
	  	  
	  itinerariRow.next();
	}
	itinerariRow.close();
    db.close();
    
    if(!Ti.Platform.Android) {
    	self.title = '- ' + String(L('itinerari')) + ' -';
    } else {
    	self.title = String(L('itinerari'));
    }
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } }); 
		
	self.add(scrollView);
	
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

module.exports = ItinerariListView;