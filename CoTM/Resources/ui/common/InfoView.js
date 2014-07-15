//InfoView Component Constructor
function InfoView() {
	//create object instance, a parasitic subclass of Observable
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT],
		height: Ti.UI.FILL
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
	
	var arrow = [];
	var borderView = [];
	
	for (var i = 0; i < 5; i++) {
		arrow[i] = Ti.UI.createImageView({
			height: '22dp',
		  	right: '10dp',
		  	image: '/images/freccia.png'
		});
		
		borderView[i] = Titanium.UI.createView({
	  		width: Ti.UI.Fill,
	  		height: '1dp',
	  		bottom: '0dp',
	  		backgroundColor: '#CC0000'
		});
	}
	  
	var cotm = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '20%'
  	});
  	  
	var thumb_cotm = Ti.UI.createImageView({
	  	left: '10dp',
	  	image: '/images/cotm_2014.png',
	  	height: '80dp'
	});
  
	var label_cotm = Ti.UI.createLabel({
	  	text: String(L('cotm_2014')).toUpperCase(),
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000',
	  	left: '100dp'
	});
  
	cotm.add(thumb_cotm);
	cotm.add(label_cotm);
	cotm.add(arrow[0]);
	cotm.add(borderView[0]);
	
	var sedi = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '20%'
  	});
  	  
	var thumb_sedi = Ti.UI.createImageView({
	  	left: '10dp',
	  	image: '/images/sedi_2014.png',
	  	height: '80dp'
	});
  
	var label_sedi = Ti.UI.createLabel({
	  	text: String(L('sedi')).toUpperCase(),
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000',
	  	left: '100dp'
	});
  
	sedi.add(thumb_sedi);
	sedi.add(label_sedi);
	sedi.add(arrow[1]);
	sedi.add(borderView[1]);
	
	var shopping = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '20%'
  	});
  	  
	var thumb_shopping = Ti.UI.createImageView({
	  	left: '10dp',
	  	image: '/images/shopping_2014.png',
	  	height: '80dp'
	});
  
	var label_shopping = Ti.UI.createLabel({
	  	text: String(L('shopping')).toUpperCase(),
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000',
	  	left: '100dp'
	});
  
	shopping.add(thumb_shopping);
	shopping.add(label_shopping);
	shopping.add(arrow[2]);
	shopping.add(borderView[2]);
	
	var biglietti = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '20%'
  	});
  	  
	var thumb_biglietti = Ti.UI.createImageView({
	  	left: '10dp',
	  	image: '/images/biglietti_2014.png',
	  	height: '80dp'
	});
  
	var label_biglietti = Ti.UI.createLabel({
	  	text: String(L('biglietti')).toUpperCase(),
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000',
	  	left: '100dp'
	});
  
	biglietti.add(thumb_biglietti);
	biglietti.add(label_biglietti);
	biglietti.add(arrow[3]);
	biglietti.add(borderView[3]);
	
	var contatti = Ti.UI.createView({
	  	width: Ti.UI.Fill,
	  	height: '20%'
  	});
  	  
	var thumb_contatti = Ti.UI.createImageView({
	  	left: '10dp',
	  	image: '/images/contatti_2014.png',
	  	height: '80dp'
	});
  
	var label_contatti = Ti.UI.createLabel({
	  	text: String(L('contatti')).toUpperCase(),
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#000',
	  	left: '100dp'
	});
  
	contatti.add(thumb_contatti);
	contatti.add(label_contatti);
	contatti.add(arrow[4]);
	
	scrollView.add(cotm);
	scrollView.add(sedi);
	scrollView.add(shopping);
	scrollView.add(biglietti);
	scrollView.add(contatti);
	
	var infoDetailsView = require('/ui/common/InfoDetailsView');
	
	// Handle click events on any annotations on this map.
	cotm.addEventListener('click', function(e) {
 		new infoDetailsView(0).open();
 	});
 	
 	sedi.addEventListener('click', function(e) {
 		var sediListView = require('/ui/common/SediListView');
		new sediListView().open();
 	});
 	
 	shopping.addEventListener('click', function(e) {
 		var sponsorListView = require('/ui/common/SponsorListView');
		new sponsorListView(3).open();
 	});
 	
 	biglietti.addEventListener('click', function(e) {
 		new infoDetailsView(1).open();
 	});
 	
 	contatti.addEventListener('click', function(e) {
 		new infoDetailsView(2).open();
 	});
 	
    
    if(!Ti.Platform.Android) {
    	self.title = '- ' + String(L('info')) + ' -';
    } else {
    	self.title = String(L('info'));
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

module.exports = InfoView;