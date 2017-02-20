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
gridComp.prototype.formatWidth = _ut_utility.formatWidth;
gridComp.prototype.swapEle = _ut_utility.swapEle;
gridComp.prototype.getString = _ut_utility.getString;
gridComp.prototype.getInt = _ut_utility.getInt;
gridComp.prototype.getFloat = _ut_utility.getFloat;
gridComp.prototype.cloneObj = _ut_utility.cloneObj;
gridComp.prototype.DicimalFormater = _ut_utility.DicimalFormater;
gridComp.prototype.accAdd = _ut_utility.accAdd;
gridComp.prototype.getTrIndex = _ut_utility.getTrIndex;
gridComp.prototype.getDataTableRowIdByRow = _ut_utility.getDataTableRowIdByRow;

gridComp.prototype.updateLastRowFlag = _gridCompOther.updateLastRowFlag;
gridComp.prototype.updateNumColLastRowFlag = _gridCompOther.updateNumColLastRowFlag;
gridComp.prototype.columnsVisibleFun = _gridCompOther.columnsVisibleFun;
gridComp.prototype.resetThVariable = _gridCompOther.resetThVariable;
gridComp.prototype.resetThVariableDrag = _gridCompOther.resetThVariableDrag;
gridComp.prototype.resetThVariableHeaderLevel = _gridCompOther.resetThVariableHeaderLevel;
gridComp.prototype.headerFirstClassFun = _gridCompOther.headerFirstClassFun;
gridComp.prototype.setRenderType = _gridCompOther.setRenderType;
gridComp.prototype.setShowHeader = _gridCompOther.setShowHeader;
gridComp.prototype.setColumnPrecision = _gridCompOther.setColumnPrecision;
gridComp.prototype.setMultiSelect = _gridCompOther.setMultiSelect;
gridComp.prototype.setShowNumCol = _gridCompOther.setShowNumCol;
gridComp.prototype.isGridShow = _gridCompOther.isGridShow;
gridComp.prototype.getBoolean = _gridCompOther.getBoolean;

gridComp.prototype.isDblEvent = _gridCompClick.isDblEvent;
gridComp.prototype.dblClickFun = _gridCompClick.dblClickFun;
gridComp.prototype.clickFun = _gridCompClick.clickFun;
gridComp.prototype.clickFunTree = _gridCompClick.clickFunTree;
gridComp.prototype.clickFunEdit = _gridCompClick.clickFunEdit;

gridComp.prototype.createDivs = _gridCompCreate.createDivs;
gridComp.prototype.repaintDivs = _gridCompCreate.repaintDivs;
gridComp.prototype.createGridDivs = _gridCompCreate.createGridDivs;
gridComp.prototype.repaintGridDivs = _gridCompCreate.repaintGridDivs;
gridComp.prototype.createColumnMenu = _gridCompCreate.createColumnMenu;
gridComp.prototype.createHeader = _gridCompCreate.createHeader;
gridComp.prototype.createHeaderTable = _gridCompCreate.createHeaderTable;
gridComp.prototype.createHeaderTableFixed = _gridCompCreate.createHeaderTableFixed;
gridComp.prototype.createHeaderDrag = _gridCompCreate.createHeaderDrag;
gridComp.prototype.createColgroup = _gridCompCreate.createColgroup;
gridComp.prototype.createThead = _gridCompCreate.createThead;
gridComp.prototype.createContent = _gridCompCreate.createContent;
gridComp.prototype.createContentSumRow = _gridCompCreate.createContentSumRow;
gridComp.prototype.createContentLeft = _gridCompCreate.createContentLeft;
gridComp.prototype.createContentLeftMultiSelectRow = _gridCompCreate.createContentLeftMultiSelectRow;
gridComp.prototype.createContentLeftNumColRow = _gridCompCreate.createContentLeftNumColRow;
gridComp.prototype.createContentTable = _gridCompCreate.createContentTable;
gridComp.prototype.createContentTableFixed = _gridCompCreate.createContentTableFixed;
gridComp.prototype.createNoRowsDiv = _gridCompCreate.createNoRowsDiv;
gridComp.prototype.createContentRows = _gridCompCreate.createContentRows;
gridComp.prototype.createContentRowsSumRow = _gridCompCreate.createContentRowsSumRow;
gridComp.prototype.createContentOneRow = _gridCompCreate.createContentOneRow;
gridComp.prototype.createContentOneRowForIE = _gridCompCreate.createContentOneRowForIE;
gridComp.prototype.repaintRow = _gridCompCreate.repaintRow;
gridComp.prototype.createContentOneRowTd = _gridCompCreate.createContentOneRowTd;
gridComp.prototype.createContentOneRowTdForIE = _gridCompCreate.createContentOneRowTdForIE;
gridComp.prototype.repairContent = _gridCompCreate.repairContent;

