//SedeDetailsView Component Constructor
function SedeDetailsView(id) {
	//create object instance, a parasitic subclass of Observable
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT],
		statusBarStyle: Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK
	});
	
	if (Titanium.Platform.name == 'iPhone OS') {
		
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
	  Ti.API.info(sedeId + ' ' + sedeName + ' ' + sedeLat + ' ' + sedeLng + ' ' + sedeIndirizzo); 
	}
	sedeRow.close();
    db.close();
    
    self.title = '- ' + sedeName.toUpperCase() + ' -';
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } });
    
    var maxWidth = (Ti.Platform.displayCaps.platformWidth);
    
    var headerImage = Ti.UI.createImageView({
	  image:'/db/photos/' + sedeId + '.jpg',
	  top: '10dp',
	  left: '10dp',
	  right: '10dp',
      width: Titanium.UI.FILL
	});
	
	self.add(headerImage);
		
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