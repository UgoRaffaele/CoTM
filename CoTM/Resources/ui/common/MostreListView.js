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
	
	var query = 'SELECT mid, titolo, autore, thumb FROM mostre';
	if(idSede != null) {
		query = query + ' WHERE sede=' + idSede;
	}
	query = query + ' GROUP BY thumb ORDER BY titolo';
	
	var mostreRow = db.execute(query);
	while (mostreRow.isValidRow()) {
	  var mostraId = mostreRow.fieldByName('mid');
	  var mostraName = mostreRow.fieldByName('titolo');
	  var mostraAutore = mostreRow.fieldByName('autore');
	  var mostraThumb = mostreRow.fieldByName('thumb');
	  
	  var mostra = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: Ti.UI.SIZE,
	  	layout: 'vertical',
	  	top: '10dp',
	  	bottom: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	borderColor: '#CCC',
	  	borderWidth: '1dp',
	  	mid: mostraId
	  });
	  	  
	  var thumb = Ti.UI.createImageView({
	  	top: '0dp',
	  	left: '0dp',
	  	right: '0dp',
	  	image: '/db/mostre/' + mostraThumb,
	  	width: Ti.UI.FILL,
	  	height: '180dp' /*fix android fill width bug*/
	  });
	  
	  var titolo = Ti.UI.createLabel({
	  	text: mostraName.toUpperCase() ,
	  	top: '10dp',
	  	left: '10dp',
	  	right: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000'
	  });
	  
	  var autore = Ti.UI.createLabel({
	  	text: mostraAutore,
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
	  
	  mostra.add(thumb);
	  mostra.add(titolo);
	  mostra.add(autore);
	  mostra.add(paddingView);
	  scrollView.add(mostra);
	  
	  // Handle click events on any annotations on this map.
	  mostra.addEventListener('click', function(e) {
	  	var mostraDetails = require('/ui/common/MostraDetailsView');
		new mostraDetails(this.mid).open();
	  });
	  	  
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

module.exports = MostreListView;