gridComp.prototype.trHoverFun = _gridCompCreateCal.trHoverFun;
gridComp.prototype.setIntervalFun = _gridCompCreateCal.setIntervalFun;
gridComp.prototype.editorRowChangeFun = _gridCompCreateCal.editorRowChangeFun;
gridComp.prototype.afterGridDivsCreate = _gridCompCreateCal.afterGridDivsCreate;
gridComp.prototype.countRowHeight = _gridCompCreateCal.countRowHeight;
gridComp.prototype.noRowsShowFun = _gridCompCreateCal.noRowsShowFun;
gridComp.prototype.afterRepaintGrid = _gridCompCreateCal.afterRepaintGrid;
gridComp.prototype.resetScrollLeft = _gridCompCreateCal.resetScrollLeft;
gridComp.prototype.hideEditMenu = _gridCompCreateCal.hideEditMenu;
gridComp.prototype.resetLeftHeight = _gridCompCreateCal.resetLeftHeight;

gridComp.prototype.initEventFun = _gridCompEvent.initEventFun;
gridComp.prototype.initGridEventFun = _gridCompEvent.initGridEventFun;
gridComp.prototype.initContentDivEventFun = _gridCompEvent.initContentDivEventFun;

gridComp.prototype.getColumnAttr = _gridCompGet.getColumnAttr;
gridComp.prototype.getColumnByField = _gridCompGet.getColumnByField;
gridComp.prototype.getIndexOfColumn = _gridCompGet.getIndexOfColumn;
gridComp.prototype.getVisibleIndexOfColumn = _gridCompGet.getVisibleIndexOfColumn;
gridComp.prototype.getNextVisibleInidexOfColumn = _gridCompGet.getNextVisibleInidexOfColumn;
gridComp.prototype.getSelectRows = _gridCompGet.getSelectRows;
gridComp.prototype.getSelectRowsIndex = _gridCompGet.getSelectRowsIndex;
gridComp.prototype.getFocusRow = _gridCompGet.getFocusRow;
gridComp.prototype.getFocusRowIndex = _gridCompGet.getFocusRowIndex;
gridComp.prototype.getAllRows = _gridCompGet.getAllRows;
gridComp.prototype.getRowByIndex = _gridCompGet.getRowByIndex;
gridComp.prototype.getRowIndexByValue = _gridCompGet.getRowIndexByValue;
gridComp.prototype.getChildRowIndex = _gridCompGet.getChildRowIndex;
gridComp.prototype.getColumnByVisibleIndex = _gridCompGet.getColumnByVisibleIndex;

