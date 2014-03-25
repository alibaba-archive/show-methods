
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var show = require('./');

var Class = function () {
  this._foo = 'bar';
  EventEmitter.call(this);
  this.on('error', function (err) {
    console.error(err);
  });
};

util.inherits(Class, EventEmitter);

Class.prototype.show = function() {
  return this._foo;
};

Class.prototype.__defineGetter__('foo', function () {
  return this._foo;
});

Class.prototype.__defineSetter__('foo', function (val) {
  this._foo = val;
});

Class.prototype.__defineGetter__('foo_', function () {
  return this._foo;
});

var c = new Class();

console.log(show(c, ['removeListener', 'removeAllListeners']));
