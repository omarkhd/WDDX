module.exports = (function () {
    "use strict";

    var Serializer = require('./wddx/serializer'),
        Deserializer = require('./wddx/deserializer');

    /**
     * @module WDDX
     * @class WDDX
     * @return {Object}
     */
    return {

        /**
         * Get serializer instance
         *
         * @method getSerializer
         * @param {Object} options
         * @returns {Serializer}
         */
        getSerializer: function (options) {

            return new Serializer(options);
        },

        /**
         * Get deserializer instance
         *
         * @method getDeserializer
         * @param {Object} options
         * @returns {Deserializer}
         */
        getDeserializer: function (options) {

            return new Deserializer(options);
        },

        /**
         * Serialize given JSON object to WDDX string
         *
         * @method serialize
         * @param {Object} object
         * @param {Object} options
         * @returns {String}
         */
        serialize: function (object, options) {

            return this.getDeserializer(options).serialize(object);
        },

        /**
         * Deserialize WDDX string to JSON object
         *
         * @method deserialize
         * @param {String} string
         * @param {Object} options
         * @returns {Object}
         */
        deserialize: function (string, options) {

            return this.getDeserializer(options).deserialize(string);
        },

        /**
         * @property version
         * @type String
         */
        version: '0.0.2-prototype'
    };
}());