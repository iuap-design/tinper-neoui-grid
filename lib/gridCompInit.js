import { gridBrowser } from './gridBrowser';

import { dataSource } from './dataSource';
import { column as gridCompColumn } from './column';

/*
 * 处理参数
 */
var init = function init(ele, options) {
    this.dataSource = dataSource;
    this.gridCompColumn = gridCompColumn;
    this.ele = ele[0];
    this.$ele = ele;
    this.initDefault();
    this.options = $.extend({}, this.defaults, options);
    this.getBooleanOptions();
    this.transDefault = {
        ml_show_column: '显示/隐藏列',
        ml_clear_set: '清除设置',
        ml_no_rows: '无数据',
        ml_sum: '合计:',
        ml_group_sum: '小计:',
        ml_close: '关闭'
    };
    this.transMap = $.extend({}, this.transDefault, options.transMap);
    this.gridCompColumnFixedArr = new Array();
    this.gridCompColumnArr = new Array(); // 存储设置默认值之后的columns对象
    // this.headerHeight = 45; // header区域高度
    this.countContentHeight = true; // 是否计算内容区的高度（是否为流式）
    this.minColumnWidth = 80; // 最小列宽
    this.scrollBarHeight = 16; // 滚动条高度
    this.numWidth = this.options.numWidth || 40; // 数字列宽度
    this.multiSelectWidth = this.options.multiSelectWidth || 40; // 复选框列宽度

    this.basicGridCompColumnArr = new Array(); // 存储基本的columns对象，用于清除设置
    this.columnMenuWidth = 160; // column menu的宽度
    this.columnMenuHeight = 33; // column menu的高度
    this.gridCompColumnFixedArr = new Array(); // 存储设置默认值之后的固定列columns对象
    this.gridCompLevelColumn = new Array(); // 存储多级表头时的多级
    this.baseHeaderHeight = this.options.headerHeight || 44;
    this.headerHeight = this.baseHeaderHeight * parseInt(this.options.maxHeaderLevel) + 1;
    this.gridCompHiddenLevelColumnArr = new Array(); // 存储自动隐藏时隐藏优先级排序后的column
    this.treeLeft = 10; // 树表时每一级之间的差值
    this.overWidthVisibleColumnArr = new Array(); // 超出定义宽度的column集合
};
var getBooleanOptions = function getBooleanOptions() {
    this.options.cancelFocus = this.getBoolean(this.options.cancelFocus);
    this.options.showHeader = this.getBoolean(this.options.showHeader);
    this.options.showNumCol = this.getBoolean(this.options.showNumCol);
    this.options.multiSelect = this.getBoolean(this.options.multiSelect);
    this.options.columnMenu = this.getBoolean(this.options.columnMenu);
    this.options.canDrag = this.getBoolean(this.options.canDrag);
    this.options.overWidthHiddenColumn = this.getBoolean(this.options.overWidthHiddenColumn);
    this.options.sortable = this.getBoolean(this.options.sortable);
    this.options.showSumRow = this.getBoolean(this.options.showSumRow);
    this.options.sumRowFirst = this.getBoolean(this.options.sumRowFirst);
    this.options.canSwap = this.getBoolean(this.options.canSwap);
    this.options.showTree = this.getBoolean(this.options.showTree);
    this.options.autoExpand = this.getBoolean(this.options.autoExpand);
    this.options.needTreeSort = this.getBoolean(this.options.needTreeSort);
    this.options.needLocalStorage = this.getBoolean(this.options.needLocalStorage);
    this.options.noScroll = this.getBoolean(this.options.noScroll);
    this.options.cancelSelect = this.getBoolean(this.options.cancelSelect);
    this.options.contentSelect = this.getBoolean(this.options.contentSelect);
    this.options.contentFocus = this.getBoolean(this.options.contentFocus);
    this.options.needResetHeight = this.getBoolean(this.options.needResetHeight);
    this.options.treeAsync = this.getBoolean(this.options.treeAsync);
    this.options.heightAuto = this.getBoolean(this.options.heightAuto);
};
/*
 * 初始化默认参数
 */
