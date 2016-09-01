import {
	createDivs,
	repaintDivs,
	createGridDivs,
	repaintGridDivs,
	createColumnMenu,
    createHeader,
    createHeaderTable,
    createHeaderTableFixed,
    createHeaderDrag,
    createColgroup,
    createThead,
    createContent,
    createContentSumRow,
    createContentLeft,
    createContentLeftMultiSelectRow,
    createContentLeftNumColRow,
    createContentTable,
    createContentTableFixed,
    createNoRowsDiv,
    createContentRows,
    createContentRowsSumRow,
    createContentOneRow,
    createContentOneRowForIE,
    repaintRow,
    createContentOneRowTd,
    createContentOneRowTdForIE,
    repairContent
} from './gridCompCreate';

import {
	trHoverFun,
    setIntervalFun,
    editorRowChangeFun,
    afterGridDivsCreate,
    countRowHeight,
    noRowsShowFun,
    afterRepaintGrid,
    resetScrollLeft,
    hideEditMenu
} from './gridCompCreateCal';

import {
	initEventFun,
    initGridEventFun,
    initContentDivEventFun
} from './gridCompEvent';

import {
	getColumnAttr,
    getColumnByField,
    getIndexOfColumn,
    getVisibleIndexOfColumn,
    getNextVisibleInidexOfColumn,
    getSelectRows,
    getSelectRowsIndex,
    getFocusRow,
    getFocusRowIndex,
    getAllRows,
    getRowByIndex,
    getRowIndexByValue
} from './gridCompGet';

import {
	init,
    getBooleanOptions,
    initDefault,
    initGrid,
    destroySelf,
    initOptions,
    initOptionsTree,
    initVariable,
    initDataSourceVariable,
    initWidthVariable,
    initGridCompColumn,
    initGridCompColumnVar,
    initGridCompColumnFun,
    initGridCompColumnColumnMenuFun,
    initGridCompColumnHeaderLevelFun,
    initGridCompColumnLoacl,
    initGridHiddenLevelColumn,
    initGridCompFixedColumn,
    setRequired,
    initDataSource
} from './gridCompInit';

import {
	addOneRow,
    addOneRowTree,
    addOneRowTreeHasChildF,
    editClose,
    addRows,
    createContentOneRowFixed,
    updateEditRowIndex,
    deleteOneRow,
    repairSumRow,
    deleteOneRowTree,
    deleteRows,
    updateRow,
    updateValueAt,
    updateValueAtTree,
    updateValueAtEdit,
    setRowSelect,
    setRowUnselect,
    setAllRowSelect,
    setAllRowUnSelect,
    setRowFocus,
    setRowUnFocus,
    resetNumCol
} from './gridCompOperateRow';

import {
	renderTypeFun,
    renderTypeByColumn,
    renderTypeSumRow
} from './gridCompRenderType';

import {
	setColumnVisibleByColumn,
    setColumnVisibleByIndex,
    setCoulmnWidthByField,
    setColumnWidth,
    setDataSource,
    setDataSourceFun1
} from './gridCompSet';

import {
	widthChangeFun,
    widthChangeGridFun,
    widthChangeGridFunFixed,
    widthChangeGridFunOverWidthHidden,
    heightChangeFun,
    contentWidthChange
} from './gridCompWDChange';

import{
    updateLastRowFlag,
    updateNumColLastRowFlag,
    columnsVisibleFun,
    resetThVariable,
    resetThVariableDrag,
    resetThVariableHeaderLevel,
    headerFirstClassFun,
    setRenderType,
    setShowHeader,
    setColumnPrecision,
    setMultiSelect,
    setShowNumCol,
    isGridShow,
    getBoolean
} from './gridCompOther';

import{
    formatWidth,
    swapEle,
    getString,
    getInt,
    getFloat,
    cloneObj,
    DicimalFormater,
    accAdd,
    getTrIndex
} from './ut_utility';

