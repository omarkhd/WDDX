'use strict';

var supported_types = [
    'array',
    'binary',
    'boolean',
    'datetime',
    'index',
    'null',
    'number',
    'recordset',
    'string',
    'struct'
];

var not_supported_callback = function(tag) {
    console.error('<%s> data tag not supported, returning null', tag.name);
    return null;
};

var type_converters = {};
supported_types.forEach(function(supported_type) {
    var module = require('./' + supported_type);

    if(!module.toWddx) module.toWddx = not_supported_callback;
    if(!module.fromWddx) module.fromWddx = not_supported_callback;

    type_converters[supported_type] = module;
});

module.exports = {
    toWddx: function(data) {
        return null;
    },

    /**
     * expects an object representing a tag with the following properties:
     *   name - the name of the tag data type
     *   attrs - hash object representing the tag attributes
     *   children - array of tag children (if it is an array or an object)
     *   text - the text value of the tag
     */
    fromWddx: function(tag) {
        if(!tag)
            return null;

        tag.text = tag.text === (void 0) ? '' : tag.text;
        tag.children = tag.children === (void 0) ? [] : tag.children;

        if(supported_types.indexOf(tag.name.toLowerCase()) == -1)
            throw new Error('Tag data type not supported');

        return type_converters[tag.name].fromWddx(tag)
    }
};