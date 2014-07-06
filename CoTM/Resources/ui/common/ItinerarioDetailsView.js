//ItinerarioDetailsView Component Constructor
function ItinerarioDetailsView(id) {
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
	
	var query = 'SELECT sedi.sid, name, indirizzo, orari FROM sedi INNER JOIN itinerari ON sedi.sid = itinerari.sid WHERE itinerari.iid =' + id + ' ORDER BY itinerari.ord';
	
	var sediRow = db.execute(query);
	while (sediRow.isValidRow()) {
	  var sedeId = sediRow.fieldByName('sid');
	  var sedeName = sediRow.fieldByName('name');
	  var sedeIndirizzo = sediRow.fieldByName('indirizzo');
	  var sedeOrari = sediRow.fieldByName('orari');
	  
	  var sede = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: Ti.UI.SIZE,
	  	layout: 'horizontal',
	  	top: '10dp',
	  	bottom: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	borderColor: '#CCC',
	  	borderWidth: '1dp',
	  	sid: sedeId
	  });
	  
	  var titolo = Ti.UI.createLabel({
	  	text: sedeName.toUpperCase() ,
	  	top: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#CC0000'
	  });
	  
	  var indirizzo = Ti.UI.createLabel({
	  	text: sedeIndirizzo,
	  	top: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000'
	  });
	  
	  var orari = Ti.UI.createLabel({
	  	text: sedeOrari,
	  	top: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#000'
	  });
	  
	  var paddingView = Titanium.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '10dp'
	  });
	  
	  sede.add(titolo);
	  sede.add(indirizzo);
	  sede.add(orari);
	  sede.add(paddingView);
	  scrollView.add(sede);
	  
	  sede.addEventListener('click', function(e) {
 	  	  var sedeDetails = require('/ui/common/SedeDetailsView');
		  new sedeDetails(this.sid).open();
 	  });
	  	  
	  sediRow.next();
	}
	sediRow.close();
	
	var query = 'SELECT itinerario FROM itinerari_cat WHERE iid = ' + id;
	
	var itinerariRow = db.execute(query);
	while (itinerariRow.isValidRow()) {
		var itinerarioName = itinerariRow.fieldByName('itinerario');
		if(!Ti.Platform.Android) {
	    	self.title = '- ' + itinerarioName.toUpperCase() + ' -';
	    } else {
	    	self.title = itinerarioName.toUpperCase();
	    }
		itinerariRow.next();
	}
    itinerariRow.close();
    db.close();
    
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } }); 
		
	self.add(scrollView);	
	
	db.close();
	
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

module.exports = ItinerarioDetailsView;