var initDefault = function initDefault() {
    this.defaults = {
        id: new Date().valueOf(),
        editType: 'default',
        cancelFocus: true, // 第二次点击是否取消focus
        cancelSelect: true, // 第二次点击是否取消select
        showHeader: true, // 是否显示表头
        showNumCol: false, // 是否显示数字列
        multiSelect: false, // 是否显示复选框
        columnMenu: true, // 是否存在列头操作按钮
        canDrag: true, // 是否可以拖动
        // formMaxWidth: 300, // 整体宽度小于某一值之后以form展示
        formMaxWidth: 0,
        maxHeaderLevel: 1, // header的最高层级，用于计算header区域的高度
        overWidthHiddenColumn: false, // 宽度不足时是否自动隐藏column
        sortable: true, // 是否可以排序
        showSumRow: false, // 是否显示合计行
        sumRowFirst: false, // 合计行是否显示在第一行，true表示显示在第一行，false表示显示在最后一行
        sumRowFixed: false, //合计行是否固定在头部，不随滚动条滚动
        canSwap: true, // 是否可以交换列位置
        showTree: false, // 是否显示树表
        autoExpand: true, // 是否默认展开
        needTreeSort: false, // 是否需要对传入数据进行排序，此设置为优化性能，如果传入数据是无序的则设置为true，如果可以保证先传入父节点后传入子节点则设置为false提高性能
        needLocalStorage: false, // 是否使用前端缓存
        noScroll: false, // 是否显示滚动条,宽度设置百分比的话不显示滚动条
        contentSelect: true, // 点击内容区是否执行选中逻辑
        showEditIcon: false, // 是否显示编辑图标
        contentFocus: true, // 点击内容区是否执行focus逻辑
        fixedFloat: 'left',
        groupField: '', // 是否按照某字段进行分组显示
        groupSumRow: false, //是否显示分组小计
        rowHeight: 44, // 行高
        columnMenuType: 'base', // border表示存在边线
        needResetHeight: false, // 是否需要根据右侧内容高度调整左侧高度，目前为false，后续提供方案之后再处理此参数
        treeAsync: false, //树表异步加载数据
        heightAuto: false // 内容自动撑高
        // sumRowHeight 合计行行高
        // headerHeight 表头高
        // maxHeight heightAuto为true时的最大高度
    };
};
/*
 * 创建grid
 */
var initGrid = function initGrid() {
    if (!this.options.columns || this.options.columns.length == 0) {
        return;
    }
    var oThis = this;
    this.initOptions();
    this.initVariable();
    this.initWidthVariable();
    this.initGridCompColumn();
    this.initDataSource();
    this.createDivs();
    // UAP-NC 轻量化项目：切换tab时添加form会消失问题
    this.inte = setInterval(function () {
        oThis.setIntervalFun.call(oThis);
    }, 300);
};
/*
 * 销毁自身
 */
var destroySelf = function destroySelf() {
    clearInterval(this.inte);
    this.$ele.data('gridComp', null);
    this.ele.innerHTML = '';
    this.showTree = '';
    this.showType = '';
};
/*
 * 对传入参数进行格式化处理
 * 宽度、高度处理
 * 左侧区域宽度计算
 * 除去内容区域的高度
 */
var initOptions = function initOptions() {
    this.options.width = this.formatWidth(this.options.width);
    this.options.height = this.formatWidth(this.options.height);
    this.options.rowHeight = parseInt(this.options.rowHeight);
    if (this.options.height == '100%' || !this.options.height) {
        this.countContentHeight = false;
    }
    this.initOptionsTree();
    this.leftW = 0; // 左侧区域宽度（数字列复选框等）
    if (this.options.showNumCol) {
        this.leftW += this.numWidth;
    }
    if (this.options.multiSelect) {
        this.leftW += this.multiSelectWidth;
    }
    this.exceptContentHeight = 0; // 内容区域之外的高度
    this.noScrollHeight = 0;
    if (this.options.showHeader) {
        this.exceptContentHeight += this.headerHeight;
    }

    this.fixedWidth = 0;
    if (this.options.maxHeaderLevel > 1) {
        this.options.canSwap = false;
        this.options.canDrag = false;
        this.options.columnMenu = false;
    }
    if (this.options.rowHeight && !this.options.sumRowHeight) {
        this.options.sumRowHeight = this.options.rowHeight;
    }
    if (this.options.sumRowFixed) {
        this.noScrollHeight += this.options.sumRowHeight;
        this.exceptContentHeight += this.options.sumRowHeight;
        // if (!this.options.sumRowFirst) {
        this.exceptContentHeight += 1;
        // }
    }
    if (this.options.heightAuto) {
        this.options.needResetHeight = true;
    } else {
        this.options.maxHeight = 0;
    }

    // 获取缓存id
    var url = window.location.href;
    var index = url.indexOf('?');
    if (index > 0) {
        url = url.substring(0, index);
    }
    this.localStorageId = this.options.id + url;
};
var initOptionsTree = function initOptionsTree() {};
/*
 * 初始化变量
 */
var initVariable = function initVariable() {
    this.initDataSourceVariable();
    // 鼠标点击移动时位置记录
    this.mouseUpX = 'mouseUpX';
    this.mouseUpY = 'mouseUpY';
    this.mouseDownX = 'mouseDownX';
    this.mouseDownY = 'mouseDownY';
    this.mouseMoveX = 'mouseMoveX';
    this.mouseMoveY = 'mouseMoveY';
    this.scrollLeft = 0; // 记录横向滚动条
    this.scrollTop = 0; // 记录纵向滚动条
    this.showType = ''; // 记录grid显示方式，form和grid
    this.createGridFlag = false; // 是否已经创建grid展示
    this.columnClickX = 0; // 点击处的X坐标
    this.columnClickY = 0; // 点击处的Y坐标
    this.columnMenuMove = false; // 是否在column menu区域移动
    this.firstColumn = true; // 用于记录是否已经存在第一列，true表示还没有，false表示已经存在
    this.lastVisibleColumn = null;
    this.lastVisibleColumnWidth = 0;
    this.columnMenuMove = false; // 是否在column menu区域移动
    this.createColumnMenuFlag = false; // 是否已经创建column menu 区域
    this.menuColumnsHeight = 0;
    this.createFormFlag = false; // 是否已经创建form展示
    this.$sd_storageData = null; // 本地缓存内容为object
};
/*
 * 初始化datasource相关变量
 */
