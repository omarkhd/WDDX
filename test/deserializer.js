'use strict';

var assert = require('assert');

suite('Deserializer', function () {

    var Deserializer = require('../lib/wddx/deserializer.js'),
        a = new Deserializer();

    suite('options', function () {

        test('is options a real object', function () {

            assert.ok(!!a.getOptions() && a.getOptions().constructor === Object);
        });

        test('undefined option undefined result', function () {

            assert.equal(a.getOption('undefinedOption'), undefined);
            assert.equal(a.getOption(''), undefined);
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

    suite('process', function () {

        test('packet string is validated', function () {

            assert.equal(a.deserialize(''), null);
        });

        test('object is returned', function () {

            assert.ok(!!a.deserialize('<WDDX />') && a.deserialize('<WDDX />').constructor === Object);
        });
    });

    suite('multipleInstances', function () {

        var b = new Deserializer(),
            c = new Deserializer();

        b.setOptions({
            optionA: true,
            optionB: false
        });

        test('b options do not interfere with c options', function () {

            assert.equal(c.getOption('optionA'), undefined);
            assert.deepEqual(c.getOptions(), {});

            c.setOptions({
                optionC: false,
                optionD: true
            });
        });

        test('b and c are not equal', function () {

            assert.notDeepEqual(b, c);
        });
    });
});