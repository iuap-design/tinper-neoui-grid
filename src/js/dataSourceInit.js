/*
 * 处理参数
 */
const init = function(options, gridComp) {
    this.defaults = {}
    this.gridComp = gridComp;
    this.options = $.extend({}, this.defaults, options);
    this.rows = new Array(); // 存储数据行
    this.hasParentRows = new Array(); // 存在父项
    this.nothasParentRows = new Array(); // 不存在父项
};
/*
 * 将values转化为rows并进行排序
 */
const sortRows = function(field, sortType) {
    if (typeof this.gridComp.options.filterDataFun == 'function') {
        this.options.values = this.gridComp.options.filterDataFun.call(this, this.options.values);
    }
    if (this.gridComp.options.showTree) {
        this.treeSortRows(field, sortType);
    } else {
        this.basicSortRows(field, sortType);
    }
    this.gridComp.eidtRowIndex = -1;
    $.each(this.rows, function() {
        var row = this;
        $.each(self.gridComp.selectRows, function() {
            var selectRow = this;
            if (row.value['$_#_@_id'] == selectRow['$_#_@_id'])
                row.checked = true;
        })
    })
};
/*
 * 将values转化为rows并进行排序(标准)
 */
const basicSortRows = function(field, sortType) {
    var oThis = this,
        dataType = "";
    if (field) {
        dataType = this.gridComp.getColumnByField(field).options.dataType;
    }
    this.rows = new Array();
    this.groupRows = new Array();
    if (this.options.values) {
        $.each(this.options.values, function(i) {
            var rowObj = {};
            rowObj.value = this;
            rowObj.valueIndex = i;
            oThis.rows.push(rowObj);
            oThis.gridComp.getGroupIndex(this, i, rowObj);
            oThis.rows = oThis.getGroupRows();
        });
    }

};
const treeSortRows = function(field, sortType) {
    this.basicSortRows(field, sortType);
};
/*
 * 获取合计值
 */
const getSumValue = function(field, gridCompColumn, gridComp) {
    var sumValue = null;
    if (gridCompColumn.options.sumCol) {
        $.each(this.rows, function(i) {
            var v = $(this.value).attr(field);
            if (gridCompColumn.options.dataType == 'Int') {
                v = gridComp.getInt(v, 0);
                sumValue += parseInt(v);
            } else {
                v = gridComp.getFloat(v, 0);
                sumValue = gridComp.accAdd(sumValue, parseFloat(v));
            }
        });
    }
    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = sumValue;
        o.precision = gridCompColumn.options.precision;
        sumValue = gridComp.DicimalFormater(o);
    }
    if (sumValue != null && sumValue != undefined && sumValue != 'null' && sumValue != 'undefined') {
        return sumValue + '';
    } else {
        return '';
    }
};

const getGroupSumValue = function(field, gridCompColumn, groupRow) {
    var sumValue = null;
    var gridComp = this.gridComp;
    if (gridCompColumn.options.sumCol) {
        $.each(groupRow.rows, function(i) {
            var v = $(this.value).attr(field);
            if (gridCompColumn.options.dataType == 'Int') {
                v = gridComp.getInt(v, 0);
                sumValue += parseInt(v);
            } else {
                v = gridComp.getFloat(v, 0);
                sumValue = gridComp.accAdd(sumValue, parseFloat(v));
            }
        });
    }
    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = sumValue;
        o.precision = gridCompColumn.options.precision;
        sumValue = gridComp.DicimalFormater(o);
    }
    if (sumValue != null && sumValue != undefined && sumValue != 'null' && sumValue != 'undefined') {
        return sumValue + '';
    } else {
        return '';
    }
};

const addOneRowGroup = function(rowObj) {
    var groupField = this.gridComp.options.groupField,
        hasGroupFlag = false;
    if (groupField) {
        var groupValue = this.gridComp.getString($(rowObj.value).attr(groupField), '');
        if (!this.groupRows)
            this.groupRows = new Array();
        //[{value:1,length,rows:[{},{}]},{value:2,rows:[{},{}},{value:3,rows:[{},{}}]
        $.each(this.groupRows, function(i) {
            var nowGroup = this;
            if (nowGroup.value == groupValue) {
                hasGroupFlag = true
                nowGroup.length = parseInt(nowGroup.length) + 1;
                nowGroup.rows.push(rowObj);
            }
        });
        if (!hasGroupFlag) {
            var newGroupRow = {
                value: groupValue,
                length: 1,
                rows: [rowObj]
            }
            this.groupRows.push(newGroupRow);
        }
    }
};

const getGroupRows = function() {
    var groupField = this.gridComp.options.groupField,
        rows = [];
    if (groupField) {
        if (this.groupRows && this.groupRows.length > 0) {
            $.each(this.groupRows, function() {
                $.each(this.rows, function() {
                    rows.push(this);
                })
            })
        }

    } else {
        rows = this.rows;
    }
    return rows;
}
export const initFunObj = {
    init: init,
    sortRows: sortRows,
    basicSortRows: basicSortRows,
    treeSortRows: treeSortRows,
    getSumValue: getSumValue,
    getGroupSumValue: getGroupSumValue,
    addOneRowGroup: addOneRowGroup,
    getGroupRows: getGroupRows
}
