/*
 * 获取某列对应属性
 */
const getColumnAttr = function(attr, field) {
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return $(this.gridCompColumnArr[i].options).attr(attr);
        }
    }
    for (var i = 0; i < this.gridCompColumnFixedArr.length; i++) {
        if (this.gridCompColumnFixedArr[i].options.field == field) {
            return $(this.gridCompColumnFixedArr[i].options).attr(attr);
        }
    }
    return "";
};
/*
 * 根据field获取gridcompColumn对象
 */
const getColumnByField = function(field) {
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return this.gridCompColumnArr[i];
        }
    }
    for (var i = 0; i < this.gridCompColumnFixedArr.length; i++) {
        if (this.gridCompColumnFixedArr[i].options.field == field) {
            return this.gridCompColumnFixedArr[i];
        }
    }

    return null;
};
/*
 * 获取column属于第几列
 */
const getIndexOfColumn = function(column) {
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
const getVisibleIndexOfColumn = function(column) {
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
const getNextVisibleInidexOfColumn = function(column) {
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
const getSelectRows = function() {
    return this.selectRows;
};
/*
 * 获取选中行对应行号
 */
const getSelectRowsIndex = function() {
    return this.selectRowsIndex;
};

/*
 * 获取focus行
 */
const getFocusRow = function() {
    return this.focusRow;
};
/*
 * 获取focus行对应行号
 */
const getFocusRowIndex = function() {
    return this.focusRowIndex;
};
/*
 * 获取所有行
 */
const getAllRows = function() {
    var oThis = this;
    this.allRows = new Array();
    if (this.dataSourceObj.rows) {
        $.each(this.dataSourceObj.rows, function() {
            oThis.allRows.push(this.value);
        });
    }
    return this.allRows;
};
/*
 * 根据行号获取row
 */
const getRowByIndex = function(index) {
    return this.dataSourceObj.rows[index];
};
/*
 * 根据某个字段值获取rowIndex
 */
const getRowIndexByValue = function(field, value) {
    var index = -1;
    $.each(this.dataSourceObj.rows, function(i) {
        // var v = $(this.value).attr(field);
        var v = this.value[field];
        if (v == value) {
            index = i;
        }
    })
    return index;
};

const getChildRowIndex = function(row) {
    var result = [];
    $.each(row.childRow, function() {
        result.push(this.valueIndex)
    });
    return result;
}

const getColumnByVisibleIndex = function(index) {
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
}


export const getFunObj = {
    getColumnAttr: getColumnAttr,
    getColumnByField: getColumnByField,
    getIndexOfColumn: getIndexOfColumn,
    getVisibleIndexOfColumn: getVisibleIndexOfColumn,
    getNextVisibleInidexOfColumn: getNextVisibleInidexOfColumn,
    getSelectRows: getSelectRows,
    getSelectRowsIndex: getSelectRowsIndex,
    getFocusRow: getFocusRow,
    getFocusRowIndex: getFocusRowIndex,
    getAllRows: getAllRows,
    getRowByIndex: getRowByIndex,
    getRowIndexByValue: getRowIndexByValue,
    getChildRowIndex: getChildRowIndex,
    getColumnByVisibleIndex: getColumnByVisibleIndex,
}
