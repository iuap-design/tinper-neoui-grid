var createContentGroupRows = function createContentGroupRows(createFlag) {
    var htmlStr = '',
        oThis = this;
    if (this.options.groupField && this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function (i) {
            $.each(this.rows, function () {
                htmlStr += oThis.createContentOneRow(this, createFlag);
            });
            if (oThis.options.groupSumRow) htmlStr += oThis.createContentGroupSumRow(this, createFlag);
        });
    }
    return htmlStr;
};

var createContentLeftMultiSelectGroupRows = function createContentLeftMultiSelectGroupRows() {
    var htmlStr = '',
        oThis = this;
    if (this.options.groupField && this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function (i) {
            if (this.rows && this.rows.length > 0) {
                $.each(this.rows, function () {
                    htmlStr += oThis.createContentLeftMultiSelectRow(this);
                });
                if (oThis.options.groupSumRow) htmlStr += oThis.createContentLetGroupSumRow('multiSelect', this.value);
            }
        });
    }
    return htmlStr;
};

var createContentLeftNumColGroupRows = function createContentLeftNumColGroupRows() {
    var htmlStr = '',
        oThis = this,
        index = 0;
    if (this.options.groupField && this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function (i) {
            if (this.rows && this.rows.length > 0) {
                $.each(this.rows, function () {
                    htmlStr += oThis.createContentLeftNumColRow(index);
                    index++;
                });
                if (oThis.options.groupSumRow) htmlStr += oThis.createContentLetGroupSumRow('numCol', this.value);
            }
        });
    }
    return htmlStr;
};

var re_getGroupIndex = function re_getGroupIndex(row, index, rowObj) {
    var groupField = this.options.groupField,
        oThis = this;

    if (groupField) {
        // 对于已经渲染之后可以哦天哪过此方式处理
        // if (this.showType == 'grid') {
        //     var value = this.getString($(row).attr(groupField), '');
        //     var $tds = $("td:contains(" + value + ")");
        //     if ($tds.length > 0) {
        //         var td = $tds[$tds.length - 1];
        //         var $tr = $(td).closest('tr');
        //         var $table = $tr.closest('table');
        //         var index = $table.find('tr[role="row"]').index($tr[0]);
        //         return index;
        //     }
        // }else{
        var value = this.getString($(row).attr(groupField), '');
        var nowIndex = -1;
        this.dataSourceObj.addOneRowGroup(rowObj);

        $.each(this.dataSourceObj.rows, function (i) {
            var nowRow = this;
            var nowValue = oThis.getString($(nowRow.value).attr(groupField), '');
            if (value == nowValue) {
                nowIndex = i;
            } else {
                if (nowIndex > -1) {
                    return false;
                }
            }
        });
        if (nowIndex > -1) {
            return nowIndex + 1;
        } else {
            return nowIndex = this.dataSourceObj.rows.length;
        }
        // }
    }
    return index;
};

var getGroupRowByGroupValue = function getGroupRowByGroupValue(groupValue) {
    var groupRow;
    if (this.dataSourceObj.groupRows && this.dataSourceObj.groupRows.length > 0) {
        $.each(this.dataSourceObj.groupRows, function () {
            var nowGroupRow = this;
            if (nowGroupRow.value == groupValue) {
                groupRow = this;
                return false;
            }
        });
        return groupRow;
    }
};

var deleteOneRowGroup = function deleteOneRowGroup(rowObj) {
    var groupField = this.options.groupField,
        groupValue = rowObj.value[groupField];
    var groupRow = this.getGroupRowByGroupValue(groupValue);
    if (groupRow) {
        var index = groupRow.rows.indexOf(rowObj);
        groupRow.rows.splice(index, 1);
        if (groupRow.rows.length == 0) {
            var groupIndex = this.dataSourceObj.groupRows.indexOf(groupRow);
            this.dataSourceObj.groupRows.splice(groupIndex, 1);
        }
    }
};

var resetGroupFieldTd = function resetGroupFieldTd(groupValue) {
    var $tds = $('#' + this.options.id + '_content_table').find('td[realValue=' + groupValue + ']');
    var l = $tds.length;
    $tds.addClass('u-grid-content-td-group-field').addClass('no-text').removeClass('group-last');
    $($tds[l - 1]).addClass('group-last');
    $($tds[0]).css('line-height', l * this.options.rowHeight + 'px').removeClass('no-text');
};
export var groupFunObj = {
    createContentGroupRows: createContentGroupRows,
    createContentLeftMultiSelectGroupRows: createContentLeftMultiSelectGroupRows,
    createContentLeftNumColGroupRows: createContentLeftNumColGroupRows,
    getGroupIndex: re_getGroupIndex,
    getGroupRowByGroupValue: getGroupRowByGroupValue,
    deleteOneRowGroup: deleteOneRowGroup,
    resetGroupFieldTd: resetGroupFieldTd
};