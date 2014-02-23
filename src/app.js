
require(['imageloader'], function(imageloader) {
	
	imageloader
		.load({
			'first': 'http://www.w3schools.com/images/compatible_chrome.gif',
			'second': 'http://www.w3schools.com/images/compatible_firefox.gif'
		})
		.ready(function(res) {
			console.log(res);
		})
		.error(function(err) {
			console.error(err)
		});

	imageloader
		.load(['http://www.w3schools.com/images/compatible_opera.gif', 'http://www.w3schools.com/images/compatible_safari.gif'])
		.ready(function(res) {
			console.log(res);
		})
		.error(function(err) {
			console.error(err)
		});

	imageloader
		.load('http://www.w3schools.com/images/compatible_ie.gif')
		.ready(function(res) {
			console.log(res);
		})
		.error(function(err) {
			console.error(err)
		});

})
