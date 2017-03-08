(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.gridCompOperateRow = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /*
        重新结算是否选中header第一行
     */

    var isCheckedHeaderRow = function isCheckedHeaderRow() {
        if (this.selectRows.length !== 0 && this.selectRows.length == this.dataSourceObj.rows.length) {
            //修改全选标记为false
            $('#' + this.options.id + '_header_multi_input').addClass('is-checked');
        } else {
            $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');
        }
    };
    /*
     * 添加一行
     */
    var addOneRow = function addOneRow(row, index) {
        var oThis = this,
            displayFlag = 'none',
            rowObj = {},
            parentIndex,
            parentChildLength = 0,
            l = this.dataSourceObj.rows.length,
            endFlag = false;
        rowObj.value = row, displayFlag;

        var treeObj = this.addOneRowTree(row, index, rowObj);
        index = treeObj.index;
        displayFlag = treeObj.displayFlag;
        if (index != 0) {
            if (index && index > 0) {
                if (l < index) index = l;
            } else {
                index = 0;
            }
        }
        if (l == index) {
            endFlag = true;
        }
        rowObj.valueIndex = index;
        rowObj.value = row;
        this.dataSourceObj.rows.splice(index, 0, rowObj);
        // 如果是在中间插入需要将后续的valueIndex + 1；
        if (this.dataSourceObj.rows.length > index + 1) {
            $.each(this.dataSourceObj.rows, function (i) {
                if (i > index) {
                    this.valueIndex = this.valueIndex + 1;
                }
            });
        }

        // 需要重新排序重置变量
        var l = 0;
        if (this.options.showTree) {
            if (this.dataSourceObj.options.values) {
                l = this.dataSourceObj.options.values.length;
            } else {
                this.dataSourceObj.options.values = new Array();
            }
            this.dataSourceObj.options.values.splice(index, 0, row);
            this.addOneRowTreeHasChildF(rowObj);
        } else {
            if (this.dataSourceObj.options.values) {} else {
                this.dataSourceObj.options.values = new Array();
            }
            this.dataSourceObj.options.values.splice(index, 0, row);
        }

        if (this.showType == 'grid') {
            //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
            this.editClose();

            this.updateEditRowIndex('+', index);
            try {
                var htmlStr = this.createContentOneRow(rowObj, 'normal', displayFlag);
                if (endFlag) {
                    $('#' + this.options.id + '_content_tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                } else {
                    var $$tr = $('#' + this.options.id + '_content_tbody').find('tr[role="row"]')[index];
                    var $$tbody = $('#' + this.options.id + '_content_tbody')[0];
                    if ($$tr) $$tr.insertAdjacentHTML('beforeBegin', htmlStr);else if ($$tbody) $$tbody.insertAdjacentHTML('afterBegin', htmlStr);
                }
                if ($('#' + this.options.id + '_content_fixed_div').length > 0) {
                    var htmlStr = this.createContentOneRow(rowObj, 'fixed', displayFlag);
                    if (endFlag) {
                        $('#' + this.options.id + '_content_fixed_tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                    } else {
                        var $$tr = $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]')[index];
                        if ($$tr) $$tr.insertAdjacentHTML('beforeBegin', htmlStr);else if ($('#' + this.options.id + '_content_fixed_tbody')[0]) $('#' + this.options.id + '_content_fixed_tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                    }
                }
            } catch (e) {
                //IE情况下
                var table = $('#' + this.options.id + '_content_div table')[0];
                if (table) this.createContentOneRowForIE(table, index, rowObj, 'normal', displayFlag);
                var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
                if (fixedTable) this.createContentOneRowForIE(fixedTable, index, rowObj, 'fixed', displayFlag);
            }
            if (this.options.multiSelect) {
                var htmlStr = this.createContentLeftMultiSelectRow(rowObj, displayFlag);
                if (endFlag) {
                    $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                } else {
                    var $$div = $('#' + this.options.id + '_content_multiSelect').find('div')[index];
                    if ($$div) $$div.insertAdjacentHTML('beforeBegin', htmlStr);else $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin', htmlStr);
                }
            }
            if (this.options.showNumCol) {
                var htmlStr = this.createContentLeftNumColRow(l, row);
                if (endFlag) {
                    $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                } else {
                    var $$div = $('#' + this.options.id + '_content_numCol').find('div')[index];
                    if ($$div) $$div.insertAdjacentHTML('beforeBegin', htmlStr);else $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin', htmlStr);
                }
                this.resetNumCol();
                this.updateNumColLastRowFlag();
            }
            this.repairSumRow();
            this.noRowsShowFun();
            this.updateLastRowFlag();
            var obj = {};
            obj.begin = index;
            obj.length = 1;
            this.renderTypeFun(obj);
        }
    };
    var addOneRowTree = function addOneRowTree(row, index) {
        return index;
    };
    var addOneRowTreeHasChildF = function addOneRowTreeHasChildF() {};
    var editClose = function editClose() {};
    /*
     * 添加多行
     */
    var addRows = function addRows(rows, index) {
        if (!(this.$ele.data('gridComp') == this)) return;
        if (this.options.showTree) {
            // 树表待优化
            var l = rows.length;
            for (var i = 0; i < l; i++) {
                this.addOneRow(rows[i], l);
            }
            return;
        }
        this.editClose();
        var htmlStr = '',
            htmlStrmultiSelect = '',
            htmlStrNumCol = '',
            htmlStrFixed = '',
            oThis = this,
            l = this.dataSourceObj.rows.length,
            endFlag = false;
        if (index != 0) {
            if (index && index > 0) {
                if (l < index) index = l;
            } else {
                index = 0;
            }
        }
        if (l == index) {
            endFlag = true;
        }
        var rowObjArr = new Array();
        $.each(rows, function (i) {
            var rowObj = {};
            rowObj.value = this;
            rowObj.valueIndex = index + i;
            rowObjArr.push(rowObj);
            oThis.dataSourceObj.rows.splice(index + i, 0, rowObj);
            oThis.updateEditRowIndex('+', index + i);
        });

        if (this.dataSourceObj.options.values) {} else {
            this.dataSourceObj.options.values = new Array();
        }
        $.each(rows, function (i) {
            oThis.dataSourceObj.options.values.splice(index + i, 0, this);
        });

        // 如果是在中间插入需要将后续的valueIndex + 1；
        if (this.dataSourceObj.rows.length > index + rows.length) {
            $.each(this.dataSourceObj.rows, function (i) {
                if (i > index + rows.length - 1) {
                    this.valueIndex = this.valueIndex + rows.length;
                }
            });
        }
        if (this.showType == 'grid' && $('#' + this.options.id + '_content_div tbody')[0]) {
            //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据 //lyk--需要完善隐藏之后再显示同事添加数据操作
            $.each(rowObjArr, function (i, row) {
                htmlStr += oThis.createContentOneRow(this);
                htmlStrFixed += oThis.createContentOneRowFixed(this);
                if (oThis.options.multiSelect) {
                    htmlStrmultiSelect += oThis.createContentLeftMultiSelectRow(this);
                }
                if (oThis.options.showNumCol) {
                    htmlStrNumCol += oThis.createContentLeftNumColRow(l + i, row.value);
                }
            });
            try {
                if (endFlag) {
                    $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStr);
                } else {
                    if ($('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStr);else if ($('#' + this.options.id + '_content_div tbody')[0]) $('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStr);
                }
                if (endFlag) {
                    $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd', htmlStrFixed);
                } else {
                    if ($('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index]) $('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin', htmlStrFixed);else if ($('#' + this.options.id + '_content_fixed_div tbody')[0]) $('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin', htmlStrFixed);
                }
            } catch (e) {
                //IE情况下
                var table = $('#' + this.options.id + '_content_div table')[0];
                var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
                if (table && fixedTable) {
                    $.each(rowObjArr, function (i) {
                        oThis.createContentOneRowForIE(table, index + i, this);
                        oThis.createContentOneRowForIE(fixedTable, index + i, this, 'fixed');
                    });
                }
            }
            if (this.options.multiSelect) {
                if (endFlag) {
                    $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd', htmlStrmultiSelect);
                } else {
                    var _content_multiSelect = $('#' + this.options.id + '_content_multiSelect').find('div')[index];
                    if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrmultiSelect);else $('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin', htmlStrmultiSelect);
                }
            }
            if (this.options.showNumCol) {
                if (endFlag) {
                    $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd', htmlStrNumCol);
                } else {
                    var _content_multiSelect = $('#' + this.options.id + '_content_numCol').find('div')[index];
                    if (_content_multiSelect) _content_multiSelect.insertAdjacentHTML('beforeBegin', htmlStrNumCol);else $('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin', htmlStrNumCol);
                }
                this.resetNumCol();
                this.updateNumColLastRowFlag();
            }
            this.repairSumRow();
            this.noRowsShowFun();
            var obj = {};
            obj.begin = index;
            obj.length = rows.length;
            this.renderTypeFun(obj);
        }

        this.updateLastRowFlag();
        this.isCheckedHeaderRow();
    };
    var createContentOneRowFixed = function createContentOneRowFixed(rowObj) {
        return '';
    };
    var updateEditRowIndex = function updateEditRowIndex(opType, opIndex, num) {};
    /*
     * 删除一行
     */
    var deleteOneRow = function deleteOneRow(index) {
        var oThis = this;
        index = parseInt(index);
        var row = this.dataSourceObj.rows[index];
        if (!row) return;
        var rowValue = row.value;
        if (this.showType == 'grid') {
            //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
            this.editClose();
        }
        this.dataSourceObj.rows.splice(index, 1);
        this.updateEditRowIndex('-', index);
        if (this.dataSourceObj.options.values) {
            var i = this.dataSourceObj.options.values.indexOf(rowValue);
            this.dataSourceObj.options.values.splice(i, 1);
        }
        // 如果是在中间插入需要将后续的valueIndex - 1；
        if (this.dataSourceObj.rows.length > index + 1) {
            $.each(this.dataSourceObj.rows, function (i) {
                if (i >= index) {
                    this.valueIndex = this.valueIndex - 1;
                }
            });
        }
        if (this.selectRows) {
            $.each(this.selectRows, function (i) {
                if (this == rowValue) {
                    oThis.selectRows.splice(i, 1);
                    oThis.selectRowsObj.splice(i, 1);
                    oThis.selectRowsIndex.splice(i, 1);
                } else if (oThis.selectRowsIndex[i] > index) {
                    oThis.selectRowsIndex[i] = oThis.selectRowsIndex[i] - 1;
                }
            });
        }
        if (this.focusRow) {
            if (this.focusRow == rowValue) {
                this.focusRow = null;
                this.focusRowObj = null;
                this.focusRowIndex = null;
            } else if (this.focusRowIndex > index) {
                this.focusRowIndex = this.focusRowIndex - 1;
            }
        }
        if (this.showType == 'grid') {
            //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
            $('#' + this.options.id + '_content_div tbody tr:eq(' + index + ')').remove();
            $('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index + ')').remove();
            $('#' + this.options.id + '_content_multiSelect >div:eq(' + index + ')').remove();
            $('#' + this.options.id + '_content_numCol >.u-grid-content-num:eq(' + index + ')').remove();
            this.resetNumCol();
            this.repairSumRow();
            this.noRowsShowFun();
            this.updateNumColLastRowFlag();
        }

        this.deleteOneRowTree();
        if (typeof this.options.onRowDelete == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.index = index;
            obj.row = row;
            if (!this.options.onRowDelete(obj)) {
                return;
            }
        }
        this.isCheckedHeaderRow();
    };
    var repairSumRow = function repairSumRow() {};
    var deleteOneRowTree = function deleteOneRowTree() {};
    /*
     * 删除多行
     */
    var deleteRows = function deleteRows(indexs) {
        var oThis = this,
            indexss = new Array();
        $.each(indexs, function (i) {
            indexss.push(indexs[i]);
        });
        indexss.sort(function (a, b) {
            return b - a;
        });

        $.each(indexss, function (i) {
            oThis.deleteOneRow(this);
        });
        this.isCheckedHeaderRow();
    };
    /*
     * 修改某一行
     */
    var updateRow = function updateRow(index, row) {
        if (index > -1 && index < this.dataSourceObj.rows.length) {
            this.dataSourceObj.rows[index].value = row;
            this.dataSourceObj.options.values[this.dataSourceObj.rows[index].valueIndex] = row;
            if (this.showType == 'grid') {
                var obj = {};
                obj.begin = index;
                obj.length = 1;
                this.renderTypeFun(obj);
                this.repairSumRow();
            }
        }
    };
    /*
     * 修改某个cell的值
     */
    var updateValueAt = function updateValueAt(rowIndex, field, value, force) {
        if (rowIndex > -1 && rowIndex < this.dataSourceObj.rows.length) {
            var oThis = this,
                oldValue = $(this.dataSourceObj.rows[rowIndex].value).attr(field),
                treeRowIndex = rowIndex;
            if (typeof value == 'undefined') value = '';
            if (oldValue != value || force) {
                if (typeof this.options.onBeforeValueChange == 'function') {
                    var obj = {};
                    obj.gridObj = this;
                    //因为树表更新时候可能改变rowIndex的顺序
                    obj.rowIndex = treeRowIndex;
                    obj.field = field;
                    obj.oldValue = oldValue;
                    obj.newValue = value;
                    var flag = this.options.onBeforeValueChange(obj);
                    if (!flag) return;
                }
                $(this.dataSourceObj.rows[rowIndex].value).attr(field, value);
                $(this.dataSourceObj.options.values[this.dataSourceObj.rows[rowIndex].valueIndex]).attr(field, value);
                if (this.showType == 'grid') {
                    var obj = {};
                    obj.field = field;
                    obj.begin = rowIndex;
                    obj.length = 1;
                    this.renderTypeFun(obj);
                    // this.editColIndex = undefined;
                    // 如果编辑行为修改行则同时需要修改编辑行的显示
                    treeRowIndex = this.updateValueAtTree(rowIndex, field, value, force);
                    this.updateValueAtEdit(rowIndex, field, value, force);
                    this.repairSumRow();
                }
                if (typeof this.options.onValueChange == 'function') {
                    var obj = {};
                    obj.gridObj = this;
                    //因为树表更新时候可能改变rowIndex的顺序
                    obj.rowIndex = treeRowIndex;
                    obj.field = field;
                    obj.oldValue = oldValue;
                    obj.newValue = value;
                    this.options.onValueChange(obj);
                }
                this.resetLeftHeight();
            }
        }
    };
    var updateValueAtTree = function updateValueAtTree(rowIndex, field, value, force) {
        return rowIndex;
    };
    var updateValueAtEdit = function updateValueAtEdit(rowIndex, field, value, force) {};
    /*
     * 选中一行
     * slice 设置全选时，slice为true，不做渲染，在setAllRowSelect中统一渲染
     */
    var setRowSelect = function setRowSelect(rowIndex, doms) {
        var selectDiv, rowTr, fixedRowTr, numColDiv;
        if (!this.dataSourceObj.rows[rowIndex]) return true;
        //已经选中退出
        if (this.showType == 'grid') {
            if (doms && doms['contentTrs']) rowTr = doms['contentTrs'][rowIndex];else rowTr = this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]')[rowIndex];
        }
        if (this.dataSourceObj.rows[rowIndex].checked && u.hasClass(rowTr, "u-grid-content-sel-row")) return true;
        if (doms && doms['multiSelectDivs']) selectDiv = doms['multiSelectDivs'][rowIndex];else selectDiv = this.$ele.find('#' + this.options.id + '_content_multiSelect').children()[rowIndex];
        if (typeof this.options.onBeforeRowSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            if (!this.options.onBeforeRowSelected(obj)) {
                if (this.options.multiSelect) {
                    var _input = selectDiv.children[0];
                    _input.checked = false;
                }
                return false;
            }
        }
        if (!this.options.multiSelect) {
            if (this.selectRowsObj && this.selectRowsObj.length > 0) {
                $.each(this.selectRowsObj, function () {
                    this.checked = false;
                });
            }
            this.selectRows = new Array();
            this.selectRowsObj = new Array();
            this.selectRowsIndex = new Array();
            if (this.showType == 'grid') {
                $('#' + this.options.id + '_content_tbody tr').removeClass("u-grid-content-sel-row");
                $('#' + this.options.id + '_content_tbody tr a').removeClass("u-grid-content-sel-row");
                $('#' + this.options.id + '_content_fixed_tbody tr').removeClass("u-grid-content-sel-row");
                $('#' + this.options.id + '_content_fixed_tbody tr a').removeClass("u-grid-content-sel-row");
                if (this.options.multiSelect) {
                    $('#' + this.options.id + '_content_multiSelect div').removeClass("u-grid-content-sel-row");
                }
                if (this.options.showNumCol) {
                    $('#' + this.options.id + '_content_numCol div').removeClass("u-grid-content-sel-row");
                }
            }
        } else {
            if (this.showType == 'grid') {
                var _input = selectDiv.children[0];
                // _input.checked = true;
                $(_input).addClass('is-checked');
            }
        }
        if (this.showType == 'grid') {
            $(rowTr).addClass("u-grid-content-sel-row");

            if (doms && doms['fixContentTrs']) fixedRowTr = doms['fixContentTrs'][rowIndex];else fixedRowTr = this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]')[rowIndex];
            $(fixedRowTr).addClass("u-grid-content-sel-row");
            var ini = rowIndex;
            if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
                ini++;
            }
            if (this.options.multiSelect) {
                if (ini != rowIndex) selectDiv = this.$ele.find('#' + this.options.id + '_content_multiSelect').children()[ini];
                $(selectDiv).addClass('u-grid-content-sel-row');
            }
            if (this.options.showNumCol) {
                if (doms && doms['numColDivs']) numColDiv = doms['numColDivs'][ini];else numColDiv = this.$ele.find('#' + this.options.id + '_content_numCol').children()[ini];
                $(numColDiv).addClass('u-grid-content-sel-row');
            }
        }
        this.selectRows.push(this.dataSourceObj.rows[rowIndex].value);
        this.selectRowsObj.push(this.dataSourceObj.rows[rowIndex]);
        this.selectRowsIndex.push(rowIndex);
        this.dataSourceObj.rows[rowIndex].checked = true;
        // if(this.selectRows.length == this.dataSourceObj.rows.length){
        //     //修改全选标记为false
        //     $('#' + this.options.id + '_header_multi_input').addClass('is-checked')
        // }
        this.isCheckedHeaderRow();
        if (typeof this.defaultOnRowSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            this.defaultOnRowSelected(obj);
        }

        if (typeof this.options.onRowSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            this.options.onRowSelected(obj);
        }
        return true;
    };
    /*
     * 反选一行
     */
    var setRowUnselect = function setRowUnselect(rowIndex) {
        var oThis = this;
        if (!this.dataSourceObj.rows[rowIndex]) return true;
        //已经选中退出
        if (!this.dataSourceObj.rows[rowIndex].checked) return true;
        if (typeof this.options.onBeforeRowUnSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            if (!this.options.onBeforeRowUnSelected(obj)) {
                if (this.options.multiSelect) {
                    $('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex + ')')[0].checked = true;
                }
                return false;
            }
        }
        if (this.options.multiSelect) {
            // $('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex+ ')')[0].checked = false;
            $('#' + this.options.id + '_content_multiSelect .u-grid-checkbox-outline:eq(' + rowIndex + ')').removeClass('is-checked');
        }
        var ini = rowIndex;
        if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
            ini++;
        }
        $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
        $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-sel-row");
        $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
        $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-sel-row");
        if (this.options.multiSelect) {
            $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
        }
        if (this.options.showNumCol) {
            $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
        }
        $.each(this.selectRows, function (i) {
            if (this == oThis.dataSourceObj.rows[rowIndex].value) {
                oThis.selectRows.splice(i, 1);
                oThis.selectRowsObj.splice(i, 1);
                oThis.selectRowsIndex.splice(i, 1);
            }
        });
        this.dataSourceObj.rows[rowIndex].checked = false;

        //修改全选标记为false
        $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');

        if (typeof this.options.onRowUnSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            this.options.onRowUnSelected(obj);
        }
        oThis.isCheckedHeaderRow();
        return true;
    };
    /*
     * 选中所有行
     */
    var setAllRowSelect = function setAllRowSelect() {
        // $('#' + this.options.id + '_header_multi_input').prop('checked', true)
        $('#' + this.options.id + '_header_multi_input').addClass('is-checked');
        if (typeof this.options.onBeforeAllRowSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObjs = this.dataSourceObj.rows;
            if (!this.options.onBeforeAllRowSelected(obj)) {
                return;
            }
        }
        // 把需要的dom在循环外获取出来
        var multiSelectDivs = this.$ele.find('#' + this.options.id + '_content_multiSelect').children(),
            numColDivs = this.$ele.find('#' + this.options.id + '_content_numCol').children(),
            contentTrs = this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]'),
            fixContentTrs = this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]');
        this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]');
        for (var i = 0; i < this.dataSourceObj.rows.length; i++) {
            this.setRowSelect(i, {
                multiSelectDivs: multiSelectDivs,
                numColDivs: numColDivs,
                contentTrs: contentTrs,
                fixContentTrs: fixContentTrs
            });
        }
        if (typeof this.options.onAllRowSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObjs = this.dataSourceObj.rows;
            this.options.onAllRowSelected(obj);
        }
    };
    /*
     * 反选所有行
     */
    var setAllRowUnSelect = function setAllRowUnSelect() {
        // $('#' + this.options.id + '_header_multi_input').attr('checked', false)
        $('#' + this.options.id + '_header_multi_input').removeClass('is-checked');
        if (typeof this.options.onBeforeAllRowUnSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObjs = this.dataSourceObj.rows;
            if (!this.options.onBeforeAllRowUnSelected(obj)) {
                return;
            }
        }
        for (var i = 0; i < this.dataSourceObj.rows.length; i++) {
            this.setRowUnselect(i);
        }
        if (typeof this.options.onAllRowUnSelected == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObjs = this.dataSourceObj.rows;
            this.options.onAllRowUnSelected(obj);
        }
    };

    /*
     * focus一行
     */
    var setRowFocus = function setRowFocus(rowIndex) {
        //已经选中退出
        if (this.dataSourceObj.rows[rowIndex].focus) return true;
        if (!this.dataSourceObj.rows[rowIndex]) return true;
        if (typeof this.options.onBeforeRowFocus == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            if (!this.options.onBeforeRowFocus(obj)) {
                return false;
            }
        }
        $('#' + this.options.id + '_content_tbody tr').removeClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_tbody tr a').removeClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_fixed_tbody tr').removeClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_fixed_tbody tr a').removeClass("u-grid-content-focus-row");
        if (this.options.multiSelect) {
            $('#' + this.options.id + '_content_multiSelect').find('div').removeClass("u-grid-content-focus-row");
        }
        if (this.options.showNumCol) {
            $('#' + this.options.id + '_content_numCol').find('div').removeClass("u-grid-content-focus-row");
        }
        if (this.focusRowObj) {
            this.focusRowObj.focus = false;
        }
        $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex + ')').addClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex + ') a').addClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex + ')').addClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex + ') a').addClass("u-grid-content-focus-row");
        var ini = rowIndex;
        if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
            ini++;
        }
        if (this.options.multiSelect) {
            $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
        }
        if (this.options.showNumCol) {
            $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
        }
        this.focusRow = this.dataSourceObj.rows[rowIndex].value;
        this.focusRowObj = this.dataSourceObj.rows[rowIndex];
        this.focusRowIndex = rowIndex;
        this.dataSourceObj.rows[rowIndex].focus = true;
        if (typeof this.options.onRowFocus == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            this.options.onRowFocus(obj);
        }
        /*if(!this.options.multiSelect){
            this.setRowSelect(rowIndex);
        }*/
        return true;
    };
    /*
     * 反focus一行
     */
    var setRowUnFocus = function setRowUnFocus(rowIndex) {
        var oThis = this;
        if (!this.dataSourceObj.rows[rowIndex]) return true;
        if (typeof this.options.onBeforeRowUnFocus == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            if (!this.options.onBeforeRowUnFocus(obj)) {
                return false;
            }
        }
        //已经选中退出
        if (!this.dataSourceObj.rows[rowIndex].focus) return true;
        var ini = rowIndex;
        if (this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form') {
            ini++;
        }
        $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
        $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini + ') a').removeClass("u-grid-content-focus-row");
        if (this.options.multiSelect) {
            $('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
        }
        if (this.options.showNumCol) {
            $('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
        }
        this.dataSourceObj.rows[rowIndex].focus = false;
        this.focusRow = null;
        this.focusRowObj = null;
        this.focusRowIndex = null;
        if (typeof this.options.onRowUnFocus == 'function') {
            var obj = {};
            obj.gridObj = this;
            obj.rowObj = this.dataSourceObj.rows[rowIndex];
            obj.rowIndex = rowIndex;
            this.options.onRowUnFocus(obj);
        }
        if (!this.options.multiSelect) {
            this.setRowUnselect(rowIndex);
        }
        return true;
    };
    /*
     * 增加删除时重置数字列
     */
    var resetNumCol = function resetNumCol() {
        var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');
        $.each(numCols, function (i) {
            this.innerHTML = i + 1 + "";
        });
    };
    var operateRowFunObj = exports.operateRowFunObj = {
        isCheckedHeaderRow: isCheckedHeaderRow,
        addOneRow: addOneRow,
        addOneRowTree: addOneRowTree,
        addOneRowTreeHasChildF: addOneRowTreeHasChildF,
        editClose: editClose,
        addRows: addRows,
        createContentOneRowFixed: createContentOneRowFixed,
        updateEditRowIndex: updateEditRowIndex,
        deleteOneRow: deleteOneRow,
        repairSumRow: repairSumRow,
        deleteOneRowTree: deleteOneRowTree,
        deleteRows: deleteRows,
        updateRow: updateRow,
        updateValueAt: updateValueAt,
        updateValueAtTree: updateValueAtTree,
        updateValueAtEdit: updateValueAtEdit,
        setRowSelect: setRowSelect,
        setRowUnselect: setRowUnselect,
        setAllRowSelect: setAllRowSelect,
        setAllRowUnSelect: setAllRowUnSelect,
        setRowFocus: setRowFocus,
        setRowUnFocus: setRowUnFocus,
        resetNumCol: resetNumCol
    };
});