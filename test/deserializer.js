var Deserializer = require('../lib/wddx/deserializer.js');

exports.options = function (test) {
    'use strict';

    var a = new Deserializer();

    test.ok(typeof a.getOptions() === 'object', 'Deserializer options should be type of Object');
    test.equals(a.getOption('undefinedOption'), undefined, 'Undefined option should return undefined result');

    a.setOptions({
        optionalOption: true
    });

    test.equals(a.getOptions().optionalOption, true, 'Unable to set deserializer options');
    test.equals(a.getOption('optionalOption'), true, 'Getting option by key, should return value only');

    test.done();
};