//PROVA LAYOUT
//MostreDetailsView Component Constructor
function MostreDetailsView(id) {
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
		
	var db = Ti.Database.open('CoTM');
	
	var mostraRow = db.execute('SELECT *, sedi.name, sedi.orari FROM mostre JOIN sedi ON sedi.sid = mostre.sede WHERE mid=' + id + ' LIMIT 0,1');
	if (mostraRow.isValidRow()) {
	  var mostraId = mostraRow.fieldByName('mid');
	  var mostraName = mostraRow.fieldByName('titolo');
	  var mostraAutore = mostraRow.fieldByName('autore');
	  var mostraThumb = mostraRow.fieldByName('thumb');
	  var mostraDescrizione = mostraRow.fieldByName('description');
	  var sedeId = mostraRow.fieldByName('sede');
	  var mostraSede = mostraRow.fieldByName('name');
	  var mostraOrari = mostraRow.fieldByName('orari');
	}
	mostraRow.close();
    db.close();
    
    if(!Ti.Platform.Android) {
    	self.title = '- ' + mostraAutore.toUpperCase() + ' -';
    } else {
    	self.title = mostraAutore.toUpperCase();
    }
    self.titleAttributes = ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } }); 
    
    var topLayout = Ti.UI.createView({
    	width: Ti.UI.FILL,
    	height: Ti.UI.SIZE,
    	layout: 'vertical',
    	top: '10dp',
	  	left: '10dp',
	  	right: '10dp'
    });
    
    var scrollView = Ti.UI.createScrollView({
	  contentWidth: Ti.UI.FILL,
	  showVerticalScrollIndicator: true,
	  width: Ti.UI.FILL,
	  top: '10dp',
	});
    
    var botLayout = Ti.UI.createView({
    	width: Ti.UI.FILL,
    	height: Ti.UI.SIZE,
    	layout: 'vertical',
    	bottom: '10dp',
	  	left: '10dp',
	  	right: '10dp'
    });
    
    var thumb = Ti.UI.createImageView({
	  	top: '0dp',
	  	image: '/db/mostre/' + mostraThumb,
	  	width: Ti.UI.FILL,
	  	height: '180dp' /*fix android fill width bug*/
	});
	topLayout.add(thumb);
	
	var titolo = Ti.UI.createLabel({
	  	text: mostraName.toUpperCase(),
	  	top: '10dp',
	  	width: Ti.UI.FILL,
	  	font: { fontSize: '16dp', fontFamily:'Helvetica Neue', fontWeight: 'bold' },
	  	color: '#CC0000'
	});
	topLayout.add(titolo); 
	
	var longTextDescrizione = Ti.UI.createLabel({
    	text: mostraDescrizione,
		color: '#000',
		width: Ti.UI.FILL,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' },
		top: '0dp'
	});
	scrollView.add(longTextDescrizione);
	
	topLayout.add(scrollView);
	
	var paddingView = Ti.UI.createView({
	  width: Ti.UI.FILL,
	  height: '20dp',
	  top: '0dp'
	});
	botLayout.add(paddingView);
	
	var dividerView = Ti.UI.createView({
	  width: Ti.UI.FILL,
	  height: '1dp',
	  top: '10dp',
	  backgroundColor: '#CC0000'
	});
	botLayout.add(dividerView);
	
	var orari = Ti.UI.createLabel({
    	text: mostraOrari,
		color: '#000',
		top: '10dp',
		width: Ti.UI.FILL,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' }
	});
	botLayout.add(orari);    

	var sede = Ti.UI.createButton({
		color: '#FFFFFF',
		title: '- ' + mostraSede.toUpperCase() + ' -',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: { fontSize: 16, fontFamily:'Helvetica Neue' },
		top: '10dp',
		width: Ti.UI.FILL,
		backgroundColor: '#e10613',
		borderRadius: 6
	});
	botLayout.add(sede); 
		
	sede.addEventListener('click', function(evt) {
		var sedeDetailsView = require('/ui/common/SedeDetailsView');
		new sedeDetailsView(sedeId).open();
	});
	
	self.add(topLayout);
	self.add(botLayout);
	
	if(Ti.Platform.Android) {
		self.addEventListener("postlayout", function(e) {
			topLayout.applyProperties({ height: (self.getRect().height - botLayout.getRect().height) });
		});
	} else {
		topLayout.applyProperties({ height: (self.getRect().height - botLayout.getRect().height) });
	}
	scrollView.applyProperties({ height: Ti.UI.FILL });

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

module.exports = MostreDetailsView;