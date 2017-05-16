// 后续和createSumRow整合
var createContentGroupSumRow = function createContentGroupSumRow(groupRow, createFlag) {
    if (this.options.groupSumRow) {
        var oThis = this,
            idStr,
            groupValue = groupRow.value;
        if (createFlag == 'fixed') {
            idStr = 'fixed_';
        } else {
            idStr = '';
        }
        var htmlStr = '<tr role="groupsumrow" groupValue="' + groupValue + '" class="u-grid-content-group-sum-row" id="' + this.options.id + '_content_' + idStr + 'group_sum_row_' + groupValue + '">';
        htmlStr += createContentGroupSumRowTd.call(this, groupRow, createFlag);
        htmlStr += '</tr>';
        return htmlStr;
    }
};

var createContentGroupSumRowTd = function createContentGroupSumRowTd(groupRow, createFlag) {
    var htmlStr = '',
        oThis = this,
        gridCompColumnArr;
    if (createFlag == 'fixed') {
        gridCompColumnArr = this.gridCompColumnFixedArr;
    } else {
        gridCompColumnArr = this.gridCompColumnArr;
    }
    $.each(gridCompColumnArr, function () {
        var f = this.options.field;
        var precision = this.options.precision;
        var dataType = this.options.dataType;
        var sumValue = oThis.dataSourceObj.getGroupSumValue(f, this, groupRow);
        if (dataType == 'float') {
            var o = {};
            o.value = sumValue;
            o.precision = precision ? precision : 2;
            sumValue = oThis.DicimalFormater(o);
        }
        var tdStyle = '';
        if (!this.options.visible) {
            tdStyle = 'style="display:none;';
            if (oThis.options.rowHeight) {
                tdStyle += 'height:' + oThis.options.rowHeight + 'px;line-height:' + oThis.options.rowHeight + 'px;';
            }
            tdStyle += '"';
        } else {
            if (oThis.options.rowHeight) {
                tdStyle += 'style="height:' + oThis.options.rowHeight + 'px;line-height:' + oThis.options.rowHeight + 'px;"';
            }
        }
        htmlStr += '<td role="groupsumrowcell"  title="' + sumValue + '" ' + tdStyle + '>';
        if (this.firstColumn) {
            htmlStr += '<div class="u-gird-centent-group-sum-div"><span>' + oThis.transMap.ml_group_sum + '</span></div>';
        }
        var contentStyle = '';
        if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
            contentStyle = 'style="text-align: right;"';
        }
        htmlStr += '<div class="u-grid-content-td-div" ' + contentStyle + '><span value="' + sumValue + '">' + sumValue + '</span></div></td>';
    });
    return htmlStr;
};

var createContentLetGroupSumRow = function createContentLetGroupSumRow(type, groupValue) {
    var w;
    if (type == 'multiSelect') w = this.multiSelectWidth;
    if (type == 'numCol') w = this.numWidth;
    var wStr = 'width:' + w + 'px;';
    var html = '<span groupValue="' + groupValue + '" class="u-grid-content-group-sum-left" style=" ' + wStr + '"></span>';
    return html;
};

var repairGroupSumRow = function repairGroupSumRow(rowObj) {
    if (this.options.groupSumRow) {
        var oThis = this,
            groupField = this.options.groupField,
            groupValue = rowObj.value[groupField];
        if (!this.repairGroupSumRowArr) {
            this.repairGroupSumRowArr = [];
        }
        if (this.repairGroupSumRowArr.indexOf(groupValue) < 0) {
            this.repairGroupSumRowArr.push(groupValue);
        }
        if (this.re_repairGroupSumRowSetTimeout) clearTimeout(this.re_repairGroupSumRowSetTimeout);
        this.re_repairGroupSumRowSetTimeout = setTimeout(function () {
            repairGroupSumRowFun.call(oThis);
        }, 200);
    }
};

