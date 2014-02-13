module.exports = (function () {
    "use strict";

    /**
     * @namespace WDDX
     * @class Packet
     */
    return {

        /**
         * @method fromString
         * @param {String} string
         * @returns {Object}
         */
        fromString: function (string) {

            return {};
        },

        /**
         * @method fromJSON
         * @param {Object} object
         * @returns {String}
         */
        fromJSON: function (object) {

            return '<wddx />';
        },

        /**
         * @method toString
         * @returns {string}
         */
        toString: function () {

            return '<wddx />';
        },

        /**
         * @method toJSON
         * @param {String} string
         * @returns {Object}
         */
        toJSON: function (string) {

            return {};
        }
    };
}());