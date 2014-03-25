
var should = require('should');
var show = require('..');
var EventEmitter = require('events').EventEmitter;

describe('show methods', function () {
  var proto = {
    _foo: 'bar'
  };
  it('should show normal methods ok', function () {
    proto.getFoo = function () {
      return this._foo;
    }
    show(proto).should.eql({
      methods: ['getFoo']
    });
    proto.setFoo = function (val) {
      this._foo = val;
    }
    show(proto).should.eql({
      methods: ['getFoo', 'setFoo']
    });
  });

  it('should show accesses ok', function () {
    proto.__defineGetter__('foo', function () {
      return this._foo;
    });
    show(proto).should.eql({
      methods: ['getFoo', 'setFoo'],
      getters: ['foo']
    });
    proto.__defineSetter__('foo', function (val) {
      this._foo = val;
    });
    show(proto).should.eql({
      methods: ['getFoo', 'setFoo'],
      accesses: ['foo']
    });
  });

  it('should exclude work ok', function () {
    show(proto, 'foo').should.eql({methods: ['getFoo', 'setFoo']});
    show(proto, ['getFoo', 'setFoo']).should.eql({accesses: ['foo']});
  });

  it('should show events ok', function () {
    var e = new EventEmitter();
    e.on('error', function () {});
    e.once('data', function () {});
    show(e).should.eql({
      methods: [
        'setMaxListeners',
        'emit',
        'addListener',
        'on',
        'once',
        'removeListener',
        'removeAllListeners',
        'listeners'
      ],
      events: [ 'error', 'data' ]
    });
  });
});
