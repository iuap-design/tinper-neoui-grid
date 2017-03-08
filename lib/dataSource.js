(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './dataSourceInit', './re_gridCompSort', './re_gridCompTree'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./dataSourceInit'), require('./re_gridCompSort'), require('./re_gridCompTree'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.dataSourceInit, global.re_gridCompSort, global.re_gridCompTree);
        global.dataSource = mod.exports;
    }
})(this, function (exports, _dataSourceInit, _re_gridCompSort, _re_gridCompTree) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.dataSource = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

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
});