const re_initGridCompColumnColumnMenuFun = function(columnOptions) {
    var column1 = new this.gridCompColumn(columnOptions, this);
    column1.options.realWidth = column1.options.width;
    this.basicGridCompColumnArr.push(column1);
};

const colMenu_initGridCompColumn = function() {
    // 扩展方法
    this.menuColumnsHeight = this.gridCompColumnArr.length * this.columnMenuHeight;
};

const re_createColumnMenu = function() {
    if (this.options.columnMenuType == 'base') {
        return re_createColumnMenu_base.call(this);
    } else if (this.options.columnMenuType == 'border') {
        return re_createColumnMenu_border.call(this);
    }
}

const re_createColumnMenu_base = function() {
    var oThis = this;
    var htmlStr = '<div class="u-grid-column-menu" id="' + this.options.id + '_column_menu">';
    htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-ul" id="' + this.options.id + '_column_menu_ul">';

    // 创建清除设置
    htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
    htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_clearSet">';
    htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_clear_set + '</span>';
    htmlStr += '</div></li>';


    htmlStr += '<div class="u-grid-column-menu-columns" id="' + this.options.id + '_column_menu_columns">';
    htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-columns-ul" id="' + this.options.id + '_column_menu_columns_ul">';
    $.each(this.gridCompColumnArr, function(i) {
        if (oThis.getString(this.options.title, '') != '') {
            var styleStr = '';
            if (!this.options.canVisible)
                styleStr += ' style="display:none;"';
            htmlStr += '<li class="u-grid-column-menu-columns-li" role="menuitem" index="' + i + '" ' + styleStr + '>';
            htmlStr += '<div class="u-grid-column-menu-columns-div1">';
            var checkedStr = "";
            if (this.options.visible)
                checkedStr = ' checked';

            htmlStr += '<div class="u-grid-column-menu-columns-div2"><input type="checkbox" ' + checkedStr + '><label></label></div>';
            htmlStr += '<span class="u-grid-column-menu-columns-span">' + this.options.title + '</span>';
            htmlStr += '</div></li>';
        }
    });
    htmlStr += '</ul></div>';


    htmlStr += '</ul></div>';

    // 创建数据列区域

    return htmlStr;
}

const re_createColumnMenu_border = function() {
    var oThis = this;
    var htmlStr = '<div class="u-grid-column-menu-border" id="' + this.options.id + '_column_menu">';
    htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-ul" id="' + this.options.id + '_column_menu_ul">';

    // 创建清除设置
    htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
    htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_clearSet">';
    htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_clear_set + '</span>';
    htmlStr += '</div></li>';


    var columnHtmlStr = '<div class="u-grid-column-menu-columns" id="' + this.options.id + '_column_menu_columns">';
    columnHtmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-columns-ul" id="' + this.options.id + '_column_menu_columns_ul">';
    var allCheckFlag = true;
    $.each(this.gridCompColumnArr, function(i) {
        if (oThis.getString(this.options.title, '') != '') {
            var styleStr = '';
            if (!this.options.canVisible)
                styleStr += ' style="display:none;"';
            columnHtmlStr += '<li class="u-grid-column-menu-columns-li" role="menuitem" index="' + i + '" ' + styleStr + '>';
            columnHtmlStr += '<div class="u-grid-column-menu-columns-div1-border">';
            var checkedStr = "";
            if (this.options.visible)
                checkedStr = ' checked';

            if (this.options.canVisible && !this.options.visible)
                allCheckFlag = false;
            columnHtmlStr += '<div class="u-grid-column-menu-columns-div2-border"><input type="checkbox" ' + checkedStr + '><label></label></div>';
            columnHtmlStr += '<span class="u-grid-column-menu-columns-span-border">' + this.options.title + '</span>';
            columnHtmlStr += '</div></li>';
        }
    });
    columnHtmlStr += '</ul></div>';
    var checkedStr = '';
    if (allCheckFlag)
        checkedStr = ' checked '
    var headerHtmlStr = '<li class="u-grid-column-menu-columns-li header" role="menuitem">';
    headerHtmlStr += '<div class="u-grid-column-menu-columns-div1-border">';
    headerHtmlStr += '<div class="u-grid-column-menu-columns-div2-border"><input type="checkbox" ' + checkedStr + '><label></label>&nbsp;显示</div>';
    headerHtmlStr += '<span class="u-grid-column-menu-columns-span-border">项目</span>';
    headerHtmlStr += '</div></li>';

    htmlStr += headerHtmlStr;
    htmlStr += columnHtmlStr;

    htmlStr += '</ul></div>';

    // 创建数据列区域

    return htmlStr;
};

