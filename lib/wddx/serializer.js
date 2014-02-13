module.exports = (function () {
    "use strict";

    /**
     * @namespace WDDX
     * @class Serializer
     */
    return {

        /**
         * Serialize given JSON object to WDDX string
         *
         * @method serialize
         * @param {Object} object
         * @returns {String}
         */
        serialize: function (object) {

            return '<wddxPacket />';
        }
    };
}());