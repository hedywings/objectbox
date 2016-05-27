var _ = require('lodash'),
    should = require('should'),
    fs = require('fs'),
    Db = require('../lib/db'),
    Storage = require('../lib/objectbox');

var dbPath = '../lib/database/objectbox.db',
    gadBox;

fs.exists(dbPath, function (isThere) {
    if (isThere) { fs.unlink(dbPath); }
});

var gad1 = {
        _id: null,
        _dev: {
            _netcore: 'ble-core',
            _id: 5,
            _net: {
                address: {
                    permanent: '0x78c5e570737f',
                    dynamic: '0'
                }
            }
        },
        _auxId: 0x2a1c,
        _panel: {
            enabled: false,
            profile: '',
            class: 'TempMeas',
        },
        _props: {
            name: 'gad1',
            description: 'for test'
        },
        _attrs: {
            temperature: 26
        },
        extra: null
    },
    gad2 = {
        _id: null,
        _dev: {
            _netcore: 'zigbee-core',
            _id: 8,
            _net: {
                address: {
                    permanent: '0x00124b00043126d1',
                    dynamic: '0x768e'
                }
            }
        },
        _auxId: 0x0003,
        _panel: {
            enabled: true,
            profile: 'HomeAutomation',
            class: 'light',
        },
        _props: {
            name: 'gad2',
            description: 'for test'
        },
        _attrs: {
            onoff: false
        },
        extra: null
    },
    gad3 = {
        _id: null,
        _dev: {
            _netcore: 'mqtt-core',
            _id: 13,
            _net: {
                address: {
                    permanent: '0x12345678',
                    dynamic: '0x1234'
                }
            }
        },
        _auxId: 3328,
        _panel: {
            enabled: true,
            profile: 'CommTempSensors',
            class: 'power',
        },
        _props: {
            name: 'gad3',
            description: 'for test'
        },
        _attrs: {
            power: 60
        },
        extra: null
    },
    gadInfo4 = {
        id: 4,
        dev: {
            id: 27,
            permAddr: '192.168.1.0'
        },
        auxId: '/light/0',
        panel: {
            enabled: false,
            profile: 'sersor',
            class: 'light',
        },
        props: {
            name: 'gad4',
            description: 'for test'
        },
        attrs: {
            onoff: false
        }
    },
    gadInfo5 = {
        id: 5,
        dev: {
            id: 40,
            permAddr: 'xxxxxxxxxx'
        },
        auxId: '0x1800.0x2a00',
        panel: {
            enabled: false,
            profile: 'sersor',
            class: 'humidity',
        },
        props: {
            name: 'gad5',
            description: 'for test'
        },
        attrs: {
            sensorValue: 60
        }
    };

gad1.dump = gad2.dump = gad3.dump = function () {
    return {
        id: this._id,
        dev: {
            id: this._dev._id,
            permAddr: this._dev._net.address.permanent
        },
        auxId: this._auxId,
        panel: this._panel,
        props: this._props,
        attrs: this._attrs
    };
};

describe('Constructor Check', function () {
    it('new Storage()', function () {
        gadBox = new Storage(dbPath, 100);
        should(gadBox._count).be.eql(0);
        should(gadBox._maxNum).be.eql(100);
        should(gadBox._box).be.Object();
        should(gadBox._db).be.instanceof(Db);
        (function () { return new Storage(1, 10); }).should.throw();
    });
});

