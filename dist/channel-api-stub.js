/**
 * appengine-channel-api-stub - Stub for javascript client to the Google App Engine Channel API
 * @version v1.0.1
 * @link https://github.com/wrakky/appengine-channel-api-stub
 * @license MIT
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.channelapi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ChannelApi = (function() {

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

    return {
        Channel: Channel,
        Socket: Socket
    };

})();

module.exports = ChannelApi;
},{}]},{},[1])(1)
});