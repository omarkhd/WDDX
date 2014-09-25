module.exports = (function () {
    "use strict";

    /**
     * @namespace WDDX.Types
     * @class Number
     */
    return {
        fromWddx: function(tag) {
            var number = null;

            if(tag.text.indexOf('.') != -1)
                number = parseFloat(tag.text);
            else
                number = parseInt(tag.text);

            if(isNaN(number)) {
                console.error('cannot parse number string, returning null');
                return null;
            }

            return number;
        }
    };
}());