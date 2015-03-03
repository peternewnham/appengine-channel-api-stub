/**
 * appengine-channel-api-stub - Stub for javascript client to the Google App Engine Channel API
 * @version v1.0.0
 * @link https://github.com/wrakky/appengine-channel-api-stub
 * @license MIT
 */

(function() {

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

    if (!window.goog) {
        window.goog = {};
    }
    if (!window.goog.appengine) {
        window.goog.appengine = {};
    }
    window.goog.appengine.Channel = Channel;
    window.goog.appengine.Socket = Socket;

})();