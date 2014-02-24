imageloader.js
===========

Simple module for dynamic image loading from javascript.

Usage
----

    require(['imageloader'], function(imageloader) {
    
        imageloader
            .load({
                first: 'img/first.png',
                second: 'img/second.png'
            })
            .ready(function(res) {
        		// all images load successfully
                console.log(res);
    		})
    		.error(function(err) {
    			// something go wrong
    		});
            
    });

After images is successfully loaded imageloader will initialize `.ready()` callback with `res` as an object (with `first` and `second` as keys and image nodes as values).

You can also pass array as parameter:

        .load(['img/first.png', 'img/second.png'])
Or single URI as string:

        .load('img/first.png')
        
In this case `res` will be the array of image nodes in same order as arguments passed or single image node.

You can load image packs several times as well.

Browser support
----

Imageloader uses javascript promises. It has partim support in browsers, so imageloader uses [RSVP.js][1] to make it crossbrowser. Be sure to include it and everything will work fine ;)



[1]: https://github.com/tildeio/rsvp.js