class gridComp{
    constructor(ele, options){

		this.formatWidth = formatWidth;
		this.swapEle = swapEle;
		this.getString = getString;
		this.getInt = getInt;
		this.getFloat = getFloat;
		this.cloneObj = cloneObj;
		this.DicimalFormater = DicimalFormater;
		this.accAdd = accAdd;
		this.getTrIndex = getTrIndex;


		this.updateLastRowFlag = updateLastRowFlag;
		this.updateNumColLastRowFlag = updateNumColLastRowFlag;
		this.columnsVisibleFun = columnsVisibleFun;
		this.resetThVariable = resetThVariable;
		this.resetThVariableDrag = resetThVariableDrag;
		this.resetThVariableHeaderLevel = resetThVariableHeaderLevel;
		this.headerFirstClassFun = headerFirstClassFun;
		this.setRenderType = setRenderType;
		this.setShowHeader = setShowHeader;
		this.setColumnPrecision = setColumnPrecision;
		this.setMultiSelect = setMultiSelect;
		this.setShowNumCol = setShowNumCol;
		this.isGridShow = isGridShow;
		this.getBoolean = getBoolean;


		this.createDivs = createDivs;
		this.repaintDivs = repaintDivs;
		this.createGridDivs = createGridDivs;
		this.repaintGridDivs = repaintGridDivs;
		this.createColumnMenu = createColumnMenu;
		this.createHeader = createHeader;
		this.createHeaderTable = createHeaderTable;
		this.createHeaderTableFixed = createHeaderTableFixed;
		this.createHeaderDrag = createHeaderDrag;
		this.createColgroup = createColgroup;
		this.createThead = createThead;
		this.createContent = createContent;
		this.createContentSumRow = createContentSumRow;
		this.createContentLeft = createContentLeft;
		this.createContentLeftMultiSelectRow = createContentLeftMultiSelectRow;
		this.createContentLeftNumColRow = createContentLeftNumColRow;
		this.createContentTable = createContentTable;
		this.createContentTableFixed = createContentTableFixed;
		this.createNoRowsDiv = createNoRowsDiv;
		this.createContentRows = createContentRows;
		this.createContentRowsSumRow = createContentRowsSumRow;
		this.createContentOneRow = createContentOneRow;
		this.createContentOneRowForIE = createContentOneRowForIE;
		this.repaintRow = repaintRow;
		this.createContentOneRowTd = createContentOneRowTd;
		this.createContentOneRowTdForIE = createContentOneRowTdForIE;
		this.repairContent = repairContent;


		this.trHoverFun = trHoverFun;
		this.setIntervalFun = setIntervalFun;
		this.editorRowChangeFun = editorRowChangeFun;
		this.afterGridDivsCreate = afterGridDivsCreate;
		this.countRowHeight = countRowHeight;
		this.noRowsShowFun = noRowsShowFun;
		this.afterRepaintGrid = afterRepaintGrid;
		this.resetScrollLeft = resetScrollLeft;
		this.hideEditMenu = hideEditMenu;


		this.initEventFun = initEventFun;
		this.initGridEventFun = initGridEventFun;
		this.initContentDivEventFun = initContentDivEventFun;


		this.getColumnAttr = getColumnAttr;
		this.getColumnByField = getColumnByField;
		this.getIndexOfColumn = getIndexOfColumn;
		this.getVisibleIndexOfColumn = getVisibleIndexOfColumn;
		this.getNextVisibleInidexOfColumn = getNextVisibleInidexOfColumn;
		this.getSelectRows = getSelectRows;
		this.getSelectRowsIndex = getSelectRowsIndex;
		this.getFocusRow = getFocusRow;
		this.getFocusRowIndex = getFocusRowIndex;
		this.getAllRows = getAllRows;
		this.getRowByIndex = getRowByIndex;
		this.getRowIndexByValue = getRowIndexByValue;


		this.init = init;
		this.getBooleanOptions = getBooleanOptions;
		this.initDefault = initDefault;
		this.initGrid = initGrid;
		this.destroySelf = destroySelf;
		this.initOptions = initOptions;
		this.initOptionsTree = initOptionsTree;
		this.initVariable = initVariable;
		this.initDataSourceVariable = initDataSourceVariable;
		this.initWidthVariable = initWidthVariable;
		this.initGridCompColumn = initGridCompColumn;
		this.initGridCompColumnVar = initGridCompColumnVar;
		this.initGridCompColumnFun = initGridCompColumnFun;
		this.initGridCompColumnColumnMenuFun = initGridCompColumnColumnMenuFun;
		this.initGridCompColumnHeaderLevelFun = initGridCompColumnHeaderLevelFun;
		this.initGridCompColumnLoacl = initGridCompColumnLoacl;
		this.initGridHiddenLevelColumn = initGridHiddenLevelColumn;
		this.initGridCompFixedColumn = initGridCompFixedColumn;
		this.setRequired = setRequired;
		this.initDataSource = initDataSource;



		this.addOneRow = addOneRow;
		this.addOneRowTree = addOneRowTree;
		this.addOneRowTreeHasChildF = addOneRowTreeHasChildF;
		this.editClose = editClose;
		this.addRows = addRows;
		this.createContentOneRowFixed = createContentOneRowFixed;
		this.updateEditRowIndex = updateEditRowIndex;
		this.deleteOneRow = deleteOneRow;
		this.repairSumRow = repairSumRow;
		this.updateEditRowIndex = updateEditRowIndex;
		this.deleteOneRowTree = deleteOneRowTree;
		this.deleteRows = deleteRows;
		this.updateRow = updateRow;
		this.updateValueAt = updateValueAt;
		this.updateValueAtTree = updateValueAtTree;
		this.updateValueAtEdit = updateValueAtEdit;
		this.setRowSelect = setRowSelect;
		this.setRowUnselect = setRowUnselect;
		this.setAllRowUnSelect = setAllRowUnSelect;
		this.setRowFocus = setRowFocus;
		this.setRowUnFocus = setRowUnFocus;
		this.resetNumCol = resetNumCol;


		this.renderTypeFun = renderTypeFun;
		this.renderTypeByColumn = renderTypeByColumn;
		this.renderTypeSumRow = renderTypeSumRow;


		this.setColumnVisibleByColumn = setColumnVisibleByColumn;
		this.setColumnVisibleByIndex = setColumnVisibleByIndex;
		this.setCoulmnWidthByField = setCoulmnWidthByField;
		this.setColumnWidth = setColumnWidth;
		this.setDataSource = setDataSource;
		this.setDataSourceFun1 = setDataSourceFun1;


		this.widthChangeFun = widthChangeFun;
		this.widthChangeGridFun = widthChangeGridFun;
		this.widthChangeGridFunFixed = widthChangeGridFunFixed;
		this.widthChangeGridFunOverWidthHidden = widthChangeGridFunOverWidthHidden;
		this.heightChangeFun = heightChangeFun;
        this.contentWidthChange = contentWidthChange;


		this.init(ele,options);
		this.initGrid();

    }
	//todo

};

export{gridComp}
