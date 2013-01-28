/*
 * backbone-cappedcollection
 * https://github.com/FGRibreau/backbone-cappedcollection
 *
 * Copyright (c) 2013 FG Ribreau
 * Licensed under the MIT license.
 */

(function(){
var wrapper = function(Backbone) {
  if(!Backbone){
    throw new Error("Server-side usage:\nvar Backbone = require('backbone-cappedcollection')(require('backbone'));");
  }

  var _ = this._ || require('lodash');

  Backbone.CappedCollection = Backbone.Collection.extend({
    /**
     * Capped Collection default size
     * @type {Number}
     */
    cap:5,

    /**
     * From where should it start to remove elements
     * @type {String} "first" or "last"
     */
    capRemove:"first",

    initialize: function(models, options){
      _.extend(this, options);

      if(!(this.capRemove in {first:1, last:1})){
        throw new Error(".capRemove should either be 'first' or 'last'");
      }
    }
  });

  function _cappedAdd(func, models, options){
    func.call(this, models, options);
    if(this.length <= this.cap){return;}
    this.remove(this[this.capRemove].call(this, this.length-this.cap));
  }

  Backbone.CappedCollection.prototype.add = _.wrap(Backbone.Collection.prototype.add, _cappedAdd);

  return Backbone;
  // End module
};

// Cross-platform code
if(typeof module !== "undefined") {
  module.exports = wrapper;
} else if(typeof Backbone !== "undefined"){
  this.Backbone = wrapper(this.Backbone);
}
}).call(this);


