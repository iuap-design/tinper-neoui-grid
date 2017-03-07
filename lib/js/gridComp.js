'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gridComp = undefined;

var _gridCompCreate = require('./gridCompCreate');

var _gridCompCreateCal = require('./gridCompCreateCal');

var _gridCompEvent = require('./gridCompEvent');

var _gridCompGet = require('./gridCompGet');

var _gridCompInit = require('./gridCompInit');

var _gridCompOperateRow = require('./gridCompOperateRow');

var _gridCompRenderType = require('./gridCompRenderType');

var _gridCompSet = require('./gridCompSet');

var _gridCompWDChange = require('./gridCompWDChange');

var _gridCompClick = require('./gridCompClick');

var _gridCompOther = require('./gridCompOther');

var _ut_utility = require('./ut_utility');

var _re_gridCompColMenu = require('./re_gridCompColMenu');

var _re_gridCompDrag = require('./re_gridCompDrag');

var _re_gridCompEdit = require('./re_gridCompEdit');

var _re_gridCompEditForm = require('./re_gridCompEditForm');

var _re_gridCompFixed = require('./re_gridCompFixed');

var _re_gridCompFormShow = require('./re_gridCompFormShow');

var _re_gridCompHeaderLevel = require('./re_gridCompHeaderLevel');

var _re_gridCompLocalStorage = require('./re_gridCompLocalStorage');

var _re_gridCompOverWidthHidden = require('./re_gridCompOverWidthHidden');

var _re_gridCompSort = require('./re_gridCompSort');

var _re_gridCompSumRow = require('./re_gridCompSumRow');

var _re_gridCompSwap = require('./re_gridCompSwap');

var _re_gridCompRowDrag = require('./re_gridCompRowDrag');

var _re_gridCompTree = require('./re_gridCompTree');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

Object.assign(gridCompProto, _re_gridCompTree.treeFunObj);

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