gridComp.prototype.init = _gridCompInit.init;
gridComp.prototype.getBooleanOptions = _gridCompInit.getBooleanOptions;
gridComp.prototype.initDefault = _gridCompInit.initDefault;
gridComp.prototype.initGrid = _gridCompInit.initGrid;
gridComp.prototype.destroySelf = _gridCompInit.destroySelf;
gridComp.prototype.initOptions = _gridCompInit.initOptions;
gridComp.prototype.initOptionsTree = _gridCompInit.initOptionsTree;
gridComp.prototype.initVariable = _gridCompInit.initVariable;
gridComp.prototype.initDataSourceVariable = _gridCompInit.initDataSourceVariable;
gridComp.prototype.initWidthVariable = _gridCompInit.initWidthVariable;
gridComp.prototype.initGridCompColumn = _gridCompInit.initGridCompColumn;
gridComp.prototype.initGridCompColumnVar = _gridCompInit.initGridCompColumnVar;
gridComp.prototype.initGridCompColumnFun = _gridCompInit.initGridCompColumnFun;
gridComp.prototype.initGridCompColumnColumnMenuFun = _gridCompInit.initGridCompColumnColumnMenuFun;
gridComp.prototype.initGridCompColumnHeaderLevelFun = _gridCompInit.initGridCompColumnHeaderLevelFun;
gridComp.prototype.initGridCompColumnLoacl = _gridCompInit.initGridCompColumnLoacl;
gridComp.prototype.initGridHiddenLevelColumn = _gridCompInit.initGridHiddenLevelColumn;
gridComp.prototype.initGridCompFixedColumn = _gridCompInit.initGridCompFixedColumn;
gridComp.prototype.setRequired = _gridCompInit.setRequired;
gridComp.prototype.initDataSource = _gridCompInit.initDataSource;

gridComp.prototype.addOneRow = _gridCompOperateRow.addOneRow;
gridComp.prototype.addOneRowTree = _gridCompOperateRow.addOneRowTree;
gridComp.prototype.addOneRowTreeHasChildF = _gridCompOperateRow.addOneRowTreeHasChildF;
gridComp.prototype.editClose = _gridCompOperateRow.editClose;
gridComp.prototype.addRows = _gridCompOperateRow.addRows;
gridComp.prototype.createContentOneRowFixed = _gridCompOperateRow.createContentOneRowFixed;
gridComp.prototype.updateEditRowIndex = _gridCompOperateRow.updateEditRowIndex;
gridComp.prototype.deleteOneRow = _gridCompOperateRow.deleteOneRow;
gridComp.prototype.repairSumRow = _gridCompOperateRow.repairSumRow;
gridComp.prototype.deleteOneRowTree = _gridCompOperateRow.deleteOneRowTree;
gridComp.prototype.deleteRows = _gridCompOperateRow.deleteRows;
gridComp.prototype.updateRow = _gridCompOperateRow.updateRow;
gridComp.prototype.updateValueAt = _gridCompOperateRow.updateValueAt;
gridComp.prototype.updateValueAtTree = _gridCompOperateRow.updateValueAtTree;
gridComp.prototype.updateValueAtEdit = _gridCompOperateRow.updateValueAtEdit;
gridComp.prototype.setRowSelect = _gridCompOperateRow.setRowSelect;
gridComp.prototype.setRowUnselect = _gridCompOperateRow.setRowUnselect;
gridComp.prototype.setAllRowSelect = _gridCompOperateRow.setAllRowSelect;
gridComp.prototype.setAllRowUnSelect = _gridCompOperateRow.setAllRowUnSelect;
gridComp.prototype.setRowFocus = _gridCompOperateRow.setRowFocus;
gridComp.prototype.setRowUnFocus = _gridCompOperateRow.setRowUnFocus;
gridComp.prototype.resetNumCol = _gridCompOperateRow.resetNumCol;
gridComp.prototype.isCheckedHeaderRow = _gridCompOperateRow.isCheckedHeaderRow;

gridComp.prototype.renderTypeFun = _gridCompRenderType.renderTypeFun;
gridComp.prototype.renderTypeByColumn = _gridCompRenderType.renderTypeByColumn;
gridComp.prototype.renderTypeSumRow = _gridCompRenderType.renderTypeSumRow;
gridComp.prototype.getRenderOverFlag = _gridCompRenderType.getRenderOverFlag;

