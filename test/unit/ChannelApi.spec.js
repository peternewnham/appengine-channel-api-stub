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

});