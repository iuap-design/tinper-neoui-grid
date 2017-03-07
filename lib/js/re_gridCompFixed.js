'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fixFunObj = undefined;

var _gridCompOther = require('./gridCompOther');

/*
 * 将固定列放入gridCompColumnFixedArr
 */
var re_initGridCompFixedColumn = function re_initGridCompFixedColumn() {
    var oThis = this;
    var w = 0;
    $.each(this.gridCompColumnArr, function (i) {
        if (this.options.fixed == true) {
            oThis.gridCompColumnFixedArr.push(this);
        }
    });
    $.each(this.gridCompColumnFixedArr, function (i) {
        for (var i = oThis.gridCompColumnArr.length; i > -1; i--) {
            if (oThis.gridCompColumnArr[i] == this) {
                oThis.gridCompColumnArr.splice(i, 1);
                break;
            }
        }
    });
};

var fixed_columnsVisibleFun = function fixed_columnsVisibleFun() {
    // 扩展方法
    var oThis = this,
        fixW = 0;
    $.each(this.gridCompColumnFixedArr, function () {
        if (this.options.visible) {
            fixW += parseInt(this.options.width);
            this.firstColumn = oThis.firstColumn;
            oThis.firstColumn = false;
        }
    });
    this.fixedRealWidth = fixW;
};

var re_createHeaderTableFixed = function re_createHeaderTableFixed() {
    return this.createHeaderTable('fixed');
};

var re_createContentTableFixed = function re_createContentTableFixed() {
    return this.createContentTable('fixed');
};
var re_createContentOneRowFixed = function re_createContentOneRowFixed(rowObj) {
    return this.createContentOneRow(rowObj, 'fixed');
};
var re_widthChangeGridFunFixed = function re_widthChangeGridFunFixed(halfWholeWidth) {
    // 固定区域宽度不大于整体宽度的一半
    if (this.fixedRealWidth > halfWholeWidth) {
        this.fixedWidth = halfWholeWidth;
    } else {
        this.fixedWidth = this.fixedRealWidth;
    }
};
var fixFunObj = exports.fixFunObj = {
    initGridCompFixedColumn: re_initGridCompFixedColumn,
    fixed_columnsVisibleFun: fixed_columnsVisibleFun,
    createHeaderTableFixed: re_createHeaderTableFixed,
    createContentTableFixed: re_createContentTableFixed,
    createContentOneRowFixed: re_createContentOneRowFixed,
    widthChangeGridFunFixed: re_widthChangeGridFunFixed
};