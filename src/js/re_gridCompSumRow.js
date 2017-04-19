const re_createContentRowsSumRow = function(createFlag) {
    var htmlStr = '';
    if (this.options.showSumRow && this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
        htmlStr += this.createSumRow(createFlag);
    }
    return htmlStr;
};
const re_createContentSumRow = function(bottonStr) {
    var htmlStr = '';
    // if(this.options.showSumRow){
    // 	htmlStr += '<div class="u-grid-content-left-sum-bottom" id="' + this.options.id + '_content_left_sum_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;'+bottonStr+'">';
    // 	htmlStr += '</div>';
    // }
    return htmlStr;
}
/*
 * 创建合计行
 */
const createSumRow = function(createFlag) {
    if (this.options.showSumRow) {
        var oThis = this,
            idStr, gridCompColumnArr;
        if (createFlag == 'fixed') {
            idStr = 'fixed_';
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            idStr = '';
            gridCompColumnArr = this.gridCompColumnArr;
        }
        var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
        t = t > 0 ? t : 0;
        var htmlStr = '<tr role="sumrow" class="u-grid-content-sum-row" id="' + this.options.id + '_content_' + idStr + 'sum_row" style="top:' + t + 'px;">';
        $.each(gridCompColumnArr, function() {
            var f = this.options.field;
            var precision = this.options.precision;
            var dataType = this.options.dataType;
            var sumValue = oThis.dataSourceObj.getSumValue(f, this, oThis);
            if (dataType == 'float') {
                var o = {};
                o.value = sumValue;
                o.precision = precision ? precision : 2;
                sumValue = oThis.DicimalFormater(o)
            }
            var tdStyle = '';
            if (!this.options.visible) {
                tdStyle = 'style="display:none;"';
            }
            htmlStr += '<td role="sumrowcell" title="' + sumValue + '" ' + tdStyle + '>';
            if (this.firstColumn) {
                htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transMap.ml_sum + '</span></div>';
            }
            var contentStyle = '';
            if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
                contentStyle = 'style="text-align: right;"'
            }
            htmlStr += '<div class="u-grid-content-td-div" ' + contentStyle + '><span value="' + sumValue + '">' + sumValue + '</span></div></td>';
        });
        htmlStr += '</tr>';
        return htmlStr;
    }
};

/*
 * 创建合计行 for ie
 */
const createSumRowForIE = function(table, createFlag) {
    if (this.options.showSumRow) {
        var oThis = this,
            idStr, gridCompColumnArr;
        if (createFlag == 'fixed') {
            idStr = 'fixed_';
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            idStr = '';
            gridCompColumnArr = this.gridCompColumnArr;
        }
        var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
        t = t > 0 ? t : 0;
        var row = table.insertRow();
        row.role = 'sumrow';
        row.className = 'u-grid-content-sum-row';
        row.id = this.options.id + '_content_' + idStr + 'sum_row';
        row.style.top = t + 'px';
        $.each(gridCompColumnArr, function() {
            var f = this.options.field;
            var precision = this.options.precision;
            var dataType = this.options.dataType;
            var sumValue = oThis.dataSourceObj.getSumValue(f, this, oThis);
            if (dataType == 'float') {
                var o = {};
                o.value = sumValue;
                o.precision = precision ? precision : 2;
                sumValue = oThis.DicimalFormater(o)
            }
            var newCell = row.insertCell();
            newCell.role = 'sumrowcell';
            newCell.title = sumValue;
            var contentStyle = '';
            if (this.options.dataType == 'integer' || this.options.dataType == 'float') {
                contentStyle = 'style="text-align: right;"'
            }

            var htmlStr = '<div class="u-grid-content-td-div" ' + contentStyle + '>';
            if (this.firstColumn) {
                htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transMap.ml_sum + '</span></div>';
            }
            htmlStr += '<span value="' + sumValue + '">' + sumValue + '</span></div>';
            newCell.insertAdjacentHTML('afterBegin', htmlStr);
        });
    }
};
/*
 * 重画合计行
 */
const re_repairSumRow = function() {
    var self = this;
    if (this.re_repairSumRowSetTimeout)
        clearTimeout(this.re_repairSumRowSetTimeout)
    this.re_repairSumRowSetTimeout = setTimeout(function() {
        re_repairSumRowFun.call(self);
    }, 100)

};

const re_repairSumRowFun = function() {
    if (this.options.showSumRow) {
        $('#' + this.options.id + '_content_div tbody .u-grid-content-sum-row').remove();
        $('#' + this.options.id + '_content_fixed_div tbody .u-grid-content-sum-row').remove();
        try {
            if (this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0) {
                var htmlStr = this.createSumRow();
                if (this.options.sumRowFirst) {
                    $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                } else {
                    $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                }
                var htmlStr = this.createSumRow('fixed');
                if ($('#' + this.options.id + '_content_fixed_div tbody')[0]) {
                    if (this.options.sumRowFirst) {
                        $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                    } else {
                        $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                    }
                }

            }
        } catch (e) {
            var table = $('#' + this.options.id + '_content_div table')[0];
            var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
            this.createSumRowForIE(table);
            this.createSumRowForIE(table, 'fixed');
        }
        this.renderSumRow();
    }
}

