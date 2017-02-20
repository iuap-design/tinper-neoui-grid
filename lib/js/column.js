'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.column = undefined;

var _columnInit = require('./columnInit');

var _re_gridCompTree = require('./re_gridCompTree');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var column = function column(options, gridComp) {
    _classCallCheck(this, column);

    this.init(options, gridComp);
};

;

var gridCompColumnProto = column.prototype;

gridCompColumnProto.init = _columnInit.init;
gridCompColumnProto.initTree = _columnInit.initTree;
gridCompColumnProto.getBooleanOptions = _columnInit.getBooleanOptions;

/*
 * tree
 */


gridCompColumnProto.initTree = _re_gridCompTree.re_initTree;

exports.column = column;