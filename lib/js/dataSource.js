'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dataSource = undefined;

var _dataSourceInit = require('./dataSourceInit');

var _re_gridCompSort = require('./re_gridCompSort');

var _re_gridCompTree = require('./re_gridCompTree');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataSource = function dataSource(options, gridComp) {
    _classCallCheck(this, dataSource);

    this.init(options, gridComp);
    this.sortRows();
};

;

var dataSourceProto = dataSource.prototype;

dataSourceProto.init = _dataSourceInit.init;
dataSourceProto.sortRows = _dataSourceInit.sortRows;
dataSourceProto.basicSortRows = _dataSourceInit.basicSortRows;
dataSourceProto.treeSortRows = _dataSourceInit.treeSortRows;
dataSourceProto.getSumValue = _dataSourceInit.getSumValue;

dataSourceProto.basicSortRows = _re_gridCompSort.re_basicSortRows;

/*
 * tree
 */


dataSourceProto.treeSortRows = _re_gridCompTree.re_treeSortRows;
dataSourceProto.pushChildRows = _re_gridCompTree.pushChildRows;

exports.dataSource = dataSource;