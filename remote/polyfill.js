"use strict";
if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
  
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
   };
}

if(!String.prototype.replaceAll){
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };
}

if(!String.prototype.regReplaceAll){
  String.prototype.regReplaceAll = function(pattern, replacement) {
    var target = this;
    return target.replace(pattern, replacement);
  };
}
if(!String.prototype.regSelect){
  String.prototype.regSelectAll = function(pattern, replacement) {
    var target = this;
    var match=target.match(pattern, replacement);
    return match?match.join(""):"";
  };
}
if(!String.prototype.replaceNbsps){
  String.prototype.replaceNbsps = function (){
    var str = this;
    var re = new RegExp(String.fromCharCode(160), "g");
    return str.replace(re, " ");
  }
};


// Overwrites native 'children' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
// Returns array instead of HTMLCollection.
;(function(constructor) {
  if (constructor &&
      constructor.prototype &&
      constructor.prototype.children == null) {
      Object.defineProperty(constructor.prototype, 'children', {
          get: function() {
              var i = 0, node, nodes = this.childNodes, children = [];
              while (node = nodes[i++]) {
                  if (node.nodeType === 1) {
                      children.push(node);
                  }
              }
              return children;
          }
      });
  }
})(window.Node || window.Element);

var isFunction=function(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}