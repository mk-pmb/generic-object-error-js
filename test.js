/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var objerr = require('generic-object-error'), assert = require('assert'),
  PT, foo, bar;

function Dummy(name) { this.name = name; }
PT = Dummy.prototype;
Object.assign(PT, objerr.proto);
PT.toString = function () { return '<dummy ' + this.name + '>'; };
PT.isDummy = function () { return true; };
PT.ahead = function (what) { throw new Error(what + ' ahead!'); };


foo = new Dummy('foo');
foo.buf = Buffer.from('bar');

assert.throws(function () {
  foo.ahead('whale');
}, /^Error: whale ahead!$/);

assert.doesNotThrow(function () {
  foo.err('hello');
});

assert.throws(function () {
  throw foo.err('hello');
}, /^Error: <dummy foo>: hello$/);


assert.doesNotThrow(function () {
  foo.try('toString');
});

assert.throws(function () {
  foo.try('ahead', ['whale']);
}, /^Error: <dummy foo>: whale ahead!$/);

assert.throws(function () {
  foo.try(['ahead', foo], ['whale']);
}, /^Error: <dummy foo>: whale ahead!$/);

assert.throws(function () {
  foo.try(['toString', foo.buf], ['utf-17']);
}, /^TypeError: <dummy foo>: Unknown encoding: utf-17$/);








console.log('+OK all tests passed');
