var Backbone           = require('backbone');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var backbone = null;

exports['CappedCollection'] = {
  setUp: function(done) {
    backbone = require('../')(Backbone);
    done();
  },
  tearDown: function(done){
    backbone = null;
    done();
  },
  'constructor requires Backbone': function(test) {
    test.expect(1);
    // tests here
    test.throws(function(){
      new require('../')();
    }, 'Error');
    test.done();
  },
  'constructor': function(t) {
    t.expect(1);
    var coll = new backbone.CappedCollection([], {
      cap:2
    });
    t.equal(coll.cap, 2);
    t.done();
  },
  'constructor with models': function(t) {
    t.expect(2);
    var coll = new backbone.CappedCollection([
      {name: "Tim", age: 5},
      {name: "Ida", age: 26},
      {name: "Rob", age: 55}
    ], {
      cap:4
    });
    t.equal(coll.cap, 4);
    t.equal(coll.length, 3);
    t.done();
  },
  '.capRemove attr should be either "first" or "last"': function(t) {
    t.expect(2);

    t.throws(function(){
      new backbone.CappedCollection([], {cap:4, capRemove:"plop"});
    }, Error);

    t.doesNotThrow(function(){
      new backbone.CappedCollection([], {cap:4, capRemove:"first"});
      new backbone.CappedCollection([], {cap:4, capRemove:"last"});
    }, Error);

    t.done();
  },
  'Should automatically remove models': function(t){
    t.expect(1);
    var wrapped = require('../')(Backbone);
    var coll = new wrapped.CappedCollection([
      {name: "Tim", age: 5},
      {name: "Ida", age: 26},
      {name: "Rob", age: 55}
    ], {
      cap:2
    });
    t.equal(coll.length, 2);
    t.done();
  },
  'Should emit "remove" events': function(t){
    t.expect(1);
    var wrapped = require('../')(Backbone);
    // Collection with default comparator
    var coll = new wrapped.CappedCollection([], {cap:2});
    coll.on('remove', function(model){
      t.equal(model.get('name'), "Tim");
    });

    coll.add({name: "Tim", age: 5});
    coll.add({name: "Ida", age: 26});
    coll.add({name: "Rob", age: 55});

    t.done();
  },
  'By default remove the oldest elements': function(t){
    t.expect(3);
    var wrapped = require('../')(Backbone);
    // Collection with default comparator
    var coll = new wrapped.CappedCollection([], {cap:2});

    t.equal(coll.capRemove, 'first');

    coll.add({name: "Tim", age: 5}); // Will be removed
    coll.add({name: "Ida", age: 26});
    coll.add({name: "Rob", age: 55});

    t.equal(coll.length, 2);
    t.equal(coll.first().get("name"), "Ida");
    t.done();
  },
  'By default remove the newest elements': function(t){
    t.expect(3);
    var wrapped = require('../')(Backbone);
    // Collection with default comparator
    var coll = new wrapped.CappedCollection([], {cap:2, capRemove:"last"});

    t.equal(coll.capRemove, 'last');

    coll.add({name: "Tim", age: 5});
    coll.add({name: "Ida", age: 26});
    coll.add({name: "Rob", age: 55}); // Will be removed

    t.equal(coll.length, 2);
    t.equal(coll.first().get("name"), "Tim");
    t.done();
  }
};
