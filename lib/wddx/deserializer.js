"use strict";

var merge = require('deepmerge'),
    xml2js = require('xml2js');

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
Deserializer.prototype.deserialize = function (packet) {

    var parsed = null;

    if (packet) {

        xml2js.parseString(
            packet,
            {
                trim: true,
                normalize: true,
                explicitArray: false
            },
            function (error, result) {

                /** @namespace result.wddxPacket */
                var packet = result.wddxPacket,
                    parseStructObject,
                    parseVarObject;

                parseStructObject = function (structObject) {

                    var result, i, item;

                    if (!!structObject && structObject.constructor === Object) {

                        for (i in structObject) {

                            if (structObject.hasOwnProperty(i)) {

                                item = structObject[i];

                                if (item['var'] instanceof Array) {

                                    result = parseVarObject(item['var']);
                                }
                            }
                        }
                    }

                    return result;
                };

                parseVarObject = function (varObject) {

                    var result, i, j, item, value;

                    if (varObject instanceof Array) {

                        result = {};
                        i = 0;
                        j = varObject.length;

                        for (i; i < j; i += 1) {

                            item = varObject[i];

                            if (item.number) {

                                value = item.number;
                            } else {

                                if (item.array) {

                                    if (item.array.string) {

                                        value = item.array.string;
                                    }
                                }
                            }

                            result[item.$.name] = value;
                        }
                    }

                    return result;
                };

                if (packet) {

                    /** @namespace packet.$ */
                    parsed = packet.$;

                    /** @namespace packet.header */
                    parsed.header = packet.header.$;

                    parsed.data = parseStructObject(packet.data);
                }
            }
        );
    }

    return parsed;
};