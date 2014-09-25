module.exports = (function () {
    "use strict";

    var converter = null;

    /**
     * @namespace WDDX.Types
     * @class Struct
     */
    return {
        fromWddx: function(tag) {
            converter = converter ? converter : require('./');
            var struct = {};
            tag.children.forEach(function(item) {
                if(item.name == 'var') {
                    if(item.attrs && item.attrs.name) {
                        if(item.children && item.children.length == 1) {
                            struct[item.attrs.name] = converter.fromWddx(item.children[0]);
                        }
                        else {
                            console.error('"%s" <%s> tag requires exactly 1 child to set its value from, setting null',
                                item.attrs.name, item.name);
                        }
                    }
                    else {
                        console.error('"name" attribute required in <%s> tag, ignoring value', item.name);
                    }
                }
                else {
                    console.error('<%s> tag not recognized as <%s> child, returning null',
                        item.name, tag.name);
                }
            });

            return struct;
        }
    };
}());