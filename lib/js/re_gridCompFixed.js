'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.re_widthChangeGridFunFixed = exports.re_createContentOneRowFixed = exports.re_createContentTableFixed = exports.re_createHeaderTableFixed = exports.fixed_columnsVisibleFun = exports.re_initGridCompFixedColumn = undefined;

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
exports.re_initGridCompFixedColumn = re_initGridCompFixedColumn;
exports.fixed_columnsVisibleFun = fixed_columnsVisibleFun;
exports.re_createHeaderTableFixed = re_createHeaderTableFixed;
exports.re_createContentTableFixed = re_createContentTableFixed;
exports.re_createContentOneRowFixed = re_createContentOneRowFixed;
exports.re_widthChangeGridFunFixed = re_widthChangeGridFunFixed;