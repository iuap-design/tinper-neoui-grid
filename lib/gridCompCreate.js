(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './gridBrowser'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./gridBrowser'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.gridBrowser);
        global.gridCompCreate = mod.exports;
    }
})(this, function (exports, _gridBrowser) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.createFunObj = undefined;

    /*
     * 创建顶层div以及_top div层
     * 添加顶层div相关监听
     */
    const createDivs = function () {
        var oThis = this,
            styleStr = '',
            str = '',
            mobileClass = '';
        this.ele.innerHTML = '';
        if (this.options.width) {
            str += 'width:' + this.options.width + ';';
        } else {
            str += 'width:auto;';
        }
        if (this.options.height) {
            str += 'height:' + this.options.height + ';';
        } else {
            str += 'height:auto;';
        }
        if (str != '') {
            styleStr = 'style="' + str + '"';
        }
        if (_gridBrowser.gridBrowser.isMobile) {
            mobileClass = 'u-grid-mobile';
        }
        var htmlStr = '<div id="' + this.options.id + '" data-role="grid" class="u-grid ' + mobileClass + '" ' + styleStr + '>';
        htmlStr += '</div>';
        this.ele.insertAdjacentHTML('afterBegin', htmlStr);
        // 创建屏幕div,用于拖动等操作
        var htmlStr = '<div id="' + this.options.id + '_top" class="u-grid-top"></div>';
        // this.ele.insertAdjacentHTML('afterBegin', htmlStr);
        document.body.appendChild($(htmlStr)[0]);
        this.initEventFun(); //创建完成之后顶层div添加监听
        this.widthChangeFun(); // 根据整体宽度创建grid或form展示区域
    };
    /*
     * 创建div区域
     */
    const repaintDivs = function () {
        // 后期可以考虑form展示
        this.repaintGridDivs();
        this.realtimeTableRows = null;
    };
    /*
     * 创建grid形式下div区域
     */
    const createGridDivs = function () {
        if (this.createGridFlag) {
            return;
        }
        // 为避免重复渲染，在开始清空里面内容
        if ($('#' + this.options.id)[0]) $('#' + this.options.id)[0].innerHTML = '';
        var htmlStr = '<div id="' + this.options.id + '_grid" class="u-grid-grid">';
        // htmlStr += this.createColumnMenu();
        htmlStr += this.createHeader();
        htmlStr += this.createContent();
        htmlStr += '</div>';
        if ($('#' + this.options.id)[0]) $('#' + this.options.id).html(htmlStr);
        $('#' + this.options.id + '_column_menu').remove();
        $(document.body).append(this.createColumnMenu());
        this.initGridEventFun();
        this.headerFirstClassFun();
        this.showType = 'grid';
        this.afterGridDivsCreate();
        this.createGridFlag = true;
        this.realtimeTableRows = null;
    };
    /*
     * 重画grid
     */
    const repaintGridDivs = function () {
        $('#' + this.options.id + '_grid').remove(null, true);
        this.showType = '';
        this.wholeWidth = 0;
        this.createGridFlag = false;
        this.columnsVisibleFun();
        this.widthChangeFun();
        this.realtimeTableRows = null;
    };
    /*
     * 创建columnMenu区域
     */
    const createColumnMenu = function () {
        return '';
    };
    /*
     * 创建header区域
     */
    const createHeader = function () {
        var wrapStr = '',
            headerShowStr = '';
        if (!this.options.showHeader) headerShowStr = 'style="display:none;"';
        var htmlStr = '<div class="u-grid-header" id="' + this.options.id + '_header" ' + headerShowStr + '><div class="u-grid-header-wrap" id="' + this.options.id + '_header_wrap" data-role="resizable" ' + wrapStr + '>';
        if (this.options.columnMenu) {
            htmlStr += '<div class="u-grid-header-columnmenu uf uf-navmenu-light"></div>';
        }
        if (this.options.multiSelect || this.options.showNumCol) {
            htmlStr += '<div id="' + this.options.id + '_header_left" class="u-grid-header-left" style="width:' + this.leftW + 'px;">';
            if (this.options.multiSelect) {
                if (_gridBrowser.gridBrowser.isIE8) {
                    //htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiSelectWidth + 'px;"><input class="u-grid-multi-input"   type="checkbox" id="' + this.options.id + '_header_multi_input"></div>'
                    htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiSelectWidth + 'px;"><span class="u-grid-checkbox-outline" id="' + this.options.id + '_header_multi_input"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
                } else {
                    //htmlStr += '<div class="u-grid-header-multi-select  checkbox check-success" style="width:' + this.multiSelectWidth + 'px;"><input  class="u-grid-multi-input"  type="checkbox" id="' + this.options.id + '_header_multi_input"><label for="' + this.options.id + '_header_multi_input"></label></div>'
                    htmlStr += '<div class="u-grid-header-multi-select  checkbox check-success" style="width:' + this.multiSelectWidth + 'px;"><span class="u-grid-checkbox-outline" id="' + this.options.id + '_header_multi_input"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
                }
            }
            if (this.options.showNumCol) {
                htmlStr += '<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;"></div>';
            }
            htmlStr += '</div>';
        }
        htmlStr += this.createHeaderTableFixed();
        htmlStr += this.createHeaderTable();
        htmlStr += '</div>';
        htmlStr += this.createHeaderDrag();;
        htmlStr += '</div>';
        return htmlStr;
    };
    /*
     * 创建header区域table
     */
    const createHeaderTable = function (createFlag) {
        var leftW, positionStr, idStr;
        if (createFlag == 'fixed') {
            leftW = parseInt(this.leftW);
            positionStr = 'absolute;width:' + this.fixedWidth + 'px;z-index:11;background:#F9F9F9;';
            idStr = 'fixed_';
        } else {
            if (this.options.fixedFloat == 'right') {
                leftW = parseInt(this.leftW);
            } else {
                leftW = parseInt(this.leftW) + parseInt(this.fixedWidth);
            }
            positionStr = 'relative;';
            idStr = '';
            if (this.contentMinWidth > 0) {
                positionStr += 'width:' + this.contentMinWidth + 'px;';
            }
        }
        if (createFlag == 'fixed' && this.options.fixedFloat == 'right') {
            var htmlStr = '<table role="grid" id="' + this.options.id + '_header_' + idStr + 'table" style="position:' + positionStr + ';right:0px;">';
        } else {
            var htmlStr = '<table role="grid" id="' + this.options.id + '_header_' + idStr + 'table" style="position:' + positionStr + ';left:' + leftW + 'px;">';
        }
        htmlStr += this.createColgroup(createFlag);
        htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_header_' + idStr + 'thead">';
        htmlStr += this.createThead(createFlag);
        htmlStr += '</thead></table>';
        return htmlStr;
    };
    const createHeaderTableFixed = function () {
        return '';
    };
    const createHeaderDrag = function () {
        return '';
    };
    /*
     * 创建colgroup
     */
    const createColgroup = function (createFlag) {
        var oThis = this,
            htmlStr = '<colgroup>',
            gridCompColumnArr;
        if (createFlag == 'fixed') {
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            gridCompColumnArr = this.gridCompColumnArr;
        }
        $.each(gridCompColumnArr, function () {
            if (this.options.visible) {
                htmlStr += '<col';
                if (!this.options.autoExpand) {
                    htmlStr += ' style="width:' + oThis.formatWidth(this.options.width) + '"';
                }
                htmlStr += '>';
            }
        });
        htmlStr += '</colgroup>';
        return htmlStr;
    };
    /*
     * 创建thead区域
     */
    const createThead = function (createFlag) {
        var oThis = this,
            visibleIndex = 0,
            gridCompColumnArr,
            trStyle = '',
            thLevelClass = '';
        if (this.options.maxHeaderLevel > 1) {
            trStyle = 'style="height:' + (this.headerHeight - 1) + 'px;"';
            thLevelClass = ' u-grid-header-level-th ';
        }
        var htmlStr = '<tr role="row" ' + trStyle + '>';
        if (createFlag == 'fixed') {
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            gridCompColumnArr = this.gridCompColumnArr;
        }
        $.each(gridCompColumnArr, function (i) {
            var vi = visibleIndex,
                displayStyle = '';
            if (this.options.visible == false) {
                vi = -1;
                displayStyle = 'style="display:none;"';
            } else {
                visibleIndex++;
            }

            // 低版本浏览器不支持th position为relative，因此加入空div
            htmlStr += '<th role="columnheader" data-filed="' + this.options.field + '" rowspan="1" class="u-grid-header-th ' + thLevelClass + '" ' + displayStyle + 'field="' + this.options.field + '" index="' + i + '" visibleIndex="' + vi + '"><div style="position:relative;" class="u-grid-header-div">';
            var colorStype = '';
            if (this.options.headerColor || oThis.options.headerHeight) {
                var headerC = '';
                var headerH = '';
                if (this.options.headerColor) headerC = 'color:' + this.options.headerColor + ';';
                if (oThis.options.headerHeight) headerH = 'height:' + oThis.options.headerHeight + 'px;line-height:' + oThis.options.headerHeight + 'px;';
                colorStype = 'style="' + headerC + headerH + '"';
            }
            htmlStr += '<div class="u-grid-header-link" field="' + this.options.field + '"  ' + colorStype + '>' + this.options.title + '</div>';
            /*if(oThis.options.columnMenu && createFlag != 'fixed'){
                // 创建右侧按钮图标
                htmlStr += '<div class="u-grid-header-columnmenu uf uf-navmenu-light " field="' + this.options.field + '" style="display:none;"></div>';
            }*/
            htmlStr += '</div></th>';
        });

        htmlStr += '</tr>';
        return htmlStr;
    };
    /*
     * 创建内容区域
     */
    const createContent = function () {
        var h = '',
            displayStr = '',
            bottonStr = '',
            lbw = 0;
        if (this.countContentHeight) {
            var wh = $('#' + this.options.id)[0].offsetHeight;
            this.wholeHeight = wh;
            if (wh > 0) {
                this.contentHeight = parseInt(wh) - this.exceptContentHeight - 1 > 0 ? parseInt(wh) - this.exceptContentHeight - 1 : 0;
                if (this.contentHeight > 0) {
                    h = 'style="height:' + this.contentHeight + 'px;"';
                }
            }
        }
        var htmlStr = '<div id="' + this.options.id + '_content" class="u-grid-content" ' + h + '>';
        if (this.options.showNumCol || this.options.multiSelect) {
            htmlStr += this.createContentLeft();
            if (!(this.contentWidth > this.contentMinWidth)) {
                displayStr = 'display:none;';
                bottonStr = 'bottom:0px;';
            }
            htmlStr += this.createContentSumRow(bottonStr);
            if (u.isIOS) {
                displayStr += 'width:0px;';
            }
            if (this.options.fixedFloat == 'right') {
                lbw = this.leftW;
            } else {
                lbw = this.leftW + this.fixedWidth;
            }
            htmlStr += '<div class="u-grid-content-left-bottom" id="' + this.options.id + '_content_left_bottom" style="width:' + lbw + 'px;' + displayStr + '">';
            htmlStr += '</div>';
        }
        htmlStr += this.createContentTableFixed();
        htmlStr += this.createContentTable();
        htmlStr += '</div>';
        return htmlStr;
    };
    const createContentSumRow = function () {
        return '';
    };
    /*
     * 创建内容区左侧区域
     */
    const createContentLeft = function () {
        var oThis = this,
            htmlStr = "",
            left = 0,
            hStr = "",
            sumRowClass = '',
            topStr = "";
        // 高度可伸缩，暂时去掉内部的高度设置
        // if(this.countContentHeight && parseInt(this.contentHeight) > 0){
        // 	hStr = 'max-height:' + this.contentHeight + 'px;overflow:hidden;';
        // }else{
        // 	hStr = '';
        // }
        if (this.options.showSumRow && this.options.sumRowFirst && this.options.sumRowHeight) {
            topStr = "top:" + this.options.sumRowHeight + 'px';
        }
        if (this.options.showSumRow) {
            sumRowClass = 'u-grid-content-left-sum';
            if (this.options.sumRowFirst) {
                sumRowClass += ' u-grid-content-left-sum-first';
            }
        }
        if (this.options.multiSelect) {
            htmlStr += '<div class="u-grid-content-left ' + sumRowClass + '" id="' + this.options.id + '_content_multiSelect" style="width:' + this.multiSelectWidth + 'px;' + hStr + topStr + '">';
            // 遍历生成所有行
            if (this.dataSourceObj.rows) {
                $.each(this.dataSourceObj.rows, function (i) {
                    htmlStr += oThis.createContentLeftMultiSelectRow(this);
                });
            }
            htmlStr += '</div>';
            left += this.multiSelectWidth;
        }
        if (this.options.showNumCol) {
            htmlStr += '<div class="u-grid-content-left ' + sumRowClass + '" id="' + this.options.id + '_content_numCol" style="width:' + this.numWidth + 'px;left:' + left + 'px;' + hStr + topStr + '">';
            // 遍历生成所有行
            if (this.dataSourceObj.rows) {
                $.each(this.dataSourceObj.rows, function (i, row) {
                    htmlStr += oThis.createContentLeftNumColRow(i, row.value);
                });
            }
            htmlStr += '</div>';
        }
        return htmlStr;
    };
    /*
     * 创建内容区左侧区域复选区（一行）
     */
    const createContentLeftMultiSelectRow = function (row, displayFlag) {
        var displayStr = '';
        if (!this.options.autoExpand && row.level > 0 && displayFlag != 'block') {
            displayStr = 'display:none;';
        }
        var tmpcheck = row.value["$_#_@_id"];
        if (!tmpcheck) {
            tmpcheck = setTimeout(function () {});
        }

        var rootObj = row.value;
        var objAry = this.selectRows;
        var re = objCompare(rootObj, objAry);

        if (_gridBrowser.gridBrowser.isIE8) {
            //var	htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect " ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ></div>'
            var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect " ><span class="u-grid-checkbox-outline" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
        } else {
            if (re) {
                var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect checkbox check-success u-grid-content-sel-row" ><span class="u-grid-checkbox-outline  is-checked" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
            } else {
                var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect checkbox check-success" ><span class="u-grid-checkbox-outline" id="checkbox' + tmpcheck + '" value="1"><span class="u-grid-checkbox-tick-outline"></span></span></div>';
            }
            //var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect checkbox check-success" ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ><label for="checkbox'+tmpcheck+'"></label></div>'
        }
        return htmlStr;
    };
    /*
     * 创建内容区左侧区域数字列（一行）
     */
    const createContentLeftNumColRow = function (index) {
        var row = this.dataSourceObj.rows[index];
        var rootObj = row.value;
        var objAry = this.selectRows;
        var re = objCompare(rootObj, objAry);
        var htmlStr;
        if (re) {
            htmlStr = '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num  u-grid-content-sel-row">' + (index + 1) + '</div>';
        } else {
            htmlStr = '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num">' + (index + 1) + '</div>';
        }
        return htmlStr;
    };
    /*
     * 创建内容区table
     */
    const createContentTable = function (createFlag) {
        var leftW, idStr, styleStr, hStr, cssStr, tableStyleStr;
        if (this.countContentHeight && parseInt(this.contentHeight) > 0) {
            hStr = 'height:' + this.contentHeight + 'px;';
        } else {
            hStr = "";
        }

        if (createFlag == 'fixed') {
            leftW = parseInt(this.leftW);
            idStr = 'fixed_';
            cssStr = 'fixed-';
            if (this.options.fixedFloat == 'right') {
                styleStr = 'style="position:absolute;width:' + this.fixedWidth + 'px;right:0px;' + hStr + '"';
            } else {
                styleStr = 'style="position:absolute;width:' + this.fixedWidth + 'px;left:' + leftW + 'px;' + hStr + '"';
            }
            tableStyleStr = 'style="width:' + this.fixedWidth + 'px;"';
        } else {
            if (this.options.fixedFloat == 'right') {
                leftW = parseInt(this.leftW);
            } else {
                leftW = parseInt(this.leftW) + parseInt(this.fixedWidth, 0);
            }
            idStr = '';
            cssStr = '';
            styleStr = 'style="position:relative;left:' + leftW + 'px;' + hStr;
            if (this.contentMinWidth > 0) {
                styleStr += 'width:' + this.contentMinWidth + 'px;';
            }
            // 因为添加overflow-x之后会导致纵向也显示不全，后续出现问题通过修改宽度来实现，不再通过overflow来实现
            if (this.options.noScroll) {
                styleStr += 'overflow-x:hidden;';
            }
            styleStr += '"';
            tableStyleStr = '';
            if (this.contentMinWidth > 0) {
                if (this.contentWidth > 0) {
                    tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;width:' + this.contentWidth + 'px;"';
                } else {
                    tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;"';
                }
            }
        }

        var htmlStr = '<div id="' + this.options.id + '_content_' + idStr + 'div" class="u-grid-content-' + cssStr + 'div" ' + styleStr + '>';
        htmlStr += '<div style="height:30px;position:absolute;top:-30px;width:100%;z-index:-1;"></div><table role="grid" id="' + this.options.id + '_content_' + idStr + 'table" ' + tableStyleStr + '>';
        htmlStr += this.createColgroup(createFlag);
        htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_content_' + idStr + 'thead" style="display:none">';
        htmlStr += this.createThead(createFlag);
        htmlStr += '</thead>';
        htmlStr += this.createContentRows(createFlag);
        htmlStr += '</table>';
        if (createFlag != 'fixed') {
            htmlStr += this.createNoRowsDiv();
        }
        htmlStr += '</div>';
        return htmlStr;
    };
    const createContentTableFixed = function () {
        return '';
    };
    /*
     * 创建无数据区域
     */
    const createNoRowsDiv = function () {
        var styleStr = '',
            styleStr1 = '';
        if (this.contentMinWidth > 0) {
            styleStr += 'style="width:' + this.contentMinWidth + 'px;"';
        }
        if (this.contentWidth > 0) {
            styleStr1 += 'style="width:' + this.contentWidth + 'px;"';
        }
        var htmlStr = '<div class="u-grid-noRowsDiv"' + styleStr1 + ' id="' + this.options.id + '_noRows"></div>';
        htmlStr += '<div class="u-grid-noRowsShowDiv"' + styleStr + ' id="' + this.options.id + '_noRowsShow">' + this.transMap.ml_no_rows + '</div>';
        return htmlStr;
    };
    /*
     * 创建内容区域所有行
     */
    const createContentRows = function (createFlag) {
        var oThis = this,
            htmlStr = "",
            idStr;
        if (createFlag == 'fixed') {
            idStr = 'fixed_';
        } else {
            idStr = '';
        }
        // 遍历生成所有行
        if (this.dataSourceObj.rows) {
            htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_content_' + idStr + 'tbody">';
            if (this.options.sumRowFirst) {
                htmlStr += this.createContentRowsSumRow(createFlag);
            }
            $.each(this.dataSourceObj.rows, function (i) {
                htmlStr += oThis.createContentOneRow(this, createFlag);
            });
            if (!this.options.sumRowFirst) {
                htmlStr += this.createContentRowsSumRow(createFlag);
            }
            htmlStr += '</tbody>';
        }
        return htmlStr;
    };
    const createContentRowsSumRow = function () {
        return '';
    };
    /*
     * 创建内容区域数据行
     */
    const createContentOneRow = function (row, createFlag, displayFlag) {
        var styleStr = '';
        if (!this.options.autoExpand && row.level > 0 && displayFlag != 'block') {
            styleStr = 'style="display:none"';
        }

        var rootObj = row.value;
        var objAry = this.selectRows;
        var re = objCompare(rootObj, objAry);
        var htmlStr = '';
        var classStr = '';
        if (this.options.showTree) {
            if (row.hasChild) {
                classStr += ' u-grid-content-parent-row ';
            } else {
                classStr += ' u-grid-content-leaf-row ';
            }

            if (row.level == 0) {
                classStr += ' u-grid-content-level0-row ';
            } else {
                classStr += ' u-grid-content-levelother-row ';
            }
        }

        if (re) {
            classStr += 'u-grid-content-sel-row';
        }
        htmlStr = '<tr role="row" class="' + classStr + '" ' + styleStr + '>';
        htmlStr += this.createContentOneRowTd(row, createFlag);
        htmlStr += '</tr>';
        return htmlStr;
    };
    /*
     * 创建内容区域数据行，针对IE
     */
    const createContentOneRowForIE = function (table, index, rowObj, createFlag, displayFlag) {
        var row = table.insertRow(index + 1);
        row.setAttribute("role", "row");
        if (!this.options.autoExpand && rowObj.level > 0 && displayFlag != 'block') {
            row.style.display = 'none';
        }

        if (this.options.showTree) {
            if (row.hasChild) {
                $(row).addClass('u-grid-content-parent-row');
            } else {
                $(row).addClass('u-grid-content-leaf-row');
            }

            if (row.level == 0) {
                $(row).addClass('u-grid-content-level0-row');
            } else {
                $(row).addClass('u-grid-content-levelother-row');
            }
        }

        this.createContentOneRowTdForIE(row, rowObj, createFlag);
    };

    /*
     * 数据更新重画当前行
     */
    const repaintRow = function (rowIndex) {
        var tr = $('#' + this.options.id + '_content_tbody').find('tr[role="row"]')[rowIndex],
            fixedtr = $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]')[rowIndex],
            row = this.dataSourceObj.rows[rowIndex],
            $tr = $(tr),
            index = this.getTrIndex($tr);
        if (_gridBrowser.gridBrowser.isIE8 || _gridBrowser.gridBrowser.isIE9) {
            var table = $('#' + this.options.id + '_content_table')[0],
                fixedtable = $('#' + this.options.id + '_content_fixed_table')[0];
            var className = tr.className;
            var fixclassName = fixedtr.className;
            table.deleteRow(rowIndex + 1);
            fixedtable.deleteRow(rowIndex + 1);
            var tr = table.insertRow(rowIndex + 1);
            u.addClass(tr, className);
            var fixedtr = fixedtable.insertRow(rowIndex + 1);
            u.addClass(fixedtr, fixclassName);
            this.createContentOneRowTdForIE(tr, row);
            this.createContentOneRowTdForIE(fixedtr, row, 'fixed');
        } else {
            tr.innerHTML = this.createContentOneRowTd(row);
            if (fixedtr) fixedtr.innerHTML = this.createContentOneRowTd(row, 'fixed');
        }
        var obj = {};
        obj.begin = index;
        obj.length = 1;
        this.renderTypeFun(obj);
    };
    /*
     * 创建行td对应的html
     */
    const createContentOneRowTd = function (row, createFlag) {
        var oThis = this,
            htmlStr = '',
            gridCompColumnArr,
            value = row.value;
        if (createFlag == 'fixed') {
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            gridCompColumnArr = this.gridCompColumnArr;
        }
        $.each(gridCompColumnArr, function () {
            var f = this.options.field,
                v = $(value).attr(f);
            v = oThis.getString(v, '');
            if ($.type(v) == 'object') {
                v = v.showValue;
            }
            var renderType = this.options.renderType;
            var treeStyle = '';
            var spanStr = '';
            var iconStr = '';
            var vStr = '';
            var tdStyle = '';
            if (oThis.options.showTree && this.firstColumn) {
                var l = parseInt(oThis.treeLeft) * parseInt(row.level);
                treeStyle = 'style="position:relative;';
                if (row.hasChild) {
                    if (oThis.options.autoExpand) {
                        spanStr = '<span class=" uf uf-reduce-s-o u-grid-content-tree-span"></span>';
                    } else {
                        spanStr = '<span class=" uf uf-add-s-o u-grid-content-tree-span"></span>';
                    }
                } else {
                    l += 16;
                }
                treeStyle += 'text-align:' + this.options.textAlign + ';';
                treeStyle += 'left:' + l + 'px;"';
            } else {
                treeStyle += 'style="text-align:' + this.options.textAlign + '";';
            }

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

            if (this.options.icon) {
                iconStr = '<span class="' + this.options.icon + '"></span>';
            }
            // title="' + v + '" 创建td的时候不在设置title，在renderType中设置,处理现实xml的情况
            htmlStr += '<td role="rowcell"  ' + tdStyle + ' ><div class="u-grid-content-td-div" ' + treeStyle + '>' + spanStr + iconStr + '<span>' + v.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</span></div></td>';
        });
        return htmlStr;
    };
    /*
     * 创建行td,针对IE
     */
    const createContentOneRowTdForIE = function (row, rowObj, createFlag) {
        var oThis = this,
            gridCompColumnArr,
            value = rowObj.value;
        if (createFlag == 'fixed') {
            gridCompColumnArr = this.gridCompColumnFixedArr;
        } else {
            gridCompColumnArr = this.gridCompColumnArr;
        }
        $.each(gridCompColumnArr, function () {
            var f = this.options.field,
                v = $(value).attr(f),
                v = oThis.getString(v, '');
            if ($.type(v) == 'object') {
                v = v.showValue;
            }
            var renderType = this.options.renderType,
                treeStyle = '',
                spanStr = '',
                iconStr = '',
                vStr = '',
                htmlStr = '',
                newCell = row.insertCell();
            newCell.setAttribute("role", "rowcell");
            // newCell.title = v.replace(/\</g,'\<').replace(/\>/g,'\>');
            if (oThis.options.showTree && this.firstColumn) {
                var l = parseInt(oThis.treeLeft) * parseInt(rowObj.level);
                treeStyle = 'style="position:relative;';
                if (rowObj.hasChild) {
                    if (oThis.options.autoExpand) {
                        spanStr = '<span class=" uf uf-reduce-s-o u-grid-content-tree-span"></span>';
                    } else {
                        spanStr = '<span class=" uf uf-add-s-o u-grid-content-tree-span"></span>';
                    }
                } else {
                    l += 18;
                }
                treeStyle += 'left:' + l + 'px;"';
            }
            if (!this.options.visible) {
                newCell.style.display = "none";
            }
            if (oThis.options.rowHeight) {
                newCell.style.height = oThis.options.rowHeight + 'px';
                newCell.style.lineHeight = oThis.options.rowHeight + 'px';
            }
            if (this.options.icon) {
                iconStr = '<span class="' + this.options.icon + '"></span>';
            }
            htmlStr += '<div class="u-grid-content-td-div" ' + treeStyle + '>' + spanStr + iconStr + '<span>' + v.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</span></div>';
            newCell.insertAdjacentHTML('afterBegin', htmlStr);
        });
    };
    /*
     * 重画内容区域
     */
    const repairContent = function () {
        var $pDiv = $('#' + this.options.id + '_content').parent();
        $('#' + this.options.id + '_content').remove(null, true);
        if ($pDiv[0]) {
            var htmlStr = this.createContent();
            $pDiv[0].insertAdjacentHTML('beforeEnd', htmlStr);
            this.renderTypeFun();
            this.initContentDivEventFun();
            if ($('#' + this.options.id + '_content_div')[0]) {
                $('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
            }
            $('#' + this.options.id + '_content_edit_menu').css('display', 'none');
        }
        this.realtimeTableRows = null;
    };

    /**
     * Object Compare with Array Object
     */
    const objCompare = function (rootObj, objAry) {
        var aryLen = objAry.length;
        // var rootStr = JSON.stringify(rootObj);
        var matchNum = 0;
        for (var i = 0; i < aryLen; i++) {
            // var compareStr = JSON.stringify(objAry[i]);
            var compareObj = objAry[i];
            matchNum += rootObj == compareObj ? 1 : 0;
        }
        return matchNum > 0 ? true : false;
    };

    const createFunObj = exports.createFunObj = {
        createDivs: createDivs,
        repaintDivs: repaintDivs,
        createGridDivs: createGridDivs,
        repaintGridDivs: repaintGridDivs,
        createColumnMenu: createColumnMenu,
        createHeader: createHeader,
        createHeaderTable: createHeaderTable,
        createHeaderTableFixed: createHeaderTableFixed,
        createHeaderDrag: createHeaderDrag,
        createColgroup: createColgroup,
        createThead: createThead,
        createContent: createContent,
        createContentSumRow: createContentSumRow,
        createContentLeft: createContentLeft,
        createContentLeftMultiSelectRow: createContentLeftMultiSelectRow,
        createContentLeftNumColRow: createContentLeftNumColRow,
        createContentTable: createContentTable,
        createContentTableFixed: createContentTableFixed,
        createNoRowsDiv: createNoRowsDiv,
        createContentRows: createContentRows,
        createContentRowsSumRow: createContentRowsSumRow,
        createContentOneRow: createContentOneRow,
        createContentOneRowForIE: createContentOneRowForIE,
        repaintRow: repaintRow,
        createContentOneRowTd: createContentOneRowTd,
        createContentOneRowTdForIE: createContentOneRowTdForIE,
        repairContent: repairContent
    };
});