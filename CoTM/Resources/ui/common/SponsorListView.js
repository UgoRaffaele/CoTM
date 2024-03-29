//MostreListView Component Constructor
function SponsorListView(idCategoria) {
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
	
	var query = 'SELECT * FROM sponsor';
	if(idCategoria != null) {
		query = query + ' WHERE cid=' + idCategoria;
	}
	query = query + ' ORDER BY name';
	
	var sponsorRow = db.execute(query);
	while (sponsorRow.isValidRow()) {
	  var sponsorId = sponsorRow.fieldByName('pid');
	  var sponsorName = sponsorRow.fieldByName('name');
	  var sponsorIndirizzo = sponsorRow.fieldByName('description');
	  
	  var sponsor = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: Ti.UI.SIZE,
	  	layout: 'vertical',
	  	top: '10dp',
	  	bottom: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	borderColor: '#CCC',
	  	borderWidth: '1dp',
	  	sid: sponsorId
	  });
	  	  
	  var thumb = Ti.UI.createImageView({
	  	top: '0dp',
	  	left: '0dp',
	  	right: '0dp',
	  	image: '/db/photos/' + sponsorId + '.jpg',
	  	width: Ti.UI.FILL,
	  	height: '180dp' /*fix android fill width bug*/
	  });
	  
	  var titolo = Ti.UI.createLabel({
	  	text: sponsorName.toUpperCase(),
	  	top: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000'
	  });
	  
	  var indirizzo = Ti.UI.createLabel({
	  	text: sponsorIndirizzo,
	  	top: '0dp',
	  	left: '10dp',
	  	right: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue' },
	  	color: '#CC0000'
	  });
	  
	  var paddingView = Titanium.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '10dp'
	  });
	  
	  sponsor.add(thumb);
	  sponsor.add(titolo);
	  sponsor.add(indirizzo);
	  sponsor.add(paddingView);
	  scrollView.add(sponsor);
	  
	  // Handle click events on any annotations on this map.
	  sponsor.addEventListener('click', function(e) {
	  	var sponsorDetails = require('/ui/common/SponsorDetailsView');
		new sponsorDetails(this.sid).open();
	  });
	  	  
	  sponsorRow.next();
	}
	sponsorRow.close();
    db.close();
    
    switch(idCategoria) {
		case 1:
			if(!Ti.Platform.Android) {
		    	self.title = '- ' + String(L('mangiare')) + ' -';
		    } else {
		    	self.title = String(L('mangiare'));
		    }
			break;
		case 2:
			if(!Ti.Platform.Android) {
		    	self.title = '- ' + String(L('dormire')) + ' -';
		    } else {
		    	self.title = String(L('dormire'));
		    }
			break;
		case 3:
			if(!Ti.Platform.Android) {
		    	self.title = '- ' + String(L('shopping')) + ' -';
		    } else {
		    	self.title = String(L('shopping'));
		    }
			break;
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

module.exports = SponsorListView;