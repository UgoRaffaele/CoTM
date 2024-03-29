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
	
	self.add(giorni_container);
	
	Ti.API.info(self.getRect().height - ( giorni_container.getRect().height + 30 ));
	
	var scrollView = Ti.UI.createScrollView({
	  contentWidth: Ti.UI.FILL,
	  showVerticalScrollIndicator: true,
	  width: Ti.UI.FILL,
	  height: (self.getRect().height - ( giorni_container.getRect().height + 30 )),
	  layout: 'vertical',
	  bottom: '10dp',
	  left: '10dp',
	  right: '10dp'
	});
	
	if (Ti.Platform.Android) {
		self.addEventListener("postlayout", function(e) {	
			scrollView.applyProperties({
				height: (self.getRect().height - ( 2 * giorni_container.getRect().height ))
			});
		});
	}
	
	self.add(scrollView);
	
	fillScrollView(scrollView, 0);
	
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
			backgroundColor: '#E10613',
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