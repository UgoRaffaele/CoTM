//MostreListView Component Constructor
function MostreListView(idSede) {
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
	
	var query = 'SELECT mid, titolo, autore, thumb FROM mostre';
	if(idSede != null) {
		query = query + ' WHERE sede=' + idSede;
	}
	query = query + ' ORDER BY titolo';
	
	var mostreRow = db.execute(query);
	while (mostreRow.isValidRow()) {
	  var mostraId = mostreRow.fieldByName('mid');
	  var mostraName = mostreRow.fieldByName('titolo');
	  var mostraAutore = mostreRow.fieldByName('autore');
	  var mostraThumb = mostreRow.fieldByName('thumb');
	  
	  var mostra = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '80dp'
	  });
	  	  
	  var thumb = Ti.UI.createImageView({
	  	left: '0dp',
	  	width: '80dp',
	  	height: '80dp',
	  	image: '/db/photos/' + mostraId + '.jpg'
	  });
	  
	  var titolo = Ti.UI.createLabel({
	  	text: mostraName.toUpperCase() ,
	  	left: '90dp',
	  	top: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000'
	  });
	  
	  var autore = Ti.UI.createLabel({
	  	text: mostraAutore,
	  	left: '90dp',
	  	bottom: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#000'
	  });
	  
	 var freccia = Titanium.UI.createButton({
		title: '',
	    width: '12dp',
   		height: '22dp',
		right: '10dp',
		backgroundImage: '/images/freccia.png'
	  });
	  
	  var borderBottom = Ti.UI.createView({
	    backgroundColor: '#cc0000',
	    width: Ti.UI.Fill,
	    height: '1dp',
	    top: 0
	  });
	  
	  mostra.add(thumb);
	  mostra.add(titolo);
	  mostra.add(autore);
	  mostra.add(freccia);
	  scrollView.add(mostra);
	  scrollView.add(borderBottom);
	  	  
	  mostreRow.next();
	}
	mostreRow.close();
    db.close();
    
    if(!Ti.Platform.Android) {
    	self.title = '- ' + String(L('mostre')) + ' -';
    } else {
    	self.title = String(L('mostre'));
    }
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } }); 
		
	self.add(scrollView);	
		
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

module.exports = MostreListView;