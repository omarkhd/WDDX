module.exports = (function () {
    "use strict";

    /**
     * @namespace WDDX.Types
     * @class Boolean
     */
    return {
        fromWddx: function(tag) {
            return tag.text == 'true';
        }
    };
}());