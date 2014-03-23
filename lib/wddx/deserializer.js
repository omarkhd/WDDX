"use strict";

var merge = require('deepmerge');

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

    if (!key) {

        return undefined;
    }

    if (key.indexOf('.') === -1) {

        return this.options[key];
    }

    var parts = key.split('.'),
        i = 0,
        j = parts.length,
        result;

    if (j !== 0) {

        result = this.options;

        for (i; i < j; i += 1) {

            result = result[parts[i]];
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
Deserializer.prototype.deserialize = function (packet) {

    if (!packet) {

        return null;
    }

    return {};
};