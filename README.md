show-methods
============

list all the methods in a node object.
it will list all the `methods`, `getters`, `setters`, `accesses` of an object,
even the `events` the object listened.

## Install

```
npm install show-methods
```

## Usage

```js
var show = require('show-methods');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

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
```

yield

```
{
 methods: [
   'show',
   'setMaxListeners',
   'emit',
   'addListener',
   'on',
   'once',
   // 'removeListener',     exclude by show-methods
   // 'removeAllListeners',
   'listeners'
  ],
  getters: [ 'foo_' ],
  accesses: [ 'foo' ],
  events: [ 'error' ]
}
```

## License

MIT
