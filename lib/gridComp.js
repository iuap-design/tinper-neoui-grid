(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './gridCompCreate', './gridCompCreateCal', './gridCompEvent', './gridCompGet', './gridCompInit', './gridCompOperateRow', './gridCompRenderType', './gridCompSet', './gridCompWDChange', './gridCompClick', './gridCompOther', './ut_utility', './re_gridCompColMenu', './re_gridCompDrag', './re_gridCompEdit', './re_gridCompEditForm', './re_gridCompFixed', './re_gridCompFormShow', './re_gridCompHeaderLevel', './re_gridCompLocalStorage', './re_gridCompOverWidthHidden', './re_gridCompSort', './re_gridCompSumRow', './re_gridCompSwap', './re_gridCompRowDrag', './re_gridCompTree'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./gridCompCreate'), require('./gridCompCreateCal'), require('./gridCompEvent'), require('./gridCompGet'), require('./gridCompInit'), require('./gridCompOperateRow'), require('./gridCompRenderType'), require('./gridCompSet'), require('./gridCompWDChange'), require('./gridCompClick'), require('./gridCompOther'), require('./ut_utility'), require('./re_gridCompColMenu'), require('./re_gridCompDrag'), require('./re_gridCompEdit'), require('./re_gridCompEditForm'), require('./re_gridCompFixed'), require('./re_gridCompFormShow'), require('./re_gridCompHeaderLevel'), require('./re_gridCompLocalStorage'), require('./re_gridCompOverWidthHidden'), require('./re_gridCompSort'), require('./re_gridCompSumRow'), require('./re_gridCompSwap'), require('./re_gridCompRowDrag'), require('./re_gridCompTree'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.gridCompCreate, global.gridCompCreateCal, global.gridCompEvent, global.gridCompGet, global.gridCompInit, global.gridCompOperateRow, global.gridCompRenderType, global.gridCompSet, global.gridCompWDChange, global.gridCompClick, global.gridCompOther, global.ut_utility, global.re_gridCompColMenu, global.re_gridCompDrag, global.re_gridCompEdit, global.re_gridCompEditForm, global.re_gridCompFixed, global.re_gridCompFormShow, global.re_gridCompHeaderLevel, global.re_gridCompLocalStorage, global.re_gridCompOverWidthHidden, global.re_gridCompSort, global.re_gridCompSumRow, global.re_gridCompSwap, global.re_gridCompRowDrag, global.re_gridCompTree);
        global.gridComp = mod.exports;
    }
})(this, function (exports, _gridCompCreate, _gridCompCreateCal, _gridCompEvent, _gridCompGet, _gridCompInit, _gridCompOperateRow, _gridCompRenderType, _gridCompSet, _gridCompWDChange, _gridCompClick, _gridCompOther, _ut_utility, _re_gridCompColMenu, _re_gridCompDrag, _re_gridCompEdit, _re_gridCompEditForm, _re_gridCompFixed, _re_gridCompFormShow, _re_gridCompHeaderLevel, _re_gridCompLocalStorage, _re_gridCompOverWidthHidden, _re_gridCompSort, _re_gridCompSumRow, _re_gridCompSwap, _re_gridCompRowDrag, _re_gridCompTree) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.gridComp = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var gridComp = function gridComp(ele, options) {
        _classCallCheck(this, gridComp);

        this.init(ele, options);
        this.initGrid();
    };

    ;
    var gridCompProto = gridComp.prototype;
    Object.assign(gridCompProto, _gridCompCreate.createFunObj);
    Object.assign(gridCompProto, _gridCompCreateCal.createCalFunOjb);
    Object.assign(gridCompProto, _gridCompEvent.eventFunObj);
    Object.assign(gridCompProto, _gridCompGet.getFunObj);
    Object.assign(gridCompProto, _gridCompInit.initFunObj);
    Object.assign(gridCompProto, _gridCompOperateRow.operateRowFunObj);
    Object.assign(gridCompProto, _gridCompRenderType.renderTypeFunObj);
    Object.assign(gridCompProto, _gridCompSet.setFunObj);
    Object.assign(gridCompProto, _gridCompWDChange.wdChangeFunObj);
    Object.assign(gridCompProto, _gridCompClick.clickFunObj);
    Object.assign(gridCompProto, _gridCompOther.otherFunObj);
    Object.assign(gridCompProto, _ut_utility.utilFunOjb);

    /*
     * colmuenu
     */
    var oldInitGridCompColumn = gridCompProto.initGridCompColumn,
        oldInitEventFun = gridCompProto.initEventFun,
        oldInitGridEventFun = gridCompProto.initGridEventFun;

    gridCompProto.initGridCompColumnColumnMenuFun = _re_gridCompColMenu.re_initGridCompColumnColumnMenuFun;
    gridCompProto.initGridCompColumn = function () {
        // 执行原有方法
        oldInitGridCompColumn.apply(this, arguments);
        _re_gridCompColMenu.colMenu_initGridCompColumn.apply(this, arguments);
    };
    gridCompProto.createColumnMenu = _re_gridCompColMenu.re_createColumnMenu;
    gridCompProto.initEventFun = function () {
        // 执行原有方法
        oldInitEventFun.apply(this, arguments);
        _re_gridCompColMenu.colMenu_initEventFun.apply(this, arguments);
    };
    gridCompProto.initGridEventFun = function () {
        // 执行原有方法
        oldInitGridEventFun.apply(this, arguments);
        _re_gridCompColMenu.colMenu_initGridEventFun.apply(this, arguments);
    };

    if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
        gridCompProto.saveGridCompColumnArrToLocal = function () {};
    }
    if (typeof gridCompProto.clearLocalData == 'undefined') {
        gridCompProto.clearLocalData = function () {};
    }

    /*
     * grag
     */
    var oldInitEventFun_grag = gridCompProto.initEventFun;
    var oldInitGridEventFun_grag = gridCompProto.initGridEventFun;

    Object.assign(gridCompProto, _re_gridCompDrag.dragFunObj);
    gridCompProto.initEventFun = function () {
        // 执行原有方法
        oldInitEventFun_grag.apply(this, arguments);
        _re_gridCompDrag.dragFunObj.drag_initEventFun.apply(this, arguments);
    };
    gridCompProto.initGridEventFun = function () {
        // 执行原有方法
        oldInitGridEventFun_grag.apply(this, arguments);
        _re_gridCompDrag.dragFunObj.drag_initGridEventFun.apply(this, arguments);
    };
    if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
        gridCompProto.saveGridCompColumnArrToLocal = function () {};
    }

    /*
     * edit
     */
    var oldInitEventFun_edit = gridCompProto.initEventFun;

    Object.assign(gridCompProto, _re_gridCompEdit.eidtFunObj);

    if (typeof gridCompProto.formEditCell == 'undefined') {
        gridCompProto.formEditCell = function () {};
    };

    gridCompProto.initEventFun = function () {
        // 执行原有方法
        oldInitEventFun_edit.apply(this, arguments);
        _re_gridCompEdit.eidtFunObj.edit_initEventFun.apply(this, arguments);
    };

    /*
     * editForm
     */
    var oldInitDefault = gridCompProto.initDefault,
        oldSetRequired = gridCompProto.setRequired;

    Object.assign(gridCompProto, _re_gridCompEditForm.editFromFunObj);
    gridCompProto.initDefault = function () {
        // 执行原有方法
        oldInitDefault.apply(this, arguments);
        _re_gridCompEditForm.editFromFunObj.editForm_initDefault.apply(this, arguments);
    };
    gridCompProto.setRequired = function () {
        // 执行原有方法
        oldSetRequired.apply(this, arguments);
        _re_gridCompEditForm.editFromFunObj.editForm_setRequired.apply(this, arguments);
    };

    /*
     * fixed
     */
    var oldColumnsVisibleFun = gridCompProto.columnsVisibleFun;

    Object.assign(gridCompProto, _re_gridCompFixed.fixFunObj);
    gridCompProto.columnsVisibleFun = function () {
        // 执行原有方法
        oldColumnsVisibleFun.apply(this, arguments);
        _re_gridCompFixed.fixFunObj.fixed_columnsVisibleFun.apply(this, arguments);
    };

    /*
     * formShow
     */

    Object.assign(gridCompProto, _re_gridCompFormShow.formShowFunOjb);

    /*
     * headerLevel
     */

    Object.assign(gridCompProto, _re_gridCompHeaderLevel.headerLevelFunObj);

    /*
     * localStorage
     */

    Object.assign(gridCompProto, _re_gridCompLocalStorage.localStorageFunObj);

    /*
     * overWidthColumn
     */

    Object.assign(gridCompProto, _re_gridCompOverWidthHidden.overWidthHiddenFunObj);

    /*
     * sort
     */
    var oldInitEventFun_sort = gridCompProto.initEventFun;
    var oldInitGridEventFun_sort = gridCompProto.initGridEventFun;

    Object.assign(gridCompProto, _re_gridCompSort.sortFunObj);
    gridCompProto.initEventFun = function () {
        // 执行原有方法
        oldInitEventFun_sort.apply(this, arguments);
        _re_gridCompSort.sortFunObj.sort_initEventFun.apply(this, arguments);
    };
    gridCompProto.initGridEventFun = function () {
        // 执行原有方法
        oldInitGridEventFun_sort.apply(this, arguments);
        _re_gridCompSort.sortFunObj.sort_initGridEventFun.apply(this, arguments);
    };

    /*
     * sumRow
     */

    Object.assign(gridCompProto, _re_gridCompSumRow.sumRowFunObj);

    /*
     * swap
     */
    var oldInitEventFun_swap = gridCompProto.initEventFun;
    var oldInitGridEventFun_swap = gridCompProto.initGridEventFun;

    Object.assign(gridCompProto, _re_gridCompSwap.swapFunObj);

    gridCompProto.initEventFun = function () {
        // 执行原有方法
        oldInitEventFun_swap.apply(this, arguments);
        _re_gridCompSwap.swapFunObj.swap_initEventFun.apply(this, arguments);
    };
    gridCompProto.initGridEventFun = function () {
        // 执行原有方法
        oldInitGridEventFun_swap.apply(this, arguments);
        _re_gridCompSwap.swapFunObj.swap_initGridEventFun.apply(this, arguments);
    };

    /*
     * rowDrag
     */

    // var oldInitEventFun_rowDrag= gridCompProto.initEventFun;
    var oldInitGridEventFun_rowDrag = gridCompProto.initGridEventFun;

    Object.assign(gridCompProto, _re_gridCompRowDrag.rowDragFunObj);

    gridCompProto.initGridEventFun = function () {
        // 执行原有方法
        oldInitGridEventFun_rowDrag.apply(this, arguments);
        _re_gridCompRowDrag.rowDragFunObj.rowDrag_initGridEventFun.apply(this, arguments);
    };

    /*
     * tree
     */


    Object.assign(gridCompProto, _re_gridCompTree.treeFunObj);

    exports.gridComp = gridComp;
});