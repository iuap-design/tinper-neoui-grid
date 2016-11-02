import {
	initEventFun
} from './gridCompEvent';

const re_hideEditMenu = function(){
	$('#' +this.options.id + '_content_edit_menu').css('display','none');
};

const re_clickFunEdit = function(e,index){
	var $tr = $(e.target).closest('tr');
	var $td = $(e.target).closest('td');
	var colIndex = $td.index();
	if(this.options.editable && (this.eidtRowIndex != index || (this.options.editType == 'default' && this.editColIndex != colIndex))){
		this.editClose();
		if(typeof this.options.onBeforeEditFun == 'function'){
			var obj = {};
			obj.gridObj = this;
			obj.rowObj = this.dataSourceObj.rows[index];
			obj.rowIndex = index;
			obj.colIndex = colIndex;
			obj.$tr = $tr;
			obj.e = e;
			if(!this.options.onBeforeEditFun(obj)){
				if(this.eidtRowIndex != -1){
					this.editClose();
				}
				return;
			}
		}
		this.editRowFun($tr,colIndex);
	}
};

const editRowFun = function($tr, colIndex){
	if(this.eidtRowIndex != -1){
		this.editClose();
	}
	var index = typeof $tr === 'number' ? $tr : this.getTrIndex($tr);
	this.eidtRowIndex = index;
	this.editColIndex = colIndex;
	this.editRow($tr, colIndex);
};
const editRowIndexFun = function(i){
	if(this.eidtRowIndex != -1){
		this.editClose();
	}
	this.eidtRowIndex = i;
	this.editColIndex = 0;
	this.editRow();
};
/*
 * 创建编辑行
 */