gridComp.prototype.setColumnVisibleByColumn = _gridCompSet.setColumnVisibleByColumn;
gridComp.prototype.setColumnVisibleByIndex = _gridCompSet.setColumnVisibleByIndex;
gridComp.prototype.setCoulmnWidthByField = _gridCompSet.setCoulmnWidthByField;
gridComp.prototype.setColumnWidth = _gridCompSet.setColumnWidth;
gridComp.prototype.setDataSource = _gridCompSet.setDataSource;
gridComp.prototype.setDataSourceFun1 = _gridCompSet.setDataSourceFun1;

gridComp.prototype.widthChangeFun = _gridCompWDChange.widthChangeFun;
gridComp.prototype.widthChangeGridFun = _gridCompWDChange.widthChangeGridFun;
gridComp.prototype.widthChangeGridFunFixed = _gridCompWDChange.widthChangeGridFunFixed;
gridComp.prototype.widthChangeGridFunOverWidthHidden = _gridCompWDChange.widthChangeGridFunOverWidthHidden;
gridComp.prototype.heightChangeFun = _gridCompWDChange.heightChangeFun;
gridComp.prototype.contentWidthChange = _gridCompWDChange.contentWidthChange;
gridComp.prototype.noScrollWidthReset = _gridCompWDChange.noScrollWidthReset;

var gridCompProto = gridComp.prototype;

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


gridCompProto.createHeaderDrag = _re_gridCompDrag.re_createHeaderDrag;
gridCompProto.initEventFun = function () {
  // 执行原有方法
  oldInitEventFun_grag.apply(this, arguments);
  _re_gridCompDrag.drag_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function () {
  // 执行原有方法
  oldInitGridEventFun_grag.apply(this, arguments);
  _re_gridCompDrag.drag_initGridEventFun.apply(this, arguments);
};
gridCompProto.dragStart = _re_gridCompDrag.dragStart;
gridCompProto.dragFun = _re_gridCompDrag.dragFun;
gridCompProto.dragEnd = _re_gridCompDrag.dragEnd;
if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
  gridCompProto.saveGridCompColumnArrToLocal = function () {};
}
gridCompProto.headerThDrag = _re_gridCompDrag.headerThDrag;
gridCompProto.resetThVariableDrag = _re_gridCompDrag.re_resetThVariableDrag;

/*
 * edit
 */
var oldInitEventFun_edit = gridCompProto.initEventFun;


gridCompProto.hideEditMenu = _re_gridCompEdit.re_hideEditMenu;
gridCompProto.clickFunEdit = _re_gridCompEdit.re_clickFunEdit;
gridCompProto.editRowFun = _re_gridCompEdit.editRowFun;
gridCompProto.editRowIndexFun = _re_gridCompEdit.editRowIndexFun;
gridCompProto.editRow = _re_gridCompEdit.editRow;
gridCompProto.editClose = _re_gridCompEdit.re_editClose;
gridCompProto.editCell = _re_gridCompEdit.editCell;
gridCompProto.nextEditShow = _re_gridCompEdit.nextEditShow;
gridCompProto.editValueChange = _re_gridCompEdit.editValueChange;
if (typeof gridCompProto.formEditCell == 'undefined') {
  gridCompProto.formEditCell = function () {};
};
gridCompProto.updateEditRowIndex = _re_gridCompEdit.re_updateEditRowIndex;
gridCompProto.updateValueAtEdit = _re_gridCompEdit.re_updateValueAtEdit;
gridCompProto.setEditType = _re_gridCompEdit.setEditType;
gridCompProto.setEditable = _re_gridCompEdit.setEditable;
gridCompProto.setColumnEdit = _re_gridCompEdit.setColumnEdit;
gridCompProto.editFieldIcon = _re_gridCompEdit.editFieldIcon;
gridCompProto.initEventFun = function () {
  // 执行原有方法
  oldInitEventFun_edit.apply(this, arguments);
  _re_gridCompEdit.edit_initEventFun.apply(this, arguments);
};
gridCompProto.setGridEditType = _re_gridCompEdit.setGridEditType;
gridCompProto.setGridEditTypeAndEditRow = _re_gridCompEdit.setGridEditTypeAndEditRow;
gridCompProto.editHeadTitleIcon = _re_gridCompEdit.editHeadTitleIcon;

