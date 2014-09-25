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

        test('packet string is validated', function (done) {

            a.deserialize('', function(error, packet) {
                if(error) throw error;
                assert.strictEqual(packet, null);

                done();
            });
        });

        test('object is returned', function (done) {

            a.deserialize(simplePacket, function(error, packet) {
                if(error) throw error;
                assert.ok(!!packet && packet.constructor === Object);

                done();
            });
        });
    });

    suite('packet deserialization', function () {

        test('simple packet', function (done) {

            a.deserialize(simplePacket, function(error, packet) {
                if(error) throw error;

                assert.strictEqual(packet.version, '1.0');
                assert.strictEqual(packet.header.comment, 'Simple example');
                assert.strictEqual(packet.data.pi > 3.14 && packet.data.pi < 3.15, true);

                /** @namespace packet.data.cities */
                assert.strictEqual(packet.data.cities.length, 4);
                assert.strictEqual(packet.data.cities[0], 'Austin');
                assert.strictEqual(packet.data.cities[1], 'Denver');
                assert.strictEqual(packet.data.cities[2], 42);
                assert.strictEqual(packet.data.cities[3], 'Seattle');

                done();
            });
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