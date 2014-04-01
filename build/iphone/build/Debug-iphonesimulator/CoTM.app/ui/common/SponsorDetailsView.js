//SponsorDetailsView Component Constructor
function SponsorDetailsView(id) {
	//create object instance, a parasitic subclass of Observable
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	if (Titanium.Platform.name == 'iPhone OS') {
		
		var theTop = isiOS7() ? 28 : 0;
	
		var navigation = Titanium.UI.iOS.createNavigationWindow({
		   window: self
		});
		
		var backButton = Titanium.UI.createButton({
		    title: 'Indietro',
		    top:theTop,
		    left:10
		});
		
		backButton.addEventListener('click', function(){
		    navigation.close({animated:true});
		});
		
		navigation.add(backButton);
		
		navigation.open();
		
	}
	
	self.orientationModes = [Titanium.UI.PORTRAIT];
	
	var db = Ti.Database.open('CoTM');
	
	var sponsorRow = db.execute('SELECT *, sponsor_cat.cname FROM sponsor JOIN sponsor_cat ON sponsor_cat.cid = sponsor.cid WHERE sid=' + id + ' LIMIT 0,1');
	if (sponsorRow.isValidRow())
	{
	  var sponsorId = sponsorRow.fieldByName('sid');
	  var sponsorName = sponsorRow.fieldByName('sname');
	  var sponsorCatName = sponsorRow.fieldByName('cname');
	  var sponsorDescIt = sponsorRow.fieldByName('desc_it');
	  Ti.API.info(sponsorId + ' ' + sponsorName + ' ' + sponsorCatName + ' ' + sponsorDescIt); 
	}
	sponsorRow.close();
    db.close();
    
    self.title = sponsorName;
    
    var maxWidth = (Ti.Platform.displayCaps.platformWidth);
    
    var headerImage = Ti.UI.createImageView({
	  image:'/db/photos/' + sponsorId + '.jpg',
	  top: 10,
	  left: 10,
	  right: 10,
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

module.exports = SponsorDetailsView;