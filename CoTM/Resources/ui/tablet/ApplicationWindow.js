//Application Window Component Constructor
function ApplicationWindow(splash) {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes: [Ti.UI.PORTRAIT]
	});

	//construct UI
	var firstView = new FirstView();
	self.add(firstView);

	var sponsorImage = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
	  	image: '/images/sponsor.jpg'
	});
	self.add(sponsorImage);
	
	sponsorImage.addEventListener("postlayout", function(e) {
		setTimeout(function(){
        	sponsorImage.applyProperties({ height: '0dp' });
    	}, 3000);
	});

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
