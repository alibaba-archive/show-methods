/*!
 * show-methods - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var EventEmitter = require('events').EventEmitter;

/**
 * Expose `list`
 */

module.exports = list;

/**
 * list all methods in an object
 * @param {Object} obj
 * @param {Array} exclude
 * @return {Object}
 *
 * @api public
 */

function list(obj, exclude) {
  if (!obj) {
    return {};
  }
  exclude = exclude || [];
  if (!Array.isArray(exclude)) {
    exclude = [ exclude ];
  }

  var methods = {
    methods: [],
    getters: [],
    setters: [],
    accesses: [],
  };
  for (var key in obj) {
    if (~exclude.indexOf(key)) continue;

    if (typeof obj[key] === 'function') {
      methods.methods.push(key);
      continue;
    }

    var setter = obj.__lookupSetter__(key);
    var getter = obj.__lookupGetter__(key);
    if (setter && getter) {
      methods.accesses.push(key);
      continue;
    }
    if (setter) methods.setters.push(key);
    if (getter) methods.getters.push(key);
  }

  if (obj instanceof EventEmitter && obj._events) {
    methods.events = Object.keys(obj._events);
  }

  for (var key in methods) {
    if (!methods[key].length) delete methods[key];
  }
  return methods;
}
