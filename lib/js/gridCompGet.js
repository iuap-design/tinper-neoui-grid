'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 * 获取某列对应属性
 */
var getColumnAttr = function getColumnAttr(attr, field) {
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return $(this.gridCompColumnArr[i].options).attr(attr);
        }
    }
    return "";
};
/*
 * 根据field获取gridcompColumn对象
 */
var getColumnByField = function getColumnByField(field) {
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return this.gridCompColumnArr[i];
        }
    }
    return null;
};
/*
 * 获取column属于第几列
 */
var getIndexOfColumn = function getIndexOfColumn(column) {
    var index = -1;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i] == column) {
            index = i;
            break;
        }
    }
    return index;
};
/*
 * 获取column属于当前显示第几列
 */
var getVisibleIndexOfColumn = function getVisibleIndexOfColumn(column) {
    var index = -1;
    var j = 0;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i] == column) {
            if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
                index = j;
            }
            break;
        }
        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
            j++;
        }
    }
    return index;
};
/*
 * 获取column后面第一个显示列所在第几列
 */
var getNextVisibleInidexOfColumn = function getNextVisibleInidexOfColumn(column) {
    var index = -1,
        flag = false,
        j = 0;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i] == column) {
            if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {

                j++;
            }
            flag = true;
        }
        if (flag == true && !($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
            index = j;
            break;
        }
        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {

            j++;
        }
    }
    return index;
};

/*
 * 获取选中行
 */
var getSelectRows = function getSelectRows() {
    return this.selectRows;
};
/*
 * 获取选中行对应行号
 */
var getSelectRowsIndex = function getSelectRowsIndex() {
    return this.selectRowsIndex;
};

/*
 * 获取focus行
 */
var getFocusRow = function getFocusRow() {
    return this.focusRow;
};
/*
 * 获取focus行对应行号
 */
var getFocusRowIndex = function getFocusRowIndex() {
    return this.focusRowIndex;
};
/*
 * 获取所有行
 */
var getAllRows = function getAllRows() {
    var oThis = this;
    this.allRows = new Array();
    if (this.dataSourceObj.rows) {
        $.each(this.dataSourceObj.rows, function () {
            oThis.allRows.push(this.value);
        });
    }
    return this.allRows;
};
/*
 * 根据行号获取row
 */
var getRowByIndex = function getRowByIndex(index) {
    return this.dataSourceObj.rows[index];
};
/*
 * 根据某个字段值获取rowIndex
 */
var getRowIndexByValue = function getRowIndexByValue(field, value) {
    var index = -1;
    $.each(this.dataSourceObj.rows, function (i) {
        var v = $(this.value).attr(field);
        if (v == value) {
            index = i;
        }
    });
    return index;
};

var getChildRowIndex = function getChildRowIndex(row) {
    var result = [];
    $.each(row.childRow, function () {
        result.push(this.valueIndex);
    });
    return result;
};

var getColumnByVisibleIndex = function getColumnByVisibleIndex(index) {
    var nowIndex = -1;
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        var column = this.gridCompColumnArr[i];
        if (!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')) {
            nowIndex++;
        }
        if (nowIndex == index) {
            return column;
        }
    }
    return null;
};

exports.getColumnAttr = getColumnAttr;
exports.getColumnByField = getColumnByField;
exports.getIndexOfColumn = getIndexOfColumn;
exports.getVisibleIndexOfColumn = getVisibleIndexOfColumn;
exports.getNextVisibleInidexOfColumn = getNextVisibleInidexOfColumn;
exports.getSelectRows = getSelectRows;
exports.getSelectRowsIndex = getSelectRowsIndex;
exports.getFocusRow = getFocusRow;
exports.getFocusRowIndex = getFocusRowIndex;
exports.getAllRows = getAllRows;
exports.getRowByIndex = getRowByIndex;
exports.getRowIndexByValue = getRowIndexByValue;
exports.getChildRowIndex = getChildRowIndex;
exports.getColumnByVisibleIndex = getColumnByVisibleIndex;