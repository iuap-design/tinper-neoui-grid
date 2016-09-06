import {
	initEventFun,
    initGridEventFun
} from './gridCompEvent';

const re_createHeaderDrag = function(){
	return '<div class="u-grid-header-resize-handle" id="' + this.options.id + '_resize_handle"><div class="u-grid-header-resize-handle-inner"></div></div>';
};

const drag_initEventFun = function(){
	// 扩展方法
	var oThis = this;

	$('#' + this.options.id).on('mousemove', function(e) {
		if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
			// 在header区域移动
			var eleTh = $(e.target).closest('th')[0];
			// 将其他列的操作按钮隐藏，显示当前列的
			oThis.headerThDrag(e, eleTh);
		}

		oThis.dragFun(e);
		e.stopPropagation();
	});
	$('#' + this.options.id + '_top').on('mousemove', function(e) {
		oThis.dragFun(e);
		e.stopPropagation();
	});

	$('#' + this.options.id).on('mouseup', function(e) {
		oThis.dragEnd(e);
	});

	$('#' + this.options.id+ '_top').on('mouseup', function(e) {
		oThis.dragEnd(e);
	});

};

const drag_initGridEventFun = function(){
	// 扩展方法
	var oThis = this;
	$('#' + this.options.id + '_resize_handle').on('mousedown', function(e) {
		oThis.dragStart(e);
		return false;
	});
};
/*
 * 拖动开始
 */
const dragStart = function(e) {
	this.dragFlag = true;
	this.dragW = null;
	this.dragStartX = e.clientX;
};
/*
 * 改变列宽度处理
 */
const dragFun = function(e) {
	if (this.dragFlag) {
		var nowTh = $('#' + this.options.id + '_resize_handle')[0].nowTh,
			$nowTh = $(nowTh),
			nowThIndex = $nowTh.attr('index'),
			column = this.gridCompColumnArr[nowThIndex];
			nowVisibleThIndex = this.getVisibleIndexOfColumn(column);
		if (nowTh && column != this.lastVisibleColumn) {
			this.dragEndX = e.clientX;
			var changeWidth = this.dragEndX - this.dragStartX,
				newWidth = nowTh.attrWidth + changeWidth;
				cWidth = this.contentWidth + changeWidth;
			if (newWidth > this.minColumnWidth) {
				this.dragW = this.contentWidthChange(cWidth);
				$('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
				$('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");

				column.options.width = newWidth;
				column.options.realWidth = newWidth;
			}
		}
		$('#' + this.options.id + '_top').css('display', 'block');
	}
};
/*
 * 拖动结束
 */
const dragEnd = function(e) {
	if (this.dragFlag) {
		this.resetThVariable();
		this.saveGridCompColumnArrToLocal();
	}
	this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
	if(this.dragW)
		this.contentWidth = this.dragW;
	$('#' + this.options.id + '_resize_handle')[0].nowTh = null;
	this.dragFlag = false;
	$('#' + this.options.id + '_top').css('display', 'none');
};

/*
 * 计算拖动div所在位置
 */
const headerThDrag = function(e, ele) {
	if (!this.dragFlag && !this.swapColumnFlag && ele && ele.gridCompColumn && ele.gridCompColumn.options.canDrag && $('#' + this.options.id + '_resize_handle')[0].nowTh != ele) {
		var $ele = $(ele);
		$('#' + this.options.id + '_resize_handle').css('left', ele.attrRightTotalWidth - this.scrollLeft - 4 + this.leftW + this.fixedWidth);
		$('#' + this.options.id + '_resize_handle')[0].nowTh = ele;
	}
};
const re_resetThVariableDrag = function(nowTh,gridCompColumn,width){
	if (!$('#' + this.options.id + '_resize_handle')[0].nowTh && gridCompColumn.options.canDrag) {
		$('#' + this.options.id + '_resize_handle').css('left', width - 4 + this.leftW);
		$('#' + this.options.id + '_resize_handle')[0].nowTh = nowTh;
	}
};
export{
    re_createHeaderDrag,
    drag_initEventFun,
    drag_initGridEventFun,
    dragStart,
    dragFun,
    dragEnd,
    headerThDrag,
    re_resetThVariableDrag
}