const editRow = function($tr,colIndex){
	if(colIndex < 0)
		return;
	var oThis = this;
	var isFixedCol = false
	if ($tr && $tr.parents('table').attr('id').indexOf('_fixed_') > -1)
		isFixedCol = true
	$tr = $tr || $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + this.eidtRowIndex+ ')');
	colIndex = colIndex || 0
	var row = this.dataSourceObj.rows[this.eidtRowIndex].value;
	this.editRowObj = this.cloneObj(row);
	if(this.options.editType == 'default'){
		var column = isFixedCol ? this.gridCompColumnFixedArr[colIndex] : this.gridCompColumnArr[colIndex]
			if(column.options.editable){
				var td = $('td:eq(' + colIndex + ')',$tr)[0];
				var field = column.options.field;
				var value = $(row).attr(field);
				value = oThis.getString(value,'');
				var obj = {};
				obj.td = td;
				obj.value = value;
				obj.field = field;
				obj.editType = column.options.editType;
				obj.rowObj = oThis.editRowObj;
				obj.$tr = $tr;
				obj.colIndex = colIndex;
				oThis.editCell(obj);
			}
		$('#' +this.options.id + '_content_edit_menu').css('display','block');
		$('#' +this.options.id + '_content_edit_menu_cancel').css('marginLeft','10px');// 与form形式相比偏左
		var topIndex = $('tr:visible',$tr.parent()).index($tr);
		this.rowHeight = $tr.height(); // tianxq
		var t = this.rowHeight * (topIndex + 1) + this.headerHeight + 1;
	}else if(this.options.editType == 'form'){
		if(typeof this.options.formEditRenderFun == 'function'){
			if(this.fixedWidth>0){
				var table = $('#' + this.options.id + '_content_fixed_table')[0];
			}else{
				var table = $('#' + this.options.id + '_content_table')[0];
			}

			var tr = table.insertRow(this.eidtRowIndex + 2);
			tr.id = this.options.id + '_edit_tr';
			var cell = tr.insertCell();
			cell.id = this.options.id + '_edit_td';
			cell.style.borderBottom = '0px';
			cell.style.background = '#fff';
			var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
			var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;float:left;">';
			htmlStr += '</div>';
			cell.innerHTML = htmlStr;
			var obj = {};
			obj.grid = gridObj;
			obj.element = $('#' + this.options.id + '_edit_form')[0];
			obj.editRowObj = this.editRowObj;
			this.options.formEditRenderFun.call(this,obj);
			var htmlStr = '<div style="position:relative;float:left;width:100%;height:40px;"></div>';
			$('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd',htmlStr);
			var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
			var color = $('#' + this.options.id + '_edit_form').css('background-color');
			if(this.options.multiSelect){
				var $div = $('#' + this.options.id + '_content_multiSelect > div').eq( this.eidtRowIndex );
				var htmlStr = '<div class="grid_open_edit" id="' + this.options.id + '_multiSelect_edit" style="background-color:'+color+';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:'+ h +'px"></div>';
				$div[0].insertAdjacentHTML('afterEnd',htmlStr);
			}
			if(this.options.showNumCol){
				var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq( this.eidtRowIndex );
				var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:'+color+';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
				$div[0].insertAdjacentHTML('afterEnd',htmlStr);
			}
			$('#' +this.options.id + '_content_edit_menu').css('display','block');


			if(this.fixedWidth>0){
				var table1 = $('#' + this.options.id + '_content_table')[0];
				var tr1 = table1.insertRow(this.eidtRowIndex + 2);
				tr1.id = this.options.id + '_edit_tr1';
			}
		}else{
			if(this.fixedWidth>0){
				var table = $('#' + this.options.id + '_content_fixed_table')[0];
			}else{
				var table = $('#' + this.options.id + '_content_table')[0];
			}

			var tr = table.insertRow(this.eidtRowIndex + 2);
			tr.id = this.options.id + '_edit_tr';
			var cell = tr.insertCell();
			cell.id = this.options.id + '_edit_td';
			cell.style.borderBottom = '0px';
			var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
			var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;float:left;">';
			$.each(this.gridCompColumnFixedArr, function(i) {
				var show = false;
				if(this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow) ) ) {
					show = true;
				}

				if(show){
					var field = this.options.field;
					var value = $(row).attr(field);
					value = oThis.getString(value,'');
					var title = this.options.title;
					var headerColor = this.options.headerColor;
					htmlStr += oThis.formEditCell(value,field,title,this.options.required,headerColor);
				}
			});

			$.each(this.gridCompColumnArr, function(i) {
				var show = false;
				if(this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow) ) ) {
					show = true;
				}

				if(show){
					var field = this.options.field;
					var value = $(row).attr(field);
					value = oThis.getString(value,'');
					var title = this.options.title;
					var headerColor = this.options.headerColor;
					htmlStr += oThis.formEditCell(value,field,title,this.options.required,headerColor);
				}
			});
			htmlStr += '</div>';
			cell.innerHTML = htmlStr;

			$.each(this.gridCompColumnFixedArr, function(i) {
				var show = false;
				if(this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow) ) ) {
					show = true;
				}

				if(show){
					var field = this.options.field;
					var td = $('#' + oThis.options.id + '_edit_' + field)[0];
					var value = $(row).attr(field);
					var title = this.options.title;
					value = oThis.getString(value,'');
					var obj = {};
					obj.td = td;
					td.innerHTML = '<div class="u-grid-content-td-div" title=""></div>';
					obj.value = value;
					obj.field = field;
					obj.editType = this.options.editType;
					obj.rowObj = oThis.editRowObj;
					obj.$tr = $tr;
					obj.colIndex = colIndex;
					htmlStr += oThis.editCell(obj);
				}
			});

			$.each(this.gridCompColumnArr, function(i) {
				var show = false;
				if(this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow) ) ) {
					show = true;
				}

				if(show){
					var field = this.options.field;
					var td = $('#' + oThis.options.id + '_edit_' + field)[0];
					var value = $(row).attr(field);
					var title = this.options.title;
					value = oThis.getString(value,'');
					var obj = {};
					obj.td = td;
					td.innerHTML = '<div class="u-grid-content-td-div" title=""></div>';
					obj.value = value;
					obj.field = field;
					obj.editType = this.options.editType;
					obj.rowObj = oThis.editRowObj;
					obj.$tr = $tr;
					obj.colIndex = colIndex;
					htmlStr += oThis.editCell(obj);
				}
			});

			if(typeof(this.options.renderEditMemu) == "function"){

				this.options.renderEditMemu.apply(this,[$('#' + this.options.id + '_edit_form')[0],this.eidtRowIndex,this.dataSourceObj.rows.length])
			}else{
				var htmlStr = '<div id="'+ this.options.id+'_content_edit_menu" style="position:relative;float:left;width:100%;height:40px;"><button type="button" class="u-grid-content-edit-menu-button u-grid-content-edit-menu-button-ok" id="' + this.options.id + '_content_edit_menu_close">' + this.transMap.ml_close + '</button></div>';

				$('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd',htmlStr);
				$('#' + this.options.id + '_content_edit_menu_close').on('click',function(e){
					oThis.editClose();
				});
			}
			// 处理左侧区域位置
			var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
			var color = $('#' + this.options.id + '_edit_form').css('background-color');
			if(this.options.multiSelect){
				var $div = $('#' + this.options.id + '_content_multiSelect > div').eq( this.eidtRowIndex );
				var htmlStr = '<div class="grid_open_edit " id="' + this.options.id + '_multiSelect_edit" style="background-color:'+color+';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:'+ h +'px"></div>';
				$div[0].insertAdjacentHTML('afterEnd',htmlStr);
			}
			if(this.options.showNumCol){
				var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq( this.eidtRowIndex );
				var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:'+color+';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
				$div[0].insertAdjacentHTML('afterEnd',htmlStr);
			}
			$('#' +this.options.id + '_content_edit_menu').css('display','block');


			if(this.fixedWidth>0){
				var table1 = $('#' + this.options.id + '_content_table')[0];
				var tr1 = table1.insertRow(this.eidtRowIndex + 2);
				tr1.id = this.options.id + '_edit_tr1';
			}
		}
	}
};
/*
 * 行编辑关闭
 */