/*
 * editForm
 */
var oldInitDefault = gridCompProto.initDefault,
    oldSetRequired = gridCompProto.setRequired;


gridCompProto.initDefault = function () {
  // 执行原有方法
  oldInitDefault.apply(this, arguments);
  _re_gridCompEditForm.editForm_initDefault.apply(this, arguments);
};
gridCompProto.setRequired = function () {
  // 执行原有方法
  oldSetRequired.apply(this, arguments);
  _re_gridCompEditForm.editForm_setRequired.apply(this, arguments);
};
gridCompProto.editorRowChangeFun = _re_gridCompEditForm.re_editorRowChangeFun;
gridCompProto.formEditCell = _re_gridCompEditForm.formEditCell;

/*
 * fixed
 */
var oldColumnsVisibleFun = gridCompProto.columnsVisibleFun;


gridCompProto.initGridCompFixedColumn = _re_gridCompFixed.re_initGridCompFixedColumn;
gridCompProto.columnsVisibleFun = function () {
  // 执行原有方法
  oldColumnsVisibleFun.apply(this, arguments);
  _re_gridCompFixed.fixed_columnsVisibleFun.apply(this, arguments);
};
gridCompProto.createHeaderTableFixed = _re_gridCompFixed.re_createHeaderTableFixed;
gridCompProto.createContentTableFixed = _re_gridCompFixed.re_createContentTableFixed;
gridCompProto.createContentOneRowFixed = _re_gridCompFixed.re_createContentOneRowFixed;
gridCompProto.widthChangeGridFunFixed = _re_gridCompFixed.re_widthChangeGridFunFixed;

/*
 * formShow
 */


gridCompProto.createFromDivs = _re_gridCompFormShow.createFromDivs;
gridCompProto.createFromContent = _re_gridCompFormShow.createFromContent;
gridCompProto.createFormContentRows = _re_gridCompFormShow.createFormContentRows;
gridCompProto.widthChangeFormFun = gridCompProto;

/*
 * headerLevel
 */


gridCompProto.resetThVariableHeaderLevel = _re_gridCompHeaderLevel.re_resetThVariableHeaderLevel;
gridCompProto.initGridCompColumnHeaderLevelFun = _re_gridCompHeaderLevel.re_initGridCompColumnHeaderLevelFun;
// gridCompProto.initGridHiddenLevelColumn = initGridHiddenLevelColumn;
gridCompProto.getLevelTitleByField = _re_gridCompHeaderLevel.getLevelTitleByField;

/*
 * localStorage
 */


gridCompProto.initGridCompColumnLoacl = _re_gridCompLocalStorage.re_initGridCompColumnLoacl;
gridCompProto.getLocalData = _re_gridCompLocalStorage.getLocalData;
gridCompProto.saveLocalData = _re_gridCompLocalStorage.saveLocalData;
gridCompProto.clearLocalData = _re_gridCompLocalStorage.clearLocalData;
gridCompProto.saveGridCompColumnArrToLocal = _re_gridCompLocalStorage.saveGridCompColumnArrToLocal;
gridCompProto.getGridCompColumnArrFromLocal = _re_gridCompLocalStorage.getGridCompColumnArrFromLocal;

/*
 * overWidthColumn
 */


gridCompProto.initGridHiddenLevelColumn = _re_gridCompOverWidthHidden.re_initGridHiddenLevelColumn;
gridCompProto.widthChangeGridFunOverWidthHidden = _re_gridCompOverWidthHidden.re_widthChangeGridFunOverWidthHidden;

/*
 * sort
 */
var oldInitEventFun_sort = gridCompProto.initEventFun;
var oldInitGridEventFun_sort = gridCompProto.initGridEventFun;


