(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['./dataSource', './column', './gridComp'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('./dataSource'), require('./column'), require('./gridComp'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.dataSource, global.column, global.gridComp);
		global.index = mod.exports;
	}
})(this, function (_dataSource, _column, _gridComp) {
	'use strict';

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
});