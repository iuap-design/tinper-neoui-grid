/*
 * 对象所支持的属性及默认值
 */

 import {dataSource}  from './dataSource';
 import {column as gridCompColumn}  from './column';
 import {gridComp}  from './gridComp';

 // import {gridComp} from '.re_gridCompColMenu';


 var old = $.fn.grid;
// 方法扩展
$.fn.grid = function(options) {
	var grid = $(this).data('gridComp');
	if(!grid)
		$(this).data('gridComp',(grid = new gridComp(this, options)));
	return grid;
};
$.fn.grid.gridComp = gridComp;
$.fn.grid.gridCompColumn = gridCompColumn;
$.fn.grid.dataSource = dataSource;

$.fn.grid.noConflict = function() {
	$.fn.grid = old;
	return this;
}