gridCompProto.initEventFun = function () {
  // 执行原有方法
  oldInitEventFun_sort.apply(this, arguments);
  _re_gridCompSort.sort_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function () {
  // 执行原有方法
  oldInitGridEventFun_sort.apply(this, arguments);
  _re_gridCompSort.sort_initGridEventFun.apply(this, arguments);
};
gridCompProto.canSortable = _re_gridCompSort.canSortable;
gridCompProto.deleteOneRowTree = _re_gridCompSort.re_deleteOneRowTree;
gridCompProto.sortRowsByPrio = _re_gridCompSort.sortRowsByPrio;

/*
 * sumRow
 */


gridCompProto.createContentRowsSumRow = _re_gridCompSumRow.re_createContentRowsSumRow;
gridCompProto.createContentSumRow = _re_gridCompSumRow.re_createContentSumRow;
gridCompProto.createSumRow = _re_gridCompSumRow.createSumRow;
gridCompProto.createSumRowForIE = _re_gridCompSumRow.createSumRowForIE;
gridCompProto.repairSumRow = _re_gridCompSumRow.re_repairSumRow;
gridCompProto.renderSumRow = _re_gridCompSumRow.renderSumRow;
gridCompProto.renderTypeSumRow = _re_gridCompSumRow.re_renderTypeSumRow;

/*
 * swap
 */
var oldInitEventFun_swap = gridCompProto.initEventFun;
var oldInitGridEventFun_swap = gridCompProto.initGridEventFun;


gridCompProto.initEventFun = function () {
  // 执行原有方法
  oldInitEventFun_swap.apply(this, arguments);
  _re_gridCompSwap.swap_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function () {
  // 执行原有方法
  oldInitGridEventFun_swap.apply(this, arguments);
  _re_gridCompSwap.swap_initGridEventFun.apply(this, arguments);
};

gridCompProto.swapColumnStart = _re_gridCompSwap.swapColumnStart;
gridCompProto.swapColumnFun = _re_gridCompSwap.swapColumnFun;
gridCompProto.swapColumnEnd = _re_gridCompSwap.swapColumnEnd;

/*
 * rowDrag
 */

// var oldInitEventFun_rowDrag= gridCompProto.initEventFun;
var oldInitGridEventFun_rowDrag = gridCompProto.initGridEventFun;


gridCompProto.initGridEventFun = function () {
  // 执行原有方法
  oldInitGridEventFun_rowDrag.apply(this, arguments);
  _re_gridCompRowDrag.rowDrag_initGridEventFun.apply(this, arguments);
};

gridCompProto.rowDragStart = _re_gridCompRowDrag.rowDragStart;
gridCompProto.rowDragFun = _re_gridCompRowDrag.rowDragFun;
gridCompProto.rowDragEnd = _re_gridCompRowDrag.rowDragEnd;
gridCompProto.setRowDrag = _re_gridCompRowDrag.setRowDrag;

/*
 * tree
 */


gridCompProto.initOptionsTree = _re_gridCompTree.re_initOptionsTree;
gridCompProto.clickFunTree = _re_gridCompTree.re_clickFunTree;
gridCompProto.addOneRowTree = _re_gridCompTree.re_addOneRowTree;
gridCompProto.addOneRowTreeHasChildF = _re_gridCompTree.re_addOneRowTreeHasChildF;
gridCompProto.updateValueAtTree = _re_gridCompTree.re_updateValueAtTree;
gridCompProto.getAllChildRow = _re_gridCompTree.getAllChildRow;
gridCompProto.getChildRowIndex = _re_gridCompTree.re_getChildRowIndex;
gridCompProto.getAllChildRowIndex = _re_gridCompTree.getAllChildRowIndex;
gridCompProto.getAllChildRowFun = _re_gridCompTree.getAllChildRowFun;
gridCompProto.getAllChildRowIndexFun = _re_gridCompTree.getAllChildRowIndexFun;
gridCompProto.expandNode = _re_gridCompTree.expandNode;
gridCompProto.expandNodeByIndex = _re_gridCompTree.expandNodeByIndex;

exports.gridComp = gridComp;