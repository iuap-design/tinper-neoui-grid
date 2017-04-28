/*
 * 处理参数
 */
var init = function init(options, gridComp) {
    this.defaults = {};
    this.gridComp = gridComp;
    this.options = $.extend({}, this.defaults, options);
    this.rows = new Array(); // 存储数据行
    this.hasParentRows = new Array(); // 存在父项
    this.nothasParentRows = new Array(); // 不存在父项
};
/*
 * 将values转化为rows并进行排序
 */
var sortRows = function sortRows(field, sortType) {
    if (typeof this.gridComp.options.filterDataFun == 'function') {
        this.options.values = this.gridComp.options.filterDataFun.call(this, this.options.values);
    }
    if (this.gridComp.options.showTree) {
        this.treeSortRows(field, sortType);
    } else {
        this.basicSortRows(field, sortType);
    }
    this.gridComp.eidtRowIndex = -1;
};
/*
 * 将values转化为rows并进行排序(标准)
 */
var basicSortRows = function basicSortRows(field, sortType) {
    var oThis = this,
        dataType = "";
    if (field) {
        dataType = this.gridComp.getColumnByField(field).options.dataType;
    }
    this.rows = new Array();
    if (this.options.values) {
        $.each(this.options.values, function (i) {
            var rowObj = {};
            rowObj.value = this;
            rowObj.valueIndex = i;
            oThis.rows.push(rowObj);
        });
    }
};
var treeSortRows = function treeSortRows(field, sortType) {
    this.basicSortRows(field, sortType);
};
/*
 * 获取合计值
 */
var getSumValue = function getSumValue(field, gridCompColumn, gridComp) {
    var sumValue = null;
    if (gridCompColumn.options.sumCol) {
        $.each(this.rows, function (i) {
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
export var initFunObj = {
    init: init,
    sortRows: sortRows,
    basicSortRows: basicSortRows,
    treeSortRows: treeSortRows,
    getSumValue: getSumValue
};