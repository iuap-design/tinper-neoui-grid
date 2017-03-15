(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.gridCompOther = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /*
     * 更新最后数据行标识
     */
    const updateLastRowFlag = function () {
        // 共享服务加的，没有对应的css暂时去掉
        return;
        var rows = $('#' + this.options.id + '_content_tbody').find('tr[role=row]');
        for (var i = 0, count = rows.length; i < count; i++) {
            if (i == count - 1) $(rows[i]).addClass('last-row');else $(rows[i]).removeClass('last-row');
        }
    };
    const updateNumColLastRowFlag = function () {
        // 共享服务加的，没有对应的css暂时去掉
        return;
        var numCols = $('#' + this.options.id + '_content_numCol').find('.u-grid-content-num');
        for (var i = 0, count = numCols.length; i < count; i++) {
            if (i == count - 1) $(numCols[i]).addClass('last-row');else $(numCols[i]).removeClass('last-row');
        }
    };

    /*
     * column是否显示处理，只在初始化gridCompColumn对象时调用，其他时候不再调用
     * 计算固定区域及内容区域的真实宽度
     * 计算第一列
     * 计算内容区域最后一列显示列
     */
    const columnsVisibleFun = function () {
        var oThis = this,
            w = 0;
        this.firstColumn = true;
        this.overWidthVisibleColumnArr = new Array();
        $.each(this.gridCompColumnArr, function () {
            if (this.options.visible) {
                w += parseInt(this.options.width);
                if (this.options.width > this.options.realWidth) {
                    oThis.overWidthVisibleColumnArr.push(this);
                }
                this.firstColumn = oThis.firstColumn;
                oThis.firstColumn = false;
                oThis.lastVisibleColumn = this;
                oThis.lastVisibleColumnWidth = this.options.width;
            }
        });
        this.contentRealWidth = w;
    };
    /*
     * 创建完成之后处理变量
     */
    const resetThVariable = function () {
        if (this.showType != 'grid') return;
        var oThis = this;
        this.contentWidth = 0;

        // 记录每列宽度及当前宽度之和
        $('#' + this.options.id + '_header_table th', this.$ele).each(function (i) {
            //会出现th多于列的情况，发现问题之后再看下为什么
            var gridCompColumn = oThis.gridCompColumnArr[i];
            var w = 0;
            if (gridCompColumn.options.visible) {
                w = parseInt(gridCompColumn.options.width);
            }
            this.attrLeftTotalWidth = oThis.contentWidth;
            oThis.contentWidth += w;
            oThis.resetThVariableDrag(this, gridCompColumn, w);
            this.gridCompColumn = gridCompColumn;
            this.attrWidth = w;
            this.attrRightTotalWidth = oThis.contentWidth;
        });
        oThis.resetThVariableHeaderLevel();
    };
    const resetThVariableDrag = function (nowTh, gridCompColumn) {};
    const resetThVariableHeaderLevel = function () {};

    /*
     * 修改第一列的css
     */
    const headerFirstClassFun = function () {
        $('#' + this.options.id + '_grid .u-grid-header-th-first').removeClass('u-grid-header-th-first');
        $('#' + this.options.id + '_grid').find('th').eq(0).addClass('u-grid-header-th-first');
    };

    /*
     * 根据filed设置renderType
     */
    const setRenderType = function (field, renderType) {
        var gridCompColumn = this.getColumnByField(field);
        gridCompColumn.options.renderType = renderType;
        var index = this.getIndexOfColumn(gridCompColumn);
        this.renderTypeByColumn(gridCompColumn, index);
    };
    /*
     * 设置是否显示header
     */
    const setShowHeader = function (showHeader) {
        this.options.showHeader = showHeader;
        if (showHeader) {
            $('#' + this.options.id + '_header').css('display', "block");
        } else {
            $('#' + this.options.id + '_header').css('display', "none");
        }
    };
    const setColumnPrecision = function (field, precision) {
        var gridColumn = this.getColumnByField(field);
        gridColumn.options.precision = precision;
        this.renderTypeFun();
        if (this.options.showSumRow) {
            this.repairSumRow();
        }
    };
    const setMultiSelect = function (multiSelect) {
        var oldMultiSelect = this.options.multiSelect;
        if (oldMultiSelect != multiSelect) {
            this.options.multiSelect = multiSelect;
            this.initGrid();
        }
    };
    const setShowNumCol = function (showNumCol) {
        var oldShowNumCol = this.options.showNumCol;
        if (oldShowNumCol != showNumCol) {
            this.options.showNumCol = showNumCol;
            this.initGrid();
        }
    };
    const isGridShow = function () {
        if (this.showType == 'grid') return true;
        return false;
    };
    const getBoolean = function (value) {
        if (value === 'true' || value === true) return true;
        return false;
    };
    const otherFunObj = exports.otherFunObj = {
        updateLastRowFlag: updateLastRowFlag,
        updateNumColLastRowFlag: updateNumColLastRowFlag,
        columnsVisibleFun: columnsVisibleFun,
        resetThVariable: resetThVariable,
        resetThVariableDrag: resetThVariableDrag,
        resetThVariableHeaderLevel: resetThVariableHeaderLevel,
        headerFirstClassFun: headerFirstClassFun,
        setRenderType: setRenderType,
        setShowHeader: setShowHeader,
        setColumnPrecision: setColumnPrecision,
        setMultiSelect: setMultiSelect,
        setShowNumCol: setShowNumCol,
        isGridShow: isGridShow,
        getBoolean: getBoolean
    };
});