const re_editClose = function(){
	var row = this.dataSourceObj.rows[this.eidtRowIndex];
	if(this.editComp && this.editComp.hide){
		this.editComp.hide();
	}
	if(!row)
		return;
	if(this.options.editType != 'form'){
		//this.repaintRow(this.eidtRowIndex);
		var obj = {};
		obj.begin = this.eidtRowIndex;
		obj.length = 1;
		this.renderTypeFun(obj);
	}

	$('#' +this.options.id + '_content_edit_menu').css('display','none');
	this.repairSumRow();
	this.noRowsShowFun();
	this.updateLastRowFlag();
	this.eidtRowIndex = -1;
	// form形式删除对应区域,存在切换编辑形式的情况，所以一直删除
	// if(this.options.editType == 'form'){
		$('#' + this.options.id + '_multiSelect_edit').remove(null,true);
		$('#' + this.options.id + '_numCol_edit').remove(null,true);
		$('#' + this.options.id + '_edit_tr').remove(null,true);
		$('#' + this.options.id + '_edit_tr1').remove(null,true);
	// }
};
/*
 * 编辑单元格
 */
const editCell = function(obj){
	var td = obj.td;
	var value = obj.value;
	var field = obj.field;
	var editType = obj.editType;
	var rowObj = obj.rowObj;
	var $tr = obj.$tr;
	var	colIndex = obj.colIndex;
	var oThis = this;
	if(obj.colIndex == 0){
			try{
				this.iconSpan = $(td).find('.uf')[0].outerHTML;
			}catch(e){

			}
		} else {
			this.iconSpan = null;
		}

	var obj = {};
	obj.td = td;
	obj.field = field;
	obj.$tr = $tr;
	obj.colIndex = colIndex;
	oThis.newEditObj = obj;

	if(editType == 'text'){
		if(this.options.editType == 'default'){
			td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value +'" field="' + field+'" style="width:100%;margin:0px;min-height:20px;font-size:12px;color:#444"></div></div>';
		}else{
			td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value +'" field="' + field+'"></div></div>';
		}
		$('input',$(td)).on('blur',function(){
			oThis.editValueChange(field,this.value);
		});
	}else if(typeof editType == 'function'){
		var obj = {};
		var $Div = $('.u-grid-content-td-div',$(td));
		obj.gridObj = this;
		obj.element = $Div[0];
		obj.value = value;
		obj.field = field;
		obj.rowObj = rowObj;
		editType.call(this,obj);
	}
	// input输入blur时显示下一个编辑控件
	$('input',$(td)).off('keydown');
	$('input',$(td)).on('keydown',function(e){
		if(oThis.options.editType == 'form'){

		}else{
			var keyCode = e.keyCode;
	        if( e.keyCode == 13 || e.keyCode == 9){// 回车
	        	this.blur(); //首先触发blur来将修改值反应到datatable中
	        	// IE11会导致先触发nextEditShow后触发blur的处理
	        	setTimeout(function(){
	        		oThis.nextEditShow();
	        	},100);
	            u.stopEvent(e);
	        }
		}
		
	});
	if (this.options.editType == 'default')
		$('input:first',$(td)).focus()


};
/*
 * 触发下一个编辑单元格
 */
