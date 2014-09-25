module.exports = (function () {
    "use strict";

    var converter = null;

    /**
     * @namespace WDDX.Types
     * @class Array
     */
    return {
        fromWddx: function(tag) {
            var converter = converter ? converter : require('./');
            var items = [];
            tag.children.forEach(function(item) {
                items.push(converter.fromWddx(item));
            });
            return items;
        }
    };
}());