const renderSumRow = function() {
    var oThis = this;
    $.each(this.gridCompColumnFixedArr, function(i) {
        var sumCol = this.options.sumCol;
        var sumRenderType = this.options.sumRenderType;
        var idStr = 'fixed_';
        if (sumCol) {
            var sumSpans = $('#' + oThis.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
            var sumSpan = sumSpans[sumSpans.length - 1];
            if (sumSpan) {
                if (typeof sumRenderType == 'function') {
                    var sumV = $(sumSpan).attr('value');
                    var obj = {};
                    obj.value = sumV;
                    obj.element = sumSpan;
                    obj.gridObj = oThis;
                    obj.gridCompColumn = this;
                    sumRenderType.call(oThis, obj);
                } else if (dataType == 'integer' || dataType == 'float') {
                    sumSpan.style.textAlign = 'right';
                }
            }
        }
    });
    $.each(this.gridCompColumnArr, function(i) {
        var sumCol = this.options.sumCol;
        var dataType = this.options.dataType;
        var sumRenderType = this.options.sumRenderType;
        var idStr = '';
        if (sumCol) {
            var sumSpans = $('#' + oThis.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
            var sumSpan = sumSpans[sumSpans.length - 1];
            if (sumSpan) {
                if (typeof sumRenderType == 'function') {
                    var sumV = $(sumSpan).attr('value');
                    var obj = {};
                    obj.value = sumV;
                    obj.element = sumSpan;
                    obj.gridObj = oThis;
                    obj.gridCompColumn = this;
                    sumRenderType.call(oThis, obj);
                } else if (dataType == 'integer' || dataType == 'float') {
                    sumSpan.style.textAlign = 'right';
                }
            }
        }
    });
};

const re_renderTypeSumRow = function(gridCompColumn, i, begin, length, isFixedColumn) {
    var oThis = this;
    var sumCol = gridCompColumn.options.sumCol;
    var sumRenderType = gridCompColumn.options.sumRenderType;
    var dataType = gridCompColumn.options.dataType;
    var idStr = isFixedColumn === true ? 'fixed_' : '';
    if (sumCol) {
        var sumSpans = $('#' + this.options.id + '_content_' + idStr + 'sum_row').find('td').eq(i).find('span');
        var sumSpan = sumSpans[sumSpans.length - 1];
        if (sumSpan) {
            if (typeof sumRenderType == 'function') {
                var sumV = $(sumSpan).attr('value');
                var obj = {};
                obj.value = sumV;
                obj.element = sumSpan;
                obj.gridObj = oThis;
                obj.gridCompColumn = gridCompColumn;
                sumRenderType.call(oThis, obj);
            } else if (dataType == 'integer' || dataType == 'float') {
                sumSpan.style.textAlign = 'right';
            }
        }
    }
};

// 增加预制render
window.maxSumRender = function maxSumRender(opt) {
    var gridComp = opt.gridObj;
    var gridCompColumn = opt.gridCompColumn;
    var field = gridCompColumn.options.field;
    var element = opt.element;
    var nowMax;
    $.each(gridComp.dataSourceObj.rows, function(i) {
        var v = $(this.value).attr(field);
        if (gridCompColumn.options.dataType == 'Int') {
            v = gridComp.getInt(v, 0);
        } else {
            v = gridComp.getFloat(v, 0);
        }
        if (typeof nowMax == 'undefined') {
            nowMax = v;
        } else {
            if (v > nowMax) nowMax = v;
        }
    });

    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = nowMax;
        o.precision = gridCompColumn.options.precision;
        nowMax = gridComp.DicimalFormater(o);
    }

    element.innerHTML = nowMax + '';
};
window.minSumRender = function minSumRender(opt) {
    var gridComp = opt.gridObj;
    var gridCompColumn = opt.gridCompColumn;
    var field = gridCompColumn.options.field;
    var element = opt.element;
    var nowMax;
    $.each(gridComp.dataSourceObj.rows, function(i) {
        var v = $(this.value).attr(field);
        if (gridCompColumn.options.dataType == 'Int') {
            v = gridComp.getInt(v, 0);
        } else {
            v = gridComp.getFloat(v, 0);
        }
        if (typeof nowMax == 'undefined') {
            nowMax = v;
        } else {
            if (v < nowMax) nowMax = v;
        }
    });

    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = nowMax;
        o.precision = gridCompColumn.options.precision;
        nowMax = gridComp.DicimalFormater(o);
    }
    element.innerHTML = nowMax + '';
};
window.avgSumRender = function avgSumRender(opt) {
    var sumValue = opt.value;
    var gridComp = opt.gridObj;
    var gridCompColumn = opt.gridCompColumn;
    var element = opt.element;
    var l = gridComp.dataSourceObj.rows.length;
    var avgValue = sumValue / l;

    // 处理精度
    if (gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision) {
        var o = {};
        o.value = avgValue;
        o.precision = gridCompColumn.options.precision;
        avgValue = gridComp.DicimalFormater(o);
    }
    element.innerHTML = avgValue + '';
};

export const sumRowFunObj = {
    createContentRowsSumRow: re_createContentRowsSumRow,
    createContentSumRow: re_createContentSumRow,
    createSumRow: createSumRow,
    createSumRowForIE: createSumRowForIE,
    repairSumRow: re_repairSumRow,
    renderSumRow: renderSumRow,
    renderTypeSumRow: re_renderTypeSumRow
}