const nextEditShow = function(){
	var obj = this.newEditObj;
	var td = obj.td;
	var $tr = obj.$tr;
	var colIndex = parseInt(obj.colIndex) + 1;
	// 如果是最后一列则换行
	if($(td).next('td').length == 0){
		var $nextTr = $tr.next('tr')
		if($nextTr.length > 0){
			$tr = $nextTr;
			colIndex = 0;
			$tr.click(); //触发下一行的焦点
		}else{
			return;
		}
	}
	this.editRowFun($tr,colIndex);
};
const editValueChange=function(field,value){
	// 设置row的值为新值
	if(this.eidtRowIndex > -1 && this.eidtRowIndex < this.dataSourceObj.rows.length){
		this.updateValueAt(this.eidtRowIndex,field,value);
	}

};
const re_updateEditRowIndex = function(opType, opIndex, num) {
	if(this.eidtRowIndex < 0) return;
	if(opType == '-') {
		if(opIndex < this.eidtRowIndex) {
			this.eidtRowIndex--;
		} else if(opIndex == this.eidtRowIndex) {
			this.eidtRowIndex = -1;
		}
	} else if(opType == '+') {
		num === undefined && (num = 1)
		if(opIndex <= this.eidtRowIndex) {
			this.eidtRowIndex += num;
		}
	}
};
const re_updateValueAtEdit = function(rowIndex,field,value,force){
	if(this.eidtRowIndex == rowIndex){
		if($('#' +  this.options.id + "_edit_field_" + field).length > 0){
			if($('#' +  this.options.id + "_edit_field_" + field)[0].type == 'checkbox'){
				if(value == 'Y' || value == 'true' || value === true){
					$('#' +  this.options.id + "_edit_field_" + field)[0].checked = true;
				}else{
					$('#' +  this.options.id + "_edit_field_" + field)[0].checked = false;
				}
			}else{
				$('#' +  this.options.id + "_edit_field_" + field)[0].value = value;
			}
		}
	}
};
/*
 * 根据filed设置editType
 */
const setEditType = function(field,editType){
	var gridCompColumn = this.getColumnByField(field);
	gridCompColumn.options.editType = editType;
};
/*
 * 设置是否可修改
 */
const setEditable = function(editable){
	this.options.editable = editable;
	this.editClose();
};
const edit_initEventFun = function(){
	var oThis = this;
	$(document).on('click',function(e){
		if(oThis.options.editable && oThis.options.editType == 'default'){
			var $e = $(e.target);
			var flag = true;
			flag = $(e.target).closest('.u-grid-content-td-div').length > 0?false:flag;
			var cusStr = oThis.options.customEditPanelClass
			if(cusStr){
				var cArr = cusStr.split(',');
				$.each(cArr,function(){
					flag = $e.closest('.' + this).length > 0?false:flag;
				});
			}
			if($e.attr('role') == 'grid-for-edit'){
				flag = false;
			}
			if(flag){
				oThis.editClose();
			}
		}
	});

	u.on(document,'scroll',function(){
		oThis.editClose();
	})
};
const setGridEditType = function(newEditType){
	this.options.editType = newEditType;
}
const setGridEditTypeAndEditRow = function(newEditType,rowIndex,colIndex){
	this.options.editType = newEditType;
	var $contentBody = $('#' + this.options.id + '_content_tbody');
	var $tr = $('tr:eq(' + rowIndex + ')',$contentBody)
	this.editRowFun($tr,colIndex)
}
export{
    re_hideEditMenu,
    re_clickFunEdit,
    editRowFun,
    editRowIndexFun,
    editRow,
    re_editClose,
    editCell,
    nextEditShow,
    editValueChange,
    re_updateEditRowIndex,
    re_updateValueAtEdit,
    setEditType,
    setEditable,
    edit_initEventFun,
    setGridEditType,
    setGridEditTypeAndEditRow
}
