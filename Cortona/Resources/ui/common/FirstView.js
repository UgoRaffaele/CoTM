//FirstView Component Constructor
function FirstView() {
	
	var deviceHeight = Ti.Platform.displayCaps.platformHeight;
	var deviceWidth = Ti.Platform.displayCaps.platformWidth;
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		width: '100%',
		height: '100%',
		/*layout: 'vertical'*/
		orientationModes: [Ti.UI.PORTRAIT]
	});
	
	var logo = Ti.UI.createImageView({
		image: '/images/logo.png',
		top: '25dp',
		width: '160dp'
	});
	self.add(logo);
	
	var targhetta = Ti.UI.createButton({
		color: '#FFFFFF',
		title: String(L('opening')),
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: { fontSize:20, fontFamily:'Helvetica Neue' },
		height: '7%',
		width: '90%',
		top: '205dp',
		backgroundColor: '#e10613',
		borderRadius: 6
	});
	
	self.add(targhetta);
	
	var mapButton = Ti.UI.createButton({
   		top: '260dp',
   		left: '5%',
   		width: '80dp',
   		height: '100dp',
   		color: '#000',
   		backgroundImage: '/icons/icon-mappa.png'
	});

	self.add(mapButton);
	
	var mostreButton = Ti.UI.createButton({
   		top: '260dp',
   		width: '80dp',
   		height: '100dp',
   		color: '#000',
   		backgroundImage: '/icons/icon-mostre.png'
	});
	
	self.add(mostreButton);
	
	var itinerariButton = Ti.UI.createButton({
   		top: '260dp',
   		right: '5%',
   		width: '80dp',
   		height: '100dp',
   		color: '#000',
   		backgroundImage: '/icons/icon-itinerari.png'
	});
	
	self.add(itinerariButton);
	
	var dormireButton = Ti.UI.createButton({
   		top: '370dp',
   		left: '5%',
   		width: '80dp',
   		height: '100dp',
   		color: '#000',
   		backgroundImage: '/icons/icon-dormire.png'
	});
	
	self.add(dormireButton);
	
	var mangiareButton = Ti.UI.createButton({
   		top: '370dp',
   		width: '80dp',
   		height: '100dp',
   		color: '#000',
   		backgroundImage: '/icons/icon-mangiare.png'
	});
	
	self.add(mangiareButton);
	
	var infoButton = Ti.UI.createButton({
   		top: '370dp',
   		right: '5%',
   		width: '80dp',
   		height: '100dp',
   		color: '#000',
   		backgroundImage: '/icons/icon-info.png'
	});
	
	
	self.add(infoButton);
	
	if(Ti.Platform.Android) {
		
		mapButton.title = String(L('mappa'));
		mapButton.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
		mostreButton.title = String(L('mostre'));
		mostreButton.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
		itinerariButton.title = String(L('itinerari'));
		itinerariButton.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
		dormireButton.title = String(L('dormire'));
		dormireButton.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
		mangiareButton.title = String(L('mangiare'));
		mangiareButton.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
		infoButton.title = String(L('info'));
		infoButton.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
		
	} else {
		
		var mapLabel = Titanium.UI.createLabel({
		    text: String(L('mappa')),
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: { fontFamily:'Helvetica Neue' },
			bottom: '0dp'
		});
		
		mapButton.add(mapLabel);
		
		var mostreLabel = Titanium.UI.createLabel({
		    text: String(L('mostre')),
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: { fontFamily:'Helvetica Neue' },
			bottom: '0dp'
		});
		
		mostreButton.add(mostreLabel);
		
		var itinerariLabel = Titanium.UI.createLabel({
		    text: String(L('itinerari')),
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: { fontFamily:'Helvetica Neue' },
			bottom: 0
		});
		
		itinerariButton.add(itinerariLabel);
		
		var dormireLabel = Titanium.UI.createLabel({
		    text: String(L('dormire')),
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: { fontFamily:'Helvetica Neue' },
			bottom: 0
		});
		dormireButton.add(dormireLabel);
		
		var mangiareLabel = Titanium.UI.createLabel({
		    text: String(L('mangiare')),
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: { fontFamily:'Helvetica Neue' },
			bottom: 0
		});
		
		mangiareButton.add(mangiareLabel);
			var infoLabel = Titanium.UI.createLabel({
		    text: String(L('info')),
		    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: { fontFamily:'Helvetica Neue' },
			bottom: 0
		});
		infoButton.add(infoLabel);
		
	}

	if(deviceHeight > 480) {
		
		logo.width = '220dp';
		targhetta.top = null;
		targhetta.bottom = '255dp';
		mapButton.top = null;
		mapButton.bottom = '135dp';
		mostreButton.top = null;
		mostreButton.bottom = '135dp';
		itinerariButton.top = null;
		itinerariButton.bottom = '135dp';
		dormireButton.top = null;
		dormireButton.bottom = '20dp';
		mangiareButton.top = null;
		mangiareButton.bottom = '20dp';
		infoButton.top = null;
		infoButton.bottom = '20dp';
		
	}
	
	/*if(deviceWidth <= 480) {
		targhetta.setFont({ fontSize: 20 });
		mapButton.setFont({ fontSize: 14 });
		mostreButton.setFont({ fontSize: 14 });
		itinerariButton.setFont({ fontSize: 14 });
		dormireButton.setFont({ fontSize: 14 });
		mangiareButton.setFont({ fontSize: 14 });
		infoButton.setFont({ fontSize: 14 });
	}*/
	
	/*TESTING*/
	if(deviceWidth <= 720) {
		targhetta.setFont({ fontSize: '18dp' });
		mapButton.setFont({ fontSize: '13dp' });
		mostreButton.setFont({ fontSize: '13dp' });
		itinerariButton.setFont({ fontSize: '13dp' });
		dormireButton.setFont({ fontSize: '13dp' });
		mangiareButton.setFont({ fontSize: '13dp' });
		infoButton.setFont({ fontSize: '13dp' });
	}
	
	var path = 'ui/handheld/';
	if (Ti.Platform.Android) {
		path = path + 'android/';
	}
	
	//Add behaviors for UI
	mapButton.addEventListener('click', function(e) {
		/*var Window;
	    Window = require(path + 'MapWindow');
	  	new Window().open();*/
	  	var mappaView = require('/ui/common/MappaView');
		new mappaView().open();
	});
	
	mostreButton.addEventListener('click', function(e) {
		var mostreListView = require('/ui/common/MostreListView');
		new mostreListView(null).open();
	});
	
	dormireButton.addEventListener('click', function(e) {
		var sponsorListView = require('/ui/common/SponsorListView');
		new sponsorListView(2).open();
	});
	
	mangiareButton.addEventListener('click', function(e) {
		var sponsorListView = require('/ui/common/SponsorListView');
		new sponsorListView(1).open();
	});
	
	infoButton.addEventListener('click', function(e) {
		var infoView = require('/ui/common/InfoView');
		new infoView().open();
	});

	return self;
}

module.exports = FirstView;