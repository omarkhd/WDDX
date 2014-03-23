"use strict";

/**
 * @namespace WDDX
 * @class Deserializer
 */
var Deserializer = function () {

    /**
     * Deserializer options and their defaults
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

    this.options = options;

    return this;
};

/**
 * Get deserializer options
 *
 * @method getOptions
 * @return {Object} Options object
 */
Deserializer.prototype.getOptions = function () {

    return this.options;
};

/**
 * Get deserializer option by key.
 *
 * @method getOption
 * @param {String} key Key to lookup in options object
 * @return {*|undefined} Undefined when key is invalid or option is not available
 */
Deserializer.prototype.getOption = function (key) {

    return !key || !this.options[key] ? undefined : this.options[key];
};

/**
 * Deserialize WDDX packet to JSON object
 *
 * @method deserialize
 * @param {String} packet WDDX packet string
 * @return {Object|Null} Null is returned when packet is invalid
 */
Deserializer.prototype.deserialize = function (packet) {

    if (!packet) {

        return null;
    }

    return {};
};