var initDataSourceVariable = function initDataSourceVariable() {
    this.selectRows = new Array();
    this.selectRowsObj = new Array();
    this.selectRowsIndex = new Array();
    this.allRows = new Array();
    this.eidtRowIndex = -1; // 当前修改行
};

// 初始化宽度相关变量
var initWidthVariable = function initWidthVariable() {
    // 计算用变量
    this.wholeWidth = 0; // 整体宽度
    this.wholeHeight = 0; // 整体高度
    this.rowHeight = 0; // 数据行高度
    this.contentRealWidth = 0; // 内容区真实宽度,严格按照设置的width计算的宽度
    this.contentWidth = 0; // 内容区宽度，自动扩展之后的宽度
    this.contentMinWidth = 0; // 内容区最小宽度,即可视宽度
    this.contentHeight = 0; //内容区高度
    this.fixedRealWidth = 0; // 固定区域真实宽度
    this.fixedWidth = 0; // 固定区域宽度
};
/*
 * 创建gridCompColumn对象方便后续处理
 */
var initGridCompColumn = function initGridCompColumn() {
    var oThis = this;
    this.initGridCompColumnVar();
    if (this.options.columns) {
        $.each(this.options.columns, function (i) {
            oThis.initGridCompColumnFun(this);
        });
    }
    this.initGridCompColumnLoacl();
    this.initGridHiddenLevelColumn();
    this.initGridCompFixedColumn();
    this.columnsVisibleFun();
};
var initGridCompColumnVar = function initGridCompColumnVar() {
    this.gridCompColumnArr = new Array();
    this.basicGridCompColumnArr = new Array();
    this.gridCompColumnFixedArr = new Array();
    this.gridCompLevelColumn = new Array();
    this.gridCompHiddenLevelColumnArr = new Array();
};
var initGridCompColumnFun = function initGridCompColumnFun(columnOptions) {
    var column = new gridCompColumn(columnOptions, this);
    // 如果可编辑增加修改图标
    this.editHeadTitleIcon(column);
    var widthStr = column.options.width + '';
    if (widthStr.indexOf("%") > 0) {
        this.options.noScroll = 'true';
    } else {
        column.options.width = parseInt(column.options.width);
    }
    column.options.optionsWidth = column.options.width;
    column.options.realWidth = column.options.width;
    this.gridCompColumnArr.push(column);
    this.initGridCompColumnColumnMenuFun(columnOptions);
    this.initGridCompColumnHeaderLevelFun(columnOptions);
};
var initGridCompColumnColumnMenuFun = function initGridCompColumnColumnMenuFun(columnOptions) {};
var initGridCompColumnHeaderLevelFun = function initGridCompColumnHeaderLevelFun(columnOptions) {};
var initGridCompColumnLoacl = function initGridCompColumnLoacl(columnOptions) {};
var initGridHiddenLevelColumn = function initGridHiddenLevelColumn() {};
var initGridCompFixedColumn = function initGridCompFixedColumn() {};
/*
 * 设置某列是否必输
 */
var setRequired = function setRequired(field, value) {};
/*
 * 创建dataSource对象方便后续处理
 */
var initDataSource = function initDataSource() {
    var oThis = this;
    this.dataSourceObj = new dataSource(this.options.dataSource, this);
};
export var initFunObj = {
    init: init,
    getBooleanOptions: getBooleanOptions,
    initDefault: initDefault,
    initGrid: initGrid,
    destroySelf: destroySelf,
    initOptions: initOptions,
    initOptionsTree: initOptionsTree,
    initVariable: initVariable,
    initDataSourceVariable: initDataSourceVariable,
    initWidthVariable: initWidthVariable,
    initGridCompColumn: initGridCompColumn,
    initGridCompColumnVar: initGridCompColumnVar,
    initGridCompColumnFun: initGridCompColumnFun,
    initGridCompColumnColumnMenuFun: initGridCompColumnColumnMenuFun,
    initGridCompColumnHeaderLevelFun: initGridCompColumnHeaderLevelFun,
    initGridCompColumnLoacl: initGridCompColumnLoacl,
    initGridHiddenLevelColumn: initGridHiddenLevelColumn,
    initGridCompFixedColumn: initGridCompFixedColumn,
    setRequired: setRequired,
    initDataSource: initDataSource
};