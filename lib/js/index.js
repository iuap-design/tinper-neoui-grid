'use strict';

var _dataSource = require('./dataSource');

var _column = require('./column');

var _gridComp = require('./gridComp');

var old = $.fn.grid;
// 方法扩展
/*
 * 对象所支持的属性及默认值
 */

$.fn.grid = function (options) {
	var grid = $(this).data('gridComp');
	if (!grid) $(this).data('gridComp', grid = new _gridComp.gridComp(this, options));
	return grid;
};
$.fn.grid.gridComp = _gridComp.gridComp;
$.fn.grid.gridCompColumn = _column.column;
$.fn.grid.dataSource = _dataSource.dataSource;

$.fn.grid.noConflict = function () {
	$.fn.grid = old;
	return this;
};