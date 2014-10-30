module.exports = (function () {
    "use strict";

    /**
     * @namespace WDDX.Types
     * @class DateTime
     */
    return {
        fromWddx: function(tag) {
            var date = Date.parse(tag.text);
            if(isNaN(date)) {
                console.error('cannot parse datetime string, returning the string as is');
                return tag.text;
            }

            return new Date(date);
        }
    };
}());