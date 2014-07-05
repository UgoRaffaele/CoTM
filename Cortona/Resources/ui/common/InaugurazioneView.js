//InaugurazioneView Component Constructor
function InaugurazioneView() {
	//create object instance, a parasitic subclass of Observable
	
	var day = 0;
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT],
		title: String(L('opening')),
		titleAttributes: ({ font: { fontSize: 16, fontFamily:'Helvetica Neue' } })
	});
	
	if(!Ti.Platform.Android) {
    	self.title = '- ' + String(L('opening')) + ' -';
    }
    
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
    
    var giorni = [ 
		String(L('d_17_07')),
		String(L('d_18_07')),
		String(L('d_19_07')),
		String(L('d_20_07'))
	];
		
	var giorni_container = Ti.UI.createView({
		top: '10dp',
		bottom: '10dp',
		width: '100%',
		height: Ti.UI.SIZE,
		layout: 'horizontal'
	});
	self.add(giorni_container);
	
	var giorno = [];
		
	for (var c = 0; c < giorni.length; c++) {
		giorno[c] = Ti.UI.createButton({
			color: '#000000',
			title: giorni[c],
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: { fontSize:16, fontFamily:'Helvetica Neue' },
			height: '30dp',
			width: '' + ((100/giorni.length) - 4) + '%',
			backgroundColor: '#FFFFFF',
			borderRadius: 6,
			day: c
		});
		
		if (c < 3)
			giorno[c].applyProperties({ left: '2%', right: '2%' });
		else 
			giorno[c].applyProperties({ left: '1%', right: '2%' });
			
		if (c == day)
			giorno[c].applyProperties({ color: '#FFFFFF', backgroundColor: '#E10613' });
			
		giorni_container.add(giorno[c]);
	}
	
	var scrollView = Ti.UI.createScrollView({
	  contentWidth: Ti.UI.FILL,
	  showVerticalScrollIndicator: true,
	  width: Ti.UI.FILL,
	  layout: 'vertical',
	  bottom: '0dp',
	  left: '10dp',
	  right: '10dp'
	});
	
	self.add(scrollView);
	
	self.addEventListener("postlayout", function(e) {
		scrollView.applyProperties({
			height: (self.getRect().height - ( giorni_container.getRect().height + ( 10 * (Ti.Platform.displayCaps.dpi / 160) ) ))
		});
	});
	
	for (var g = 0; g < giorno.length; g++) {
		giorno[g].addEventListener('click', function(e) {
			for (var l = 0; l < giorno.length; l++) {
				if (e.source.day == l)
					giorno[l].applyProperties({ color: '#FFFFFF', backgroundColor: '#E10613' });
				else 
					giorno[l].applyProperties({ color: '#000000', backgroundColor: '#FFFFFF' });
			}
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

module.exports = InaugurazioneView;