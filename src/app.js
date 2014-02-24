
require(['imageloader'], function(imageloader) {
	
	var div = document.getElementById('result');

	imageloader
		.load({
			first: 'img/./chrome.gif',
			second: 'img/./firefox.gif'
		})
		.ready(function(res) {
			console.log(res);
			for (var i in res) {
				div.appendChild(res[i]);
			}
		})
		.error(function(err) {
			console.error(err);
		});


	imageloader
		.load(['img/./opera.gif', 'img/./safari.gif'])
		.ready(function(res) {
			console.log(res);
			for (var i = 0; i < res.length; i += 1) {
				div.appendChild(res[i]);
			}
		})
		.error(function(err) {
			console.error(err);
		});
		

	imageloader
		.load('img/./ie.gif')
		.ready(function(res) {
			console.log(res);
			div.appendChild(res);
		})
		.error(function(err) {
			console.error(err);
		});

})