var repairGroupSumRowFun = function repairGroupSumRowFun() {
    var oThis = this;
    if (this.repairGroupSumRowArr && this.repairGroupSumRowArr.length > 0 && this.options.groupSumRow) {
        $.each(this.repairGroupSumRowArr, function () {
            var groupValue = this,
                groupRow = oThis.getGroupRowByGroupValue(groupValue);
            if (groupRow) {
                var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr[groupValue=' + groupValue + ']');
                if ($tr.length > 0) {
                    var htmlStr = createContentGroupSumRowTd.call(oThis, groupRow);
                    $tr.html(htmlStr);
                } else {
                    var htmlStr = oThis.createContentGroupSumRow(groupRow);
                    var $tds = $('#' + oThis.options.id + '_content_tbody').find("td:contains(" + groupValue + ")");
                    if ($tds.length > 0) {
                        var td = $tds[$tds.length - 1];
                        var $tr = $(td).closest('tr');
                        var index = $tr.parent().find('tr[role="row"]').index($tr[0]);
                        $tr[0].insertAdjacentHTML('afterEnd', htmlStr);
                        if (oThis.options.multiSelect) {
                            var mulStr = oThis.createContentLetGroupSumRow('multiSelect', groupValue);
                            var muldiv = $('#' + oThis.options.id + '_content_multiSelect').find('div')[index];
                            muldiv.insertAdjacentHTML('afterEnd', mulStr);
                        }
                        if (oThis.options.showNumCol) {
                            var numStr = oThis.createContentLetGroupSumRow('numCol', groupValue);
                            var numdiv = $('#' + oThis.options.id + '_content_numCol').find('div')[index];
                            numdiv.insertAdjacentHTML('afterEnd', numStr);
                        }
                    }
                }
            } else {
                var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr[groupValue=' + groupValue + ']');
                if ($tr.length > 0) {
                    $tr.remove();
                    if (oThis.options.showNumCol) {
                        var $span = $('#' + oThis.options.id + '_content_numCol').find('span[groupValue=' + groupValue + ']');
                        $span.remove();
                    }
                    if (oThis.options.multiSelect) {
                        var $span = $('#' + oThis.options.id + '_content_multiSelect').find('span[groupValue=' + groupValue + ']');
                        $span.remove();
                    }
                }
            }
        });
        this.resetLeftHeightGroupSumFun();
    }
    this.repairGroupSumRowArr = [];
};

var resetLeftHeightGroupSumFun = function resetLeftHeightGroupSumFun() {
    if ((this.options.showNumCol || this.options.multiSelect) && this.options.groupSumRow) {
        var $trs = $('#' + this.options.id + '_content_tbody tr[role="groupsumrow"]');
        var $leftNums = $('#' + this.options.id + '_content_numCol span');
        var $leftSelects = $('#' + this.options.id + '_content_multiSelect > span');
        for (var i = 0; i < $trs.length; i++) {
            var nowRowHeight = $trs[i].offsetHeight;
            if ($leftNums[i]) {
                $leftNums[i].style.height = nowRowHeight + 'px';
                // $leftNums[i].style.lineHeight = nowRowHeight + 'px';
            }

            if ($leftSelects[i]) {
                $leftSelects[i].style.height = nowRowHeight + 'px';
                // $leftSelects[i].style.lineHeight = nowRowHeight + 'px';
            }
        }
    }
};

var renderTypeGroupSumRow = function renderTypeGroupSumRow(gridCompColumn, i, isFixedColumn, rowObj) {
    var oThis = this;
    var sumCol = gridCompColumn.options.sumCol;
    var groupField = this.options.groupField;
    if (sumCol && groupField) {
        var groupValue = this.getString($(rowObj.value).attr(groupField), '');
        var groupSumRenderType = gridCompColumn.options.groupSumRenderType;
        var dataType = gridCompColumn.options.dataType;
        var idStr = isFixedColumn === true ? 'fixed_' : '';
        var sumSpans = $('#' + this.options.id + '_content_' + idStr + 'group_sum_row_' + groupValue).find('td').eq(i).find('span');
        var sumSpan = sumSpans[sumSpans.length - 1];
        if (sumSpan) {
            if (typeof groupSumRenderType == 'function') {
                var sumV = $(sumSpan).attr('value');
                var obj = {};
                obj.value = sumV;
                obj.element = sumSpan;
                obj.gridObj = oThis;
                obj.gridCompColumn = gridCompColumn;
                groupSumRenderType.call(oThis, obj);
            } else if (dataType == 'integer' || dataType == 'float') {
                sumSpan.style.textAlign = 'right';
            }
        }
    }
};
export var groupSumRowFunObj = {
    createContentGroupSumRow: createContentGroupSumRow,
    createContentLetGroupSumRow: createContentLetGroupSumRow,
    repairGroupSumRow: repairGroupSumRow,
    resetLeftHeightGroupSumFun: resetLeftHeightGroupSumFun,
    renderTypeGroupSumRow: renderTypeGroupSumRow
};