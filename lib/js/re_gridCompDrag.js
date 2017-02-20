'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.re_resetThVariableDrag = exports.headerThDrag = exports.dragEnd = exports.dragFun = exports.dragStart = exports.drag_initGridEventFun = exports.drag_initEventFun = exports.re_createHeaderDrag = undefined;

var _gridCompEvent = require('./gridCompEvent');

var re_createHeaderDrag = function re_createHeaderDrag() {
	return '<div class="u-grid-header-resize-handle" id="' + this.options.id + '_resize_handle"><div class="u-grid-header-resize-handle-inner"></div></div>';
};

var drag_initEventFun = function drag_initEventFun() {
	// 扩展方法
	var oThis = this;

	$('#' + this.options.id).on('mousemove', function (e) {
		if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
			// 在header区域移动
			var eleTh = $(e.target).closest('th')[0];
			// 将其他列的操作按钮隐藏，显示当前列的
			oThis.headerThDrag(e, eleTh);
		}

		oThis.dragFun(e);
		e.stopPropagation();
	});
	$('#' + this.options.id + '_top').on('mousemove', function (e) {
		oThis.dragFun(e);
		e.stopPropagation();
	});

	$('#' + this.options.id).on('mouseup', function (e) {
		oThis.dragEnd(e);
	});

	$('#' + this.options.id + '_top').on('mouseup', function (e) {
		oThis.dragEnd(e);
	});
};

var drag_initGridEventFun = function drag_initGridEventFun() {
	// 扩展方法
	var oThis = this;
	$('#' + this.options.id + '_resize_handle').on('mousedown', function (e) {
		oThis.dragStart(e);
		return false;
	});
};
/*
 * 拖动开始
 */
var dragStart = function dragStart(e) {
	this.dragFlag = true;
	this.dragW = null;
	this.dragStartX = e.clientX;
};
/*
 * 改变列宽度处理
 */
var dragFun = function dragFun(e) {
	if (this.dragFlag) {
		var nowTh = $('#' + this.options.id + '_resize_handle')[0].nowTh,
		    $nowTh = $(nowTh),
		    nowThIndex = $nowTh.attr('index'),
		    column = this.gridCompColumnArr[nowThIndex],
		    nowVisibleThIndex = this.getVisibleIndexOfColumn(column);
		if (nowTh && column != this.lastVisibleColumn) {
			this.dragEndX = e.clientX;
			var changeWidth = parseInt(this.dragEndX) - parseInt(this.dragStartX),
			    newWidth = parseInt(nowTh.attrWidth) + parseInt(changeWidth),
			    cWidth = parseInt(this.contentWidth) + parseInt(changeWidth);
			if (newWidth > this.minColumnWidth) {
				if (this.options.noScroll) {
					// 不显示滚动条的情况下，当前列的该变量对后面一列产生影响
					var nextVisibleThIndex = this.getNextVisibleInidexOfColumn(column);
					if (nextVisibleThIndex > -1) {
						var nextColumn = this.getColumnByVisibleIndex(nextVisibleThIndex);
						if (!this.dragNextClomunWidth || this.dragNextClomunWidth < 0) this.dragNextClomunWidth = nextColumn.options.width;
					}
					var nextNewWidth = parseInt(this.dragNextClomunWidth) - parseInt(changeWidth);
					if (!(nextNewWidth > this.minColumnWidth)) {
						$('#' + this.options.id + '_top').css('display', 'block');
						return;
					}
				}
				if (!this.options.noScroll) {
					this.dragW = this.contentWidthChange(cWidth);
				}
				$('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
				$('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");

				column.options.width = newWidth;
				column.options.realWidth = newWidth;
				if (this.options.noScroll) {
					$('#' + this.options.id + '_header_table col:eq(' + nextVisibleThIndex + ')').css('width', nextNewWidth + "px");
					$('#' + this.options.id + '_content_table col:eq(' + nextVisibleThIndex + ')').css('width', nextNewWidth + "px");
					nextColumn.options.width = nextNewWidth;
					nextColumn.options.realWidth = nextNewWidth;
				}
			}
		}
		$('#' + this.options.id + '_top').css('display', 'block');
	}
};
/*
 * 拖动结束
 */
var dragEnd = function dragEnd(e) {
	if (this.dragFlag) {
		this.resetThVariable();
		this.saveGridCompColumnArrToLocal();
	}
	this.dragNextClomunWidth = -1;
	this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
	if (this.dragW) this.contentWidth = this.dragW;
	$('#' + this.options.id + '_resize_handle')[0].nowTh = null;
	this.dragFlag = false;
	$('#' + this.options.id + '_top').css('display', 'none');
};

/*
 * 计算拖动div所在位置
 */
var headerThDrag = function headerThDrag(e, ele) {
	if (!this.dragFlag && !this.swapColumnFlag && ele && ele.gridCompColumn && ele.gridCompColumn.options.canDrag && $('#' + this.options.id + '_resize_handle')[0].nowTh != ele) {
		var $ele = $(ele);
		$('#' + this.options.id + '_resize_handle').css('left', ele.attrRightTotalWidth - this.scrollLeft - 4 + this.leftW + this.fixedWidth);
		$('#' + this.options.id + '_resize_handle')[0].nowTh = ele;
	}
};
var re_resetThVariableDrag = function re_resetThVariableDrag(nowTh, gridCompColumn, width) {
	if (!$('#' + this.options.id + '_resize_handle')[0].nowTh && gridCompColumn.options.canDrag) {
		$('#' + this.options.id + '_resize_handle').css('left', width - 4 + this.leftW);
		$('#' + this.options.id + '_resize_handle')[0].nowTh = nowTh;
	}
};
exports.re_createHeaderDrag = re_createHeaderDrag;
exports.drag_initEventFun = drag_initEventFun;
exports.drag_initGridEventFun = drag_initGridEventFun;
exports.dragStart = dragStart;
exports.dragFun = dragFun;
exports.dragEnd = dragEnd;
exports.headerThDrag = headerThDrag;
exports.re_resetThVariableDrag = re_resetThVariableDrag;