describe('Functional Check', function () {
    it('isEmpty() - empty', function () {
        gadBox.isEmpty().should.be.true();
    });

    it('has() - empty', function () {
        gadBox.has(1).should.be.false();
    });

    it('get() - empty', function () {
        should(gadBox.get(1)).be.undefined();
    });

    it('getCount() - empty', function () {
        gadBox.getCount().should.be.eql(0);
    });

    it('getMaxNum()', function () {
        gadBox.getMaxNum().should.be.eql(100);
    });

    it('set()', function (done) {
        gadBox.set(1, gad1, function (err, id) {
            gad1._id = id;
            if (id === 1) done();
        });
    });

    it('set()', function (done) {
        gadBox.set(2, gad2, function (err, id) {
            gad2._id = id;
            if (id === 2) done();
        });
    });

    it('set() - bad id', function (done) {
        gadBox.set(200, gad1, function (err) {
            if (err.message === 'id can not be larger than the maxNum.') done();
        });
    });

    it('set() - set repeat', function (done) {
        gadBox.set(1, gad1, function (err) {
            if (err.message === 'id: 1 has been used.') done();
        });
    });

    it('add()', function (done) {
        gadBox.add(gad3, function (err, id) {
            gad3._id = id;
            if (id === 3) done();
        });
    });

    it('isEmpty()', function () {
        gadBox.isEmpty().should.be.false();
    });

    it('has()', function () {
        gadBox.has(1).should.be.true();
    });

    it('get()', function () {
        should(gadBox.get(1)).be.deepEqual(gad1);
    });

    it('getCount()', function () {
        gadBox.getCount().should.be.eql(3);
    });

    it('filter()', function () {
        gadBox.filter('extra', null).should.be.deepEqual([gad1, gad2, gad3]);
        gadBox.filter('_auxId', 3328).should.be.deepEqual([gad3]);
        gadBox.filter('_id', 5).should.be.deepEqual([]);
        gadBox.filter('_xxx', 5).should.be.deepEqual([]);
    });

    it('find()', function () {
        gadBox.find({_id: 1}).should.deepEqual(gad1);
        gadBox.find({_dev: { _netcore: 'zigbee-core' }}).should.deepEqual(gad2);
        gadBox.find('_auxId').should.be.deepEqual(gad1);
        gadBox.find(function(o) { return o._panel.class === 'power'; }).should.be.deepEqual(gad3);
        should(gadBox.find({_id: 5})).be.undefined();
    });

    it('exportAllIds()', function () {
        gadBox.exportAllIds().should.be.deepEqual([1, 2, 3]);
    });

    it('exportAllObjs()', function () {
        gadBox.exportAllObjs().should.be.deepEqual([gad1, gad2, gad3]);
    });

    it('add() - with id', function (done) {
        gadBox.add(gad1, function (err, id) {
            if (id === 1) done();
        });
    });

    it('add() - no dump()', function (done) {
        gadBox.add(gadInfo4, function (err, id) {
            if (id === 4) done();
        });
    });

    it('set() - no dump()', function (done) {
        gadBox.set(5, gadInfo5, function (err, id) {
            if (id === 5) done();
        });
    });

    it('modify() - modify id', function (done) {
        gadBox.modify(1, 'id', 3, function (err) {
            if (err.message === 'id can not be modified.') done();
        });
    });

    it('modify() - with invalid id', function (done) {
        gadBox.modify(6, 'auxId', 500, function (err) {
            if (err.message === 'No such item of id: 6 for property modify.') done();
        });
    });

    it('modify() - with invalid property', function (done) {
        gadBox.modify(1, 'auxxId', 500, function (err) {
            if (err.message === 'No such property auxxId to modify.') done();
        });
    });

    it('modify()', function (done) {
        gadBox.modify(1, 'auxId', 500, function (err, result) {
            if (_.isEqual(result, {auxId: 500})) done();
        });
    });

    it('modify()', function (done) {
        gadBox.modify(3, 'attrs.power', 500, function (err, result) {
            if (_.isEqual(result, {attrs: {power: 500}})) done();
        });
    });

    it('modify()', function (done) {
        gadBox.modify(3, 'props', {name: 'gad33'}, function (err, result) {
            if (_.isEqual(result, {name: 'gad33'})) done();
        });
    });

    it('modify() - find nothing', function (done) {
        gadBox.modify(3, 'props', {name: 'gad33', description: 'hello'}, function (err, result) {
            if (_.isEqual(result, {description: 'hello'})) done();
        });
    });

    it('modify() - find nothing', function (done) {
        gadBox.modify(3, 'props', {namee: 'gad3', description: 'hello'}, function (err, result) {
            if (err) done();
        });
    });

    it('modify() - find nothing', function (done) {
        gadBox.modify(3, 'propss', {name: 'gad3', description: 'hello'}, function (err, result) {
            if (err) done();
        });
    });

    it('replace() - replace id', function (done) {
        gadBox.replace(1, 'id', 3, function (err, result) {
            if (err.message === 'id can not be replaced.') done();
        });
    });

    it('replace() - with invalid id', function (done) {
        gadBox.replace(6, 'id', 3, function (err, result) {
            if (err.message === 'No such item of id: 6 for property replace.') done();
        });
    });

    it('replace() - with invalid property', function (done) {
        gadBox.replace(1, 'auxIdd', 3, function (err, result) {
            if (err.message === 'No such property auxIdd to replace.') done();
        });
    });

    it('replace()', function (done) {
        gadBox.replace(3, 'props', {}, function () {
            gadBox.findFromDb({id: 3}, function (err, docs) {
                if (_.isEqual(docs[0].props, {})) done();
            });
        });
    });

    it('replace()', function (done) {
        gadBox.replace(3, 'attrs.power', 10, function () {
            gadBox.findFromDb({id: 3}, function (err, docs) {
                if (docs[0].attrs.power === 10) done();
            });
        });
    });

    it('removeElement()', function () {
        gadBox.removeElement(10).should.be.false();
        gadBox.removeElement(5).should.be.true();
    });

    it('remove() - with invalid id', function (done) {
        gadBox.remove(8, function (err) {
            if (!err) done();
        });
    });

    it('remove()', function (done) {
        gadBox.remove(1, function (err) {
            if (!gadBox.get(1)) done();
        });
    });

    it('findFromDb()', function (done) {
        gadBox.findFromDb({ auxId: '/light/0' }, function (err, docs) {
            delete docs[0]._id;
            if (_.isEqual(docs[0], gadInfo4)) done();
        });
    });

    it('maintain()', function (done) {
        gadBox.maintain(function (err) {
            if (err) {
                console.log(err);
            } else {
                gadBox.findFromDb({id: {$exists: true}},function(err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (docs.length === 3) done();
                    }
                });
            }
        });
    });
});