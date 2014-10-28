module.exports = (function () {
    "use strict";

    var converter = null;

    /**
     * @namespace WDDX.Types
     * @class RecordSet
     */
    return {
        fromWddx: function(tag) {
            var converter = converter ? converter : require('./');
            var items = [];

            var row_count = +tag.attrs['rowCount'];
            if(row_count == 0) {
                return items;
            }

            for(var i = 0; i < row_count; i++) {
                items.push({});
            }

            tag.children.forEach(function(item) {
                for(var i = 0; i < item.children.length; i++) {
                    items[i][item.attrs.name] = converter.fromWddx(item.children[i]);
                }
            });

            return items;
        }
    };
}());