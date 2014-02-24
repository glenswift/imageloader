
define(['rsvp'], function(RSVP) {

    function ImageLoader() {

        var self = this,
            query = {},
            inProcess;

        var finish = {

            single: function(processName, img) {
                query[processName].resolve(img);
            },

            array: function(processName, img, pos) {
                query[processName].results[pos] = img;
                for (var i = 0, max = query[processName].summ; i < max; i += 1) {
                    if (typeof query[processName].results[i] == 'undefined') {
                        return;
                    }
                }
                query[processName].resolve(query[processName].results);
            },

            object: function(processName, img, name) {
                query[processName].results[name] = img;
                if (Object.keys(query[processName].results).length === query[processName].summ) {
                    query[processName].resolve(query[processName].results);
                }
            }

        };

        var load = {

            image: function(type, processName, uri, name) {
                var img = new Image();
                img.src = uri;
                if (img.complete) {
                    finish[type](processName, img, name);
                    return;
                }
                img.onload = function() {
                    finish[type](processName, img, name);
                }
                img.onerror = function(e) {
                    query[processName].reject('Can not load image ' + uri);
                }
            },

            single: function(img) {
                load.image('single', inProcess, img);
            },

            array: function(arr) {
                query[inProcess].results = [];
                query[inProcess].summ = arr.length;

                for (var i = 0, max = arr.length; i < max; i += 1) {
                    load.image('array', inProcess, arr[i], i);
                }

            },

            object: function(obj) {
                query[inProcess].results = {};
                query[inProcess].summ = Object.keys(obj).length;

                for (var img in obj) {
                    load.image('object', inProcess, obj[img], img);
                }

            }            

        };

        var name = function(name) {
            query[name] = {};
            inProcess = name;
            return self;
        }

        this.Promise = (window.Promise) ? Promise : RSVP.Promise;

        this.load = function(images) {
            
            var type;

            if (typeof images == 'string') {
                type = 'single';
            } else if (images.length && images.push) {
                type = 'array';
            } else {
                type = 'object';
            }

            name(new Date().getTime());

            query[inProcess].promise = new self.Promise(function(resolve, reject) {
                query[inProcess].resolve = resolve;
                query[inProcess].reject = reject;
                load[type](images);
            });

            return self;
        }

        this.ready = function(callback) {
            query[inProcess].promise.then(function(res) {
                callback(res);
            });
            return self;
        }

        this.error = function(callback) {
            query[inProcess].promise.catch(function(res) {
                callback(res);
            });
            return self;
        }

        return this;
    }

    return new ImageLoader();

});

