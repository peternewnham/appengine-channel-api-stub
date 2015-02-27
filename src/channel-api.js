(function() {

    /**
     * Lookup table for all created sockets. Keys are tokens,
     * @type {{}}
     */
    var sockets = {};

    /**
     * Channel class
     * @param {String} token    The token for the channel
     * @constructor
     */
    var Channel = function(token) {

        if (typeof token !== 'string') {
            throw 'Token must be a string';
        }

        this.token_ = token;
    };

    /**
     * Opens a channel and returns a socket
     * @param {Object} [optional_handler]   Callback handlers for the created socket
     * @returns {Socket}
     */
    Channel.prototype.open = function(optional_handler) {
        return new Socket(this.token_, optional_handler || {});
    };

    /**
     * Channel socket class
     * @param {String} token        Token for the channel this socket belongs to
     * @param {Object} [handler]    Object containing handlers for the socket
     * @constructor
     */
    var Socket = function(token, handler) {

        handler = handler || {};

        sockets[token] = this;

        this.token_ = token;

        this.onopen = handler.onopen;
        this.onmessage = handler.onmessage;
        this.onerror = handler.onerror;
        this.onclose = handler.onclose;

    };

    /**
     * Closes the socket
     */
    Socket.prototype.close = function() {

    };


    /**
     * Fetch an instantiated socket for use
     * Use this to get a socket and call it's methods from outside of it's scope
     * @param token
     * @returns {Socket}
     */
    Socket._get = function(token) {
        return sockets[token];
    };

    if (!window.goog) {
        window.goog = {};
    }
    if (!window.goog.appengine) {
        window.goog.appengine = {};
    }
    window.goog.appengine.Channel = Channel;
    window.goog.appengine.Socket = Socket;

})();