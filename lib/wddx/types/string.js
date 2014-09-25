module.exports = (function () {
    "use strict";

    /**
     * @namespace WDDX.Types
     * @class String
     */
    return {
        fromWddx: function(tag) {
            return '' + tag.text;
        }
    };
}());