'use strict';

var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    fixtures = path.dirname(__filename) + '/fixtures',
    simplePacket = fs.readFileSync(fixtures + '/wddx.simple.xml').toString();

suite('Deserializer', function () {

    var Deserializer = require('../lib/wddx/deserializer.js'),
        a = new Deserializer();

    suite('options', function () {

        test('is options a real object', function () {

            assert.ok(!!a.getOptions() && a.getOptions().constructor === Object);
        });

        test('undefined option undefined result', function () {

            assert.strictEqual(a.getOption('undefinedOption'), undefined);
            assert.strictEqual(a.getOption(''), undefined);
        });

        a.setOptions({
            optionalOption: true
        });

        test('set simple option', function () {

            assert.strictEqual(a.getOptions().optionalOption, true);
        });

        test('fetch option by key', function () {

            assert.strictEqual(a.getOption('optionalOption'), true);
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

            assert.strictEqual(a.getOption('optionalOption'), true);
        });

        test('can set nested options', function () {

            assert.strictEqual(a.getOptions().nested.optionA, true);
        });

        test('get nested object with dot nation', function () {

            assert.strictEqual(a.getOption('nested.optionB.optionC'), false);
        });

        test('original options stay immutable', function () {

            assert.strictEqual(a.getOptions().nested.optionB.optionC, a.getOption('nested.optionB.optionC'));
        });

        test('original options stay immutable', function () {

            assert.deepEqual(a.getOption('nested.optionB'), {optionC: false});
        });
    });

    suite('packetValidation', function () {

        test('packet string is validated', function () {

            assert.strictEqual(a.deserialize(''), null);
        });

        test('object is returned', function () {

            assert.ok(!!a.deserialize(simplePacket) && a.deserialize(simplePacket).constructor === Object);
        });
    });

    suite('packet deserialization', function () {

        test('simple packet', function () {

            var packet = a.deserialize(simplePacket);

            assert.strictEqual(packet.version, '1.0');
            assert.strictEqual(packet.header.comment, 'Simple example');
            assert.strictEqual(packet.data.pi, '3.1415926');

            /** @namespace packet.data.cities */
            assert.strictEqual(packet.data.cities.length, 3);
            assert.strictEqual(packet.data.cities[0], 'Austin');
            assert.strictEqual(packet.data.cities[1], 'Denver');
            assert.strictEqual(packet.data.cities[2], 'Seattle');
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

            assert.strictEqual(c.getOption('optionA'), undefined);
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