const colMenu_initEventFun = function() {
    // 扩展方法
    var oThis = this;
    $('#' + this.options.id).on('mouseup', function(e) {
        if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
            // 点击的是header区域
            oThis.mouseUpX = e.clientX;
            oThis.mouseUpY = e.clientY;
            //点击过程中鼠标没有移动
            if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
                //或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
                oThis.columnClickX = e.clientX;
                oThis.columnClickY = e.clientY;
                var eleTh = $(e.target).closest('th')[0];
                if ($(e.target).hasClass('u-grid-header-columnmenu')) {
                    //点击的是columnmenu
                    $('#' + oThis.options.id + '_column_menu').css('display', 'block');


                    // 根据点击位置来显示column menu区域
                    if (oThis.options.columnMenuType == 'base') {
                        var left = e.clientX - 160;
                    } else if (oThis.options.columnMenuType == 'border') {
                        var left = e.clientX - 240;
                    }

                    if (left < 0)
                        left = 0;
                    var top = e.clientY + 10;
                    $('#' + oThis.options.id + '_column_menu').css('left', left);
                    $('#' + oThis.options.id + '_column_menu').css('top', top);
                    /*数据列多的情况下处理显示的高度*/

                    var sX = $(window).width();
                    var sH = $(window).height();

                    // 如果数据列高度高于屏幕高度则数据列高度设置为屏幕高度-10；
                    var columnsHeight = oThis.menuColumnsHeight;
                    if ((oThis.menuColumnsHeight + top + 34) > sH) {
                        columnsHeight = sH - top - 34;
                        $('#' + oThis.options.id + '_column_menu_columns').css('height', columnsHeight + 'px');
                    } else {
                        $('#' + oThis.options.id + '_column_menu_columns').css('height', '');
                    }
                    oThis.ele.createColumnMenuFlag = true;
                } else {

                }
            }
        } else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
            // 点击的是数据区域

        }

    });

    $(document).on('click', function() {
        if (oThis.columnMenuMove == false && oThis.ele.createColumnMenuFlag == false) {
            if (oThis.ele.offsetWidth > 0)
                $('#' + oThis.options.id + '_column_menu').css('display', 'none');
        }
        oThis.ele.createColumnMenuFlag = false;
    });
    $(document).on('scroll', function() {
        if (oThis.columnMenuMove == false && oThis.ele.createColumnMenuFlag == false) {
            if (oThis.ele.offsetWidth > 0)
                $('#' + oThis.options.id + '_column_menu').css('display', 'none');
        }
        oThis.ele.createColumnMenuFlag = false;
    });
};

const colMenu_initGridEventFun = function() {
    // 扩展方法
    var oThis = this;

    /*header 按钮处理开始*/
    // column按钮
    $('#' + this.options.id + '_column_menu_ul').off('mousemove');
    $('#' + this.options.id + '_column_menu_ul').on('mousemove', function(e) {
        oThis.columnMenuMove = true;
    });
    $('#' + this.options.id + '_column_menu_ul').off('mouseout');
    $('#' + this.options.id + '_column_menu_ul').on('mouseout', function(e) {
        oThis.columnMenuMove = false;
    });

    // 清除设置按钮
    $('#' + this.options.id + '_clearSet').off('click');
    $('#' + this.options.id + '_clearSet').on('click', function(e) {
        oThis.clearLocalData();
        oThis.initGridCompColumn();
        oThis.hasNoScrollRest = false;
        oThis.noScrollWidthReset();
        // 清除排序
        oThis.dataSourceObj.sortRows();
        oThis.repaintGridDivs();
        if (typeof oThis.options.onClearSetFun == 'function') {
            oThis.options.onClearSetFun(oThis);
        }
    });
    // 显示/隐藏列 对应所有列的点击处理
    $('#' + this.options.id + '_column_menu_columns_ul li input').off('click')
    $('#' + this.options.id + '_column_menu_columns_ul li input').on('click', function(e) {
        //待完善 优化与li的click的代码整合
        var index = $(this).closest('li').attr('index');

        if (oThis.gridCompColumnArr[index].options.visible) {
            $(this)[0].checked = false;
            var ll = $('input:checked', $('#' + oThis.options.id + '_column_menu_columns_ul')).length;
            if (ll == 0) {
                $(this)[0].checked = true;
                return;
            }

            if (document.documentMode == 8) {
                var oldScrollTop = $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop;
                var oldTop = $('#' + oThis.options.id + '_column_menu')[0].style.top;
                var oldLeft = $('#' + oThis.options.id + '_column_menu')[0].style.left;
                oThis.gridCompColumnArr[index].options.visible = false;
                oThis.repaintGridDivs();
                $('#' + oThis.options.id + '_column_menu').css('display', 'block');
                $('#' + oThis.options.id + '_column_menu').css('left', oldLeft);
                $('#' + oThis.options.id + '_column_menu').css('top', oldTop);
                $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop = oldScrollTop;

            } else {
                oThis.setColumnVisibleByIndex(index, false);
                oThis.gridCompColumnArr[index].options.visible = false;
            }
        } else {
            $(this)[0].checked = true;

            if (document.documentMode == 8) {
                var oldScrollTop = $('#' + oThis.options.id + '_column_menu')[0].scrollTop;
                var oldTop = $('#' + oThis.options.id + '_column_menu')[0].style.top;
                var oldLeft = $('#' + oThis.options.id + '_column_menu')[0].style.left;
                oThis.gridCompColumnArr[index].options.visible = true;
                oThis.repaintGridDivs();
                $('#' + oThis.options.id + '_column_menu').css('display', 'block');
                $('#' + oThis.options.id + '_column_menu').css('left', oldLeft);
                $('#' + oThis.options.id + '_column_menu').css('top', oldTop);
                $('#' + oThis.options.id + '_column_menu_columns')[0].scrollTop = oldScrollTop;
            } else {
                oThis.setColumnVisibleByIndex(index, true);
                oThis.gridCompColumnArr[index].options.visible = true;
            }

        }
        oThis.saveGridCompColumnArrToLocal();
        e.stopPropagation();
    });
    $('#' + this.options.id + '_column_menu_columns_ul li').off('click');
    $('#' + this.options.id + '_column_menu_columns_ul li').on('click', function(e) {
        var inputDom = $(this).find('input');
        inputDom.click();
    });

    // $('#grid2_column_menu_ul .header input')
    $('#' + this.options.id + '_column_menu_ul .header input').on('click', function(e) {
        var nowCheck = $(this)[0].checked;
        $.each(oThis.gridCompColumnArr, function(i) {
            oThis.setColumnVisibleByColumn(this, nowCheck);
        });
    });
    /*header 按钮处理结束*/
};

export {
    re_initGridCompColumnColumnMenuFun,
    colMenu_initGridCompColumn,
    re_createColumnMenu,
    colMenu_initEventFun,
    colMenu_initGridEventFun
}
