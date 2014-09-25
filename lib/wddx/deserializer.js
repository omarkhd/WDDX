"use strict";

var merge = require('deepmerge'),
    xamel = require('xamel'),
    types = require('./types');

/**
 * @namespace WDDX
 * @class Deserializer
 */
var Deserializer = function () {

    /**
     * Deserializer options and their defaults.
     *
     * @property options
     * @type {Object}
     * @default {}
     */
    this.options = {};
};

module.exports = Deserializer;

/**
 * Set deserializer options.
 * Existing options will be overwritten.
 *
 * @method setOptions
 * @param {Object} options Options object
 * @return {Object} Deserializer instance
 */
Deserializer.prototype.setOptions = function (options) {

    if (!!options && options.constructor === Object) {

        this.options = merge(this.options, options);
    }

    return this;
};

/**
 * Get deserializer options.
 *
 * @method getOptions
 * @return {Object} Options object
 */
Deserializer.prototype.getOptions = function () {

    return this.options;
};

/**
 * Get deserializer option by key.
 * Options can be accessed using dot notation.
 *
 * @method getOption
 * @param {String} key Key to lookup in options object
 * @return {String|Number|Null|Object|undefined} Undefined when key is invalid or option is not available
 */
Deserializer.prototype.getOption = function (key) {

    var parts, i, j, result;

    if (key) {

        if (key.indexOf('.') === -1) {

            result = this.options[key];
        } else {

            parts = key.split('.');
            j = parts.length;

            if (j !== 0) {

                i = 0;

                result = this.options;

                for (i; i < j; i += 1) {

                    result = result[parts[i]];
                }
            }
        }
    }

    return result;
};

/**
 * Deserialize WDDX packet to JSON object.
 *
 * @method deserialize
 * @param {String} packet WDDX packet string
 * @return {Object|Null} Null when packet is invalid or undefined
 */
Deserializer.prototype.deserialize = function (wddxString, continuation) {

    if(!wddxString)
        return continuation(null, null);

    xamel.parse(wddxString, function(error, xml) {

        if(error)
            return continuation(error);

        var packet = xml.find('wddxPacket');

        if(packet.length != 1)
            return continuation(new Error('Not a valid WDDX packet'));

        var parsed = {
            version: null,
            header: null,
            data: null
        };

        parsed.version = packet.eq(0).attr('version');

        var header = xml.find('wddxPacket/header');
        if(header.length > 0) {
            if(header.length > 1)
                return continuation(new Error('WDDX packet can contain only one <header> tag'));

            var attrs = header.eq(0).attrs;
            parsed.header = Object.keys(attrs).length > 0 ? attrs : null;
        }

        var data = xml.find('wddxPacket/data');
        if(data.length > 0) {
            if(data.length > 1)
                return continuation(new Error('WDDX packet can contain only one <data> tag'));

            var dataNodes = xml.find('wddxPacket/data/*');
            if(dataNodes.length > 0) {
                if(dataNodes.length > 1)
                    return continuation(new Error('WDDX packet <data> should contain only one child'));
                parsed.data = types.fromWddx(JSON.parse(JSON.stringify(dataNodes.eq(0))));
            }
        }

        return continuation(null, parsed);
    });
};