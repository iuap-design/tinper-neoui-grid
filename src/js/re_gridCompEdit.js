import {
    gridBrowser
} from './gridBrowser';

const re_hideEditMenu = function() {
    $('#' + this.options.id + '_content_edit_menu').css('display', 'none');
};

const re_clickFunEdit = function(e, index) {
    var $tr = $(e.target).closest('tr');
    var $td = $(e.target).closest('td');
    var colIndex = $td.index();
    if (this.options.editable && (this.eidtRowIndex != index || (this.options.editType == 'default' && this.editColIndex != colIndex))) {
        this.editClose();
        this.editRowFun($tr, colIndex);
    }
};


const editRowFun = function($tr, colIndex) {
    var index = this.getTrIndex($tr);
    if (typeof this.options.onBeforeEditFun == 'function') {
        var obj = {};
        obj.gridObj = this;
        obj.rowObj = this.dataSourceObj.rows[index];
        obj.rowIndex = index;
        obj.colIndex = colIndex;
        obj.$tr = $tr;
        if (!this.options.onBeforeEditFun(obj)) {
            if (this.eidtRowIndex != -1) {
                this.editClose();
            }
            return;
        }
    }
    if (this.eidtRowIndex != -1) {
        this.editClose();
    }
    var index = typeof $tr === 'number' ? $tr : this.getTrIndex($tr);
    this.eidtRowIndex = index;
    this.editColIndex = colIndex;
    this.editRow($tr, colIndex);
    return true;
};
const editRowIndexFun = function(i) {
    if (this.eidtRowIndex != -1) {
        this.editClose();
    }
    this.eidtRowIndex = i;
    this.editColIndex = 0;
    this.editRow();
};
/*
 * 创建编辑行
 */
const editRow = function($tr, colIndex) {
    if (colIndex < 0)
        return;
    var oThis = this;
    var isFixedCol = false
    if ($tr && $tr.parents('table').attr('id').indexOf('_fixed_') > -1)
        isFixedCol = true
    $tr = $tr || $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + this.eidtRowIndex + ')');
    colIndex = colIndex || 0
    var row = this.dataSourceObj.rows[this.eidtRowIndex].value;
    this.editRowObj = this.cloneObj(row);
    if (this.options.editType == 'default') {
        var column = isFixedCol ? this.gridCompColumnFixedArr[colIndex] : this.gridCompColumnArr[colIndex]
        if (column && column.options.editable) {
            var td = $('td:eq(' + colIndex + ')', $tr)[0];
            var field = column.options.field;
            var value = $(row).attr(field);
            value = oThis.getString(value, '');
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
        $('#' + this.options.id + '_content_edit_menu').css('display', 'block');
        $('#' + this.options.id + '_content_edit_menu_cancel').css('marginLeft', '10px'); // 与form形式相比偏左
        var topIndex = $('tr:visible', $tr.parent()).index($tr);
        this.rowHeight = $tr.height(); // tianxq
        var t = this.rowHeight * (topIndex + 1) + this.headerHeight + 1;
    } else if (this.options.editType == 'form') {
        if (typeof this.options.formEditRenderFun == 'function') {
            if (this.fixedWidth > 0) {
                var table = $('#' + this.options.id + '_content_fixed_table')[0];
            } else {
                var table = $('#' + this.options.id + '_content_table')[0];
            }

            var tr = table.insertRow(this.eidtRowIndex + 2);
            tr.id = this.options.id + '_edit_tr';
            $(tr).addClass('grid_edit_form_tr');
            var cell = tr.insertCell();
            cell.id = this.options.id + '_edit_td';
            $(cell).addClass('grid_edit_form_td');
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
            this.options.formEditRenderFun.call(this, obj);
            var htmlStr = '<div style="position:relative;float:left;width:100%;height:40px;"></div>';
            $('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd', htmlStr);
            var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
            var color = $('#' + this.options.id + '_edit_form').css('background-color');
            if (this.options.multiSelect) {
                var $div = $('#' + this.options.id + '_content_multiSelect > div').eq(this.eidtRowIndex);
                var htmlStr = '<div class="grid_open_edit" id="' + this.options.id + '_multiSelect_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            if (this.options.showNumCol) {
                var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq(this.eidtRowIndex);
                var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            $('#' + this.options.id + '_content_edit_menu').css('display', 'block');


            if (this.fixedWidth > 0) {
                var table1 = $('#' + this.options.id + '_content_table')[0];
                var tr1 = table1.insertRow(this.eidtRowIndex + 2);
                tr1.id = this.options.id + '_edit_tr1';
            }
        } else {
            if (this.fixedWidth > 0) {
                var table = $('#' + this.options.id + '_content_fixed_table')[0];
            } else {
                var table = $('#' + this.options.id + '_content_table')[0];
            }

            var tr = table.insertRow(this.eidtRowIndex + 2);
            tr.id = this.options.id + '_edit_tr';
            $(tr).addClass('grid_edit_form_tr');
            var cell = tr.insertCell();
            cell.id = this.options.id + '_edit_td';
            $(cell).addClass('grid_edit_form_td');
            cell.style.borderBottom = '0px';
            var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
            var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;float:left;">';
            $.each(this.gridCompColumnFixedArr, function(i) {
                var show = false;
                if (this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow))) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var value = $(row).attr(field);
                    value = oThis.getString(value, '');
                    var title = this.options.title;
                    var headerColor = this.options.headerColor;
                    htmlStr += oThis.formEditCell(value, field, title, this.options.required, headerColor);
                }
            });

            $.each(this.gridCompColumnArr, function(i) {
                var show = false;
                if (this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow))) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var value = $(row).attr(field);
                    value = oThis.getString(value, '');
                    var title = this.options.title;
                    var headerColor = this.options.headerColor;
                    htmlStr += oThis.formEditCell(value, field, title, this.options.required, headerColor);
                }
            });
            htmlStr += '</div>';
            cell.innerHTML = htmlStr;

            $.each(this.gridCompColumnFixedArr, function(i) {
                var show = false;
                if (this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow))) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var td = $('#' + oThis.options.id + '_edit_' + field)[0];
                    var value = $(row).attr(field);
                    var title = this.options.title;
                    value = oThis.getString(value, '');
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
                if (this.options.editFormShow && (this.options.editable || (!this.options.editable && oThis.options.noneEditableFormShow))) {
                    show = true;
                }

                if (show) {
                    var field = this.options.field;
                    var td = $('#' + oThis.options.id + '_edit_' + field)[0];
                    var value = $(row).attr(field);
                    var title = this.options.title;
                    value = oThis.getString(value, '');
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

            if (typeof(this.options.renderEditMemu) == "function") {

                this.options.renderEditMemu.apply(this, [$('#' + this.options.id + '_edit_form')[0], this.eidtRowIndex, this.dataSourceObj.rows.length])
            } else {
                var htmlStr = '<div id="' + this.options.id + '_content_edit_menu" style="position:relative;float:left;width:100%;height:40px;"><button type="button" class="u-grid-content-edit-menu-button u-grid-content-edit-menu-button-ok" id="' + this.options.id + '_content_edit_menu_close">' + this.transMap.ml_close + '</button></div>';

                $('#' + this.options.id + '_edit_form')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                $('#' + this.options.id + '_content_edit_menu_close').on('click', function(e) {
                    oThis.editClose();
                });
            }
            // 处理左侧区域位置
            var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
            var color = $('#' + this.options.id + '_edit_form').css('background-color');
            if (this.options.multiSelect) {
                var $div = $('#' + this.options.id + '_content_multiSelect > div').eq(this.eidtRowIndex);
                var htmlStr = '<div class="grid_open_edit " id="' + this.options.id + '_multiSelect_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            if (this.options.showNumCol) {
                var $div = $('#' + this.options.id + '_content_numCol > .u-grid-content-num').eq(this.eidtRowIndex);
                var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="background-color:' + color + ';float:left;position:relative;width:' + this.numWidth + 'px;"></div>';
                $div[0].insertAdjacentHTML('afterEnd', htmlStr);
            }
            $('#' + this.options.id + '_content_edit_menu').css('display', 'block');


            if (this.fixedWidth > 0) {
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
const re_editClose = function() {
    var dohideFlag = true; //标记是否执行过hide、blur事件
    if (this.eidtRowIndex < 0 || this.editColIndex < 0)
        return;
    var row = this.dataSourceObj.rows[this.eidtRowIndex];
    var editField = this.gridCompColumnArr[this.editColIndex].options.field;
    var inputDom = null;
    //在chrome下
    // if (dohideFlag && this.editComp && this.editComp.hide) {
    // 	this.editComp.hide();
    // 	dohideFlag = false;
    // }

    // try {
    // 	var inputDom = this.editComp.element.parentNode.querySelector('input');
    // } catch (e) {}

    // if (dohideFlag && inputDom) {
    // 	inputDom.blur();
    // 	dohideFlag = false;
    // }

    // if (dohideFlag && this.editComp && this.editComp.comp && this.editComp.comp.hide) {
    // 	this.editComp.comp.hide();
    // 	dohideFlag = false;
    // }
    // 按理说应该是使用dohideFlag做为标志，调用hide方法就不走blur（即上面注释那段）。但是为了兼容ie在第一行输入‘32424’，点击第二行，在回到一行就不可输入了
    if (this.editComp && this.editComp.hide) {
        this.editComp.hide();
        dohideFlag = false;
    }

    try {
        var inputDom = this.editComp.element.parentNode.querySelector('input');
    } catch (e) {}

    if (inputDom) {
        inputDom.blur();
        dohideFlag = false;
    }

    if (this.editComp && this.editComp.comp && this.editComp.comp.hide) {
        this.editComp.comp.hide();
        dohideFlag = false;
    }
    try {
        $('#' + this.options.id + '_placeholder_div').remove();
    } catch (e) {

    }

    if (!row)
        return;
    if (this.options.editType != 'form') {
        //this.repaintRow(this.eidtRowIndex);
        var obj = {};
        obj.begin = this.eidtRowIndex;
        obj.length = 1;
        obj.field = editField;
        this.renderTypeFun(obj);
    }

    $('#' + this.options.id + '_content_edit_menu').css('display', 'none');
    this.repairSumRow();
    this.noRowsShowFun();
    this.updateLastRowFlag();
    this.eidtRowIndex = -1;
    // form形式删除对应区域,存在切换编辑形式的情况，所以一直删除
    // if(this.options.editType == 'form'){
    $('#' + this.options.id + '_multiSelect_edit').remove(null, true);
    $('#' + this.options.id + '_numCol_edit').remove(null, true);
    $('#' + this.options.id + '_edit_tr').remove(null, true);
    $('#' + this.options.id + '_edit_tr1').remove(null, true);
    // }
};
/*
 * 编辑单元格
 */
const editCell = function(obj) {
    var td = obj.td;
    var value = obj.value;
    var field = obj.field;
    var editType = obj.editType;
    var rowObj = obj.rowObj;
    var $tr = obj.$tr;
    var colIndex = obj.colIndex;
    var oThis = this;
    if (obj.colIndex == 0) {
        try {
            this.iconSpan = '';
            this.iconSpan = $(td).find('.uf')[0].outerHTML;
        } catch (e) {

        }
    } else {
        this.iconSpan = '';
    }



    var obj = {};
    obj.td = td;
    obj.field = field;
    obj.$tr = $tr;
    obj.colIndex = colIndex;
    oThis.newEditObj = obj;

    if (editType == 'text') {
        if (this.options.editType == 'default') {
            td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value + '" field="' + field + '" style="width:100%;margin:0px;min-height:20px;font-size:12px;color:#444"></div></div>';
        } else {
            td.innerHTML = '<div class="u-grid-content-td-div" style="position: relative; left: 0px;"><div class="eType-input"><input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value + '" field="' + field + '"></div></div>';
        }
        $('input', $(td)).on('blur', function() {
            oThis.editValueChange(field, this.value);
        });
    } else if (typeof editType == 'function') {
        var obj = {};
        var $Div = $('.u-grid-content-td-div', $(td));
        $Div.removeClass('u-grid-content-td-div-over');
        obj.gridObj = this;
        obj.element = $Div[0];
        if (this.options.editType == 'default') {
            // 对于高度被撑开的情况需要放一个 div来把整体撑开
            var nowHeight = obj.element.offsetHeight;
            var editDivHtml = '<div id="' + this.options.id + '_placeholder_div" class="u-grid-edit-placeholder-div" style="height:' + nowHeight + 'px;"></div>';
            $Div[0].innerHTML = editDivHtml;
            obj.element = $('#' + this.options.id + '_placeholder_div')[0];
        }
        obj.value = value;
        obj.field = field;
        obj.rowObj = rowObj;
        editType.call(this, obj);
    }
    // input输入blur时显示下一个编辑控件
    $('input', $(td)).off('keydown');
    $('input', $(td)).on('keydown', function(e) {
        if (oThis.options.editType == 'form') {

        } else {
            var keyCode = e.keyCode;
            if (e.keyCode == 13 || e.keyCode == 9) { // 回车
                this.blur(); //首先触发blur来将修改值反应到datatable中
                // IE11会导致先触发nextEditShow后触发blur的处理
                setTimeout(function() {
                    oThis.nextEditShow();
                }, 100);
                u.stopEvent(e);
            }
        }

    });
    if (this.options.editType == 'default')
        $('input:first', $(td)).focus()


};
/*
 * 触发下一个编辑单元格
 */
const nextEditShow = function() {
    var obj = this.newEditObj;
    var td = obj.td;
    var $tr = obj.$tr;
    var colIndex = parseInt(obj.colIndex) + 1;
    // 如果是最后一列则换行
    if ($(td).next('td').length == 0) {
        var $nextTr = $tr.next('tr')
        if ($nextTr.length > 0) {
            $tr = $nextTr;
            colIndex = 0;
            $tr.click(); //触发下一行的焦点
        } else {
            return;
        }
    }


    colIndex = _getNextEditColIndex(this, colIndex, $tr);
    var column = this.gridCompColumnArr[colIndex];
    if (column) {
        this.editRowFun($tr, colIndex);
    } else {
        var $nextTr = $tr.next('tr')
        if ($nextTr.length > 0) {
            $tr = $nextTr;
            colIndex = 0;
            $tr.click(); //触发下一行的焦点
        } else {
            return;
        }
        colIndex = _getNextEditColIndex(this, colIndex, $tr);
        var column = this.gridCompColumnArr[colIndex];
        if (column) {
            this.editRowFun($tr, colIndex);
        }
    }

};

const _getNextEditColIndex = function(gridObj, nowIndex, $tr) {
    // 如果下一列为隐藏/不可修改/复选框则跳到下一个
    var colIndex = -1;
    var column = gridObj.gridCompColumnArr[nowIndex];
    var beforeFlag = true;
    var index = gridObj.getTrIndex($tr);
    if (typeof gridObj.options.onBeforeEditFun == 'function') {
        var obj = {};
        obj.gridObj = gridObj;
        obj.rowObj = gridObj.dataSourceObj.rows[index];
        obj.rowIndex = index;
        obj.colIndex = nowIndex;
        obj.$tr = $tr;
        if (!gridObj.options.onBeforeEditFun(obj)) {
            beforeFlag = false
        }
    }
    if ((column && column.options && !column.options.visible) || (column && column.options && !column.options.editable) || !beforeFlag) {
        colIndex = _getNextEditColIndex(gridObj, nowIndex + 1, $tr);
    } else {
        colIndex = nowIndex;
    }
    return colIndex;
};
const editValueChange = function(field, value) {
    // 设置row的值为新值
    if (this.eidtRowIndex > -1 && this.eidtRowIndex < this.dataSourceObj.rows.length) {
        this.updateValueAt(this.eidtRowIndex, field, value);
    }

};
const re_updateEditRowIndex = function(opType, opIndex, num) {
    if (this.eidtRowIndex < 0) return;
    if (opType == '-') {
        if (opIndex < this.eidtRowIndex) {
            this.eidtRowIndex--;
        } else if (opIndex == this.eidtRowIndex) {
            this.eidtRowIndex = -1;
        }
    } else if (opType == '+') {
        num === undefined && (num = 1)
        if (opIndex <= this.eidtRowIndex) {
            this.eidtRowIndex += num;
        }
    }
};
const re_updateValueAtEdit = function(rowIndex, field, value, force) {
    if (this.eidtRowIndex == rowIndex) {
        if (this.options.editType == 'form') {

        } else {
            if (this.gridCompColumnArr[this.editColIndex].options.field == field)
                this.eidtRowIndex = -1; //下拉选中之后eidtRowIndex依然为原来的值，后续需要判断修改列
        }

        if ($('#' + this.options.id + "_edit_field_" + field).length > 0) {
            if ($('#' + this.options.id + "_edit_field_" + field)[0].type == 'checkbox') {
                if (value == 'Y' || value == 'true' || value === true) {
                    $('#' + this.options.id + "_edit_field_" + field)[0].checked = true;
                } else {
                    $('#' + this.options.id + "_edit_field_" + field)[0].checked = false;
                }
            } else {
                $('#' + this.options.id + "_edit_field_" + field)[0].value = value;
            }
        }
    }
};
/*
 * 根据filed设置editType
 */
const setEditType = function(field, editType) {
    var gridCompColumn = this.getColumnByField(field);
    gridCompColumn.options.editType = editType;
};
/*
 * 设置是否可修改
 */
const setEditable = function(editable) {
    this.options.editable = editable;
    this.setColumnEdit();
    this.editClose();
};

const setColumnEdit = function() {
    var i;
    for (i = 0; i < this.gridCompColumnArr.length; i++) {

        this.editFieldIcon(this.gridCompColumnArr[i]);
    }

    for (i = 0; i < this.gridCompColumnFixedArr.length; i++) {

        this.editFieldIcon(this.gridCompColumnFixedArr[i]);
    }
}

const editFieldIcon = function(column) {
    var fieldDom = $('.u-grid-header-link[field=' + column.options.field + ']');
    var fieldEditIconDom = fieldDom.find('.uf-fontselectioneditor');
    if (this.options.showEditIcon && this.options.editable && column.options.editable) {

        if (!fieldEditIconDom) {
            fieldDom.append('<i class="uf uf-fontselectioneditor"></i>');
        }
        fieldDom.removeClass('u-grid-hide-title-icon');

    } else {
        fieldDom.addClass('u-grid-hide-title-icon');
    }

}

const edit_initEventFun = function() {
    var oThis = this;
    $(document).on('click', function(e) {
        if (oThis.options.editable && oThis.options.editType == 'default') {
            var $e = $(e.target);
            var flag = true;
            flag = $(e.target).closest('.u-grid-content-td-div').length > 0 ? false : flag;
            var cusStr = oThis.options.customEditPanelClass
            if (cusStr) {
                var cArr = cusStr.split(',');
                $.each(cArr, function() {
                    flag = $e.closest('.' + this).length > 0 ? false : flag;
                });
            }
            if ($e.attr('role') == 'grid-for-edit') {
                flag = false;
            }
            if ($e.parent().length == 0) {
                flag = false;
            }
            if (flag) {
                oThis.editClose();
            }
        }
    });

    u.on(document, 'scroll', function() {
        if (oThis.options.editType == 'default') {
            if (gridBrowser.isIE10 || gridBrowser.isIPAD) {

            } else {
                oThis.editClose();
            }

        }
    })
    // 为所有div添加监听，滚动时执行editClose
    $('div').on('scroll', function() {
        if (oThis.options.editType == 'default') {
            if (gridBrowser.isIE10 || gridBrowser.isIPAD) {

            } else {
                oThis.editClose();
            }
        }
    })
};
const setGridEditType = function(newEditType) {
    this.options.editType = newEditType;
}
const setGridEditTypeAndEditRow = function(newEditType, rowIndex, colIndex) {
    this.options.editType = newEditType;
    var $contentBody = $('#' + this.options.id + '_content_tbody');
    var $tr = $('tr:eq(' + rowIndex + ')', $contentBody)
    this.editRowFun($tr, colIndex)
}

// 如果可编辑增加修改图标
const editHeadTitleIcon = function(column) {

    if (this.options.showEditIcon && 　this.options.editable && column.options.editable) {
        column.options.title += '<i class="uf uf-fontselectioneditor"></i>';
    }
}

export const eidtFunObj = {
    hideEditMenu: re_hideEditMenu,
    clickFunEdit: re_clickFunEdit,
    editRowFun: editRowFun,
    editRowIndexFun: editRowIndexFun,
    editRow: editRow,
    editClose: re_editClose,
    editCell: editCell,
    nextEditShow: nextEditShow,
    editValueChange: editValueChange,
    updateEditRowIndex: re_updateEditRowIndex,
    updateValueAtEdit: re_updateValueAtEdit,
    setEditType: setEditType,
    setEditable: setEditable,
    setColumnEdit: setColumnEdit,
    editFieldIcon: editFieldIcon,
    setGridEditType: setGridEditType,
    setGridEditTypeAndEditRow: setGridEditTypeAndEditRow,
    editHeadTitleIcon: editHeadTitleIcon,
    edit_initEventFun: edit_initEventFun
}
