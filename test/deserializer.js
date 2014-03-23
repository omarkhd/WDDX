'use strict';

var assert = require('assert');

suite('Deserializer', function () {

    var Deserializer = require('../lib/wddx/deserializer.js');

    suite('options', function () {

        var a = new Deserializer();

        test('is options a real object', function () {

            assert.ok(!!a.getOptions() && a.getOptions().constructor === Object);
        });

        test('undefined option undefined result', function () {

            assert.equal(a.getOption('undefinedOption'), undefined);
        });

        a.setOptions({
            optionalOption: true
        });

        test('set simple option', function () {

            assert.equal(a.getOptions().optionalOption, true);
        });

        test('fetch option by key', function () {

            assert.equal(a.getOption('optionalOption'), true);
        });

        a.setOptions({
            nested: {
                optionA: true,
                optionB: {
                    optionC: false
                }
            }
        });

        test('options are overwritten correctly', function () {

            assert.equal(a.getOption('optionalOption'), true);
        });

        test('can set nested options', function () {

            assert.equal(a.getOptions().nested.optionA, true);
        });

        test('get nested object with dot nation', function () {

            assert.equal(a.getOption('nested.optionB.optionC'), false);
        });

        test('original options stay immutable', function () {

            assert.equal(a.getOptions().nested.optionB.optionC, a.getOption('nested.optionB.optionC'));
        });

        test('original options stay immutable', function () {

            assert.deepEqual(a.getOption('nested.optionB'), {optionC: false});
        });
    });
});