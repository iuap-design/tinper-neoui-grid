(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './columnInit', './re_gridCompTree'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./columnInit'), require('./re_gridCompTree'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.columnInit, global.re_gridCompTree);
        global.column = mod.exports;
    }
})(this, function (exports, _columnInit, _re_gridCompTree) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.column = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var column = function column(options, gridComp) {
        _classCallCheck(this, column);

        this.init(options, gridComp);
    };

    ;
    var gridCompColumnProto = column.prototype;
    Object.assign(gridCompColumnProto, _columnInit.initFunObj);

    /*
     * tree
     */


    gridCompColumnProto.initTree = _re_gridCompTree.treeFunObj.re_initTree;

    exports.column = column;
});