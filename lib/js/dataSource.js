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
Object.assign(dataSourceProto, _dataSourceInit.initFunObj);

dataSourceProto.basicSortRows = _re_gridCompSort.sortFunObj.re_basicSortRows;

/*
 * tree
 */


dataSourceProto.treeSortRows = _re_gridCompTree.treeFunObj.re_treeSortRows;
dataSourceProto.pushChildRows = _re_gridCompTree.treeFunObj.pushChildRows;

exports.dataSource = dataSource;