var ChannelApi = require('../../src/channel-api.js');

describe ('ChannelApi', function() {

    var handlers;

    beforeEach(function() {

        handlers = {
            onopen: function() {},
            onmessage: function() {},
            onerror: function() {},
            onclose: function() {}
        };

    });

    it ('should return an object with Channel and Socket classes', function() {
       expect(Object.keys(ChannelApi)).toEqual(['Channel', 'Socket']);
    });

    it ('goog.appengine.Channel should be defined', function() {
        expect(goog.appengine.Channel).toBeDefined();
    });

    it ('goog.appengine.Socket should be defined', function() {
        expect(goog.appengine.Socket).toBeDefined();
    });

    it ('should not allow a non string token when creating a channel', function() {

        expect(function() { new goog.appengine.Channel(); }).toThrow();
        expect(function() { new goog.appengine.Channel(1); }).toThrow();
        expect(function() { new goog.appengine.Channel('token'); }).not.toThrow();

    });

    it ('a channel should open a valid socket', function() {

        var channel = new goog.appengine.Channel('token');
        expect(channel.open()).toEqual(jasmine.any(goog.appengine.Socket));

    });

    it ('an opened socket should not have any handlers defined by default', function() {

        var channel = new goog.appengine.Channel('token');
        var socket = channel.open();

        expect(socket.onopen).not.toBeDefined();
        expect(socket.onmessage).not.toBeDefined();
        expect(socket.onerror).not.toBeDefined();
        expect(socket.onclose).not.toBeDefined();

    });

    it ('a channel should add valid handlers when opening a socket', function() {

        var channel = new goog.appengine.Channel('token');
        var socket = channel.open(handlers);

        expect(socket.onopen).toBe(handlers.onopen);
        expect(socket.onmessage).toBe(handlers.onmessage);
        expect(socket.onerror).toBe(handlers.onerror);
        expect(socket.onclose).toBe(handlers.onclose);

    });

    it ('sockets should have a close method', function() {

        var socket = new goog.appengine.Socket();
        expect(socket.close).toBeDefined();
        expect(function() { socket.close(); }).not.toThrow();

    });

    it ('sockets should be saved so they can be accessed from outside of creation scope', function() {

        var channel1 = new goog.appengine.Channel('token1');
        var socket1 = channel1.open();

        var channel2 = new goog.appengine.Channel('token2');
        var socket2 = channel2.open();

        expect(goog.appengine.Socket._get('token1')).toBe(socket1);
        expect(goog.appengine.Socket._get('token2')).toBe(socket2);

        // test socket created within a closure

        (function() {

            var channel = new goog.appengine.Channel('private');
            channel.open();

        })();

        var privateSocket = goog.appengine.Socket._get('private');
        expect(privateSocket).toEqual(jasmine.any(goog.appengine.Socket));


    });

});