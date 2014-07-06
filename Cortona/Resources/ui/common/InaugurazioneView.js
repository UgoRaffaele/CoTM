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
			width: '' + ((100/giorni.length) - 1) + '%',
			backgroundColor: '#FFFFFF',
			borderRadius: 6,
			day: c
		});
		
		if (c < 1)
			giorno[c].applyProperties({ left: '2%' });
		
		if (c > 2)
			giorno[c].applyProperties({ right: '2%' });
			
		if (c == day)
			giorno[c].applyProperties({ color: '#FFFFFF', backgroundColor: '#E10613' });
			
		giorni_container.add(giorno[c]);
	}
	
	var scrollView = Ti.UI.createScrollView({
	  contentWidth: Ti.UI.FILL,
	  showVerticalScrollIndicator: true,
	  width: Ti.UI.FILL,
	  layout: 'vertical',
	  bottom: '10dp',
	  left: '10dp',
	  right: '10dp'
	});
	fillScrollView(scrollView, 0);
	
	self.add(scrollView);
	
	var ret = (15 * Ti.Platform.displayCaps.platformHeight) / Ti.Platform.displayCaps.dpi;
	if (Ti.Platform.Android) {
		self.addEventListener("postlayout", function(e) {	
			scrollView.applyProperties({
				height: (self.getRect().height - ( giorni_container.getRect().height + ret ))
			});
		});
	} else {
		scrollView.applyProperties({
			height: (self.getRect().height - ( giorni_container.getRect().height + ret ))
		});
	}
	
	for (var g = 0; g < giorno.length; g++) {
		giorno[g].addEventListener('click', function(e) {
			for (var l = 0; l < giorno.length; l++) {
				if (e.source.day == l) {
					giorno[l].applyProperties({ color: '#FFFFFF', backgroundColor: '#E10613' });
					fillScrollView(scrollView, l);
				} else {
					giorno[l].applyProperties({ color: '#000000', backgroundColor: '#FFFFFF' });
				}
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

function fillScrollView(view, num)
{
	if (num == null)
		num = 0;
		
	var db = Ti.Database.open('CoTM');
	var query = 'SELECT * FROM inaugurazione WHERE day=' + num + ' ORDER BY id';
	var inaugurazioneRow = db.execute(query);	
		
	view.removeAllChildren();
	
	var list = Titanium.UI.createView({
	    width: Ti.UI.FILL,
	    height: Ti.UI.FILL,
	    layout: 'vertical'
	});
	
	var i = 0;
	var rows = [];
	var orario_container = [];
	
	while (inaugurazioneRow.isValidRow()) {
		var inaugurazioneTime = inaugurazioneRow.fieldByName('time');
		var inaugurazionePlace = inaugurazioneRow.fieldByName('place');
		var inaugurazioneWhat = inaugurazioneRow.fieldByName('what');
		rows[i] = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'horizontal',
			top: '0dp'
		});
		var dove = Ti.UI.createLabel({
			width: '60%',
			left: '0dp',
			color: '#CC0000',
			font: { fontSize: '14dp', fontFamily:'Helvetica Neue' },
			text: inaugurazionePlace
		});
		orario_container[i] = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			right: '0dp'
		});
		var orario = Ti.UI.createLabel({
			width: Ti.UI.SIZE,
			right: '0dp',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			backgroundColor: '#CC0000',
			color: '#FFFFFF',
			font: { fontSize: '14dp', fontFamily:'Helvetica Neue' },
			text: inaugurazioneTime
		});
		var attivita = Ti.UI.createLabel({
			width: Ti.UI.FILL,
			left: '0dp',
			color: '#000000',
			font: { fontSize: '14dp', fontFamily:'Helvetica Neue' },
			text: inaugurazioneWhat
		});
		var space = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: '10dp'
		});
		rows[i].add(dove);
		orario_container[i].add(orario);
		rows[i].add(orario_container[i]);
		rows[i].add(attivita);
		rows[i].add(space);
		list.add(rows[i]);
		i++;
		inaugurazioneRow.next();
	}
	inaugurazioneRow.close();
    db.close();
    
	view.add(list);
}

module.exports = InaugurazioneView;