/*
 * 设置某列是否显示(传入column)
 */
const setColumnVisibleByColumn = function(column, visible) {
    var index = this.getIndexOfColumn(column);
    this.setColumnVisibleByIndex(index, visible);
};
/*
 * 设置某列是否显示(传入index为gridCompColumnArr中的数据)
 */
const setColumnVisibleByIndex = function(index, visible) {
    if (index >= 0) {
        var column = this.gridCompColumnArr[index],
            visibleIndex = this.getVisibleIndexOfColumn(column),
            canVisible = column.options.canVisible;
        if (!canVisible) {
            return;
        }
        // 显示处理
        if (column.options.visible == false && visible) {
            var htmlStr = '<col';
            if (column.options.width) {
                htmlStr += ' style="width:' + this.formatWidth(column.options.width) + '"';
            }
            htmlStr += '>';

            $('#' + this.options.id + '_header_table th:eq(' + index + ')').css('display', "");
            $('#' + this.options.id + '_content_table th:eq(' + index + ')').css('display', "");
            $('td:eq(' + index + ')', $('#' + this.options.id + '_content tbody tr')).css('display', "");
            // 当前列之后的显示列的index
            var nextVisibleIndex = this.getNextVisibleInidexOfColumn(column);
            if (nextVisibleIndex < 1) {
                // 添加在最后面
                try {
                    $('#' + this.options.id + '_header_table col:last')[0].insertAdjacentHTML('afterEnd', htmlStr);
                    $('#' + this.options.id + '_content_table col:last')[0].insertAdjacentHTML('afterEnd', htmlStr);
                } catch (e) {
                    $('#' + this.options.id + '_header_table col:last').after(htmlStr);
                    $('#' + this.options.id + '_content_table col:last').after(htmlStr);
                }
            } else {
                // 添加在下一个显示列之前
                try {
                    $('#' + this.options.id + '_header_table col:eq(' + (nextVisibleIndex - 1) + ')')[0].insertAdjacentHTML('beforeBegin', htmlStr);
                    $('#' + this.options.id + '_content_table col:eq(' + (nextVisibleIndex - 1) + ')')[0].insertAdjacentHTML('beforeBegin', htmlStr);
                } catch (e) {
                    $('#' + this.options.id + '_header_table col:eq(' + (nextVisibleIndex - 1) + ')').before(htmlStr);
                    $('#' + this.options.id + '_content_table col:eq(' + (nextVisibleIndex - 1) + ')').before(htmlStr);
                }
            }
            var newContentW = this.contentWidth + parseInt(column.options.width);

            $('#' + this.options.id + '_column_menu_columns_ul li input:eq(' + index + ')')[0].checked = true;
        }
        // 隐藏处理
        if (column.options.visible == true && !visible) {
            $('#' + this.options.id + '_header_table th:eq(' + index + ')').css('display', "none");
            $('#' + this.options.id + '_header_table col:eq(' + visibleIndex + ')').remove();
            $('#' + this.options.id + '_content_table th:eq(' + index + ')').css('display', "none");
            $('#' + this.options.id + '_content_table col:eq(' + visibleIndex + ')').remove();
            $('td:eq(' + index + ')', $('#' + this.options.id + '_content_table tbody tr')).css('display', "none");
            // 隐藏之后需要判断总体宽度是否小于内容区最小宽度，如果小于需要将最后一列进行扩展
            var newContentW = this.contentWidth - parseInt(column.options.width);
            $('#' + this.options.id + '_column_menu_columns_ul li input:eq(' + index + ')')[0].checked = false;

        }
        column.options.visible = visible;
        /*
        var w = this.contentWidthChange(newContentW);
        this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
        this.contentWidth = w;
        this.resetThVariable();
        this.saveGridCompColumnArrToLocal();*/
        this.widthChangeGridFun();
    }
};

/*
 * 根据field设置宽度
 */
const setCoulmnWidthByField = function(field, newWidth) {
    var column = this.getColumnByField(field);
    this.setColumnWidth(column, newWidth);
};
/*
 * 根据column对象设置宽度
 */
const setColumnWidth = function(column, newWidth) {
    // if(column != this.lastVisibleColumn){
    if (newWidth > this.minColumnWidth || newWidth == this.minColumnWidth) {
        var nowVisibleThIndex = this.getVisibleIndexOfColumn(column),
            oldWidth = column.options.width,
            changeWidth = newWidth - oldWidth,
            cWidth = this.contentWidth + changeWidth;
        this.contentWidth = this.contentWidthChange(cWidth);
        $('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
        $('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");

        column.options.width = newWidth;
        column.options.realWidth = newWidth;

        this.resetThVariable();
        this.saveGridCompColumnArrToLocal();
    }
    this.columnsVisibleFun();
    // }
};
/*
 * 设置数据源
 */
const setDataSource = function(dataSource) {
    if (!(this.$ele.data('gridComp') == this))
        return;
    this.initDataSourceVariable();
    this.options.dataSource = dataSource;
    this.initDataSource();
    if (this.showType == 'grid') {
        this.widthChangeGridFun();
        if (this.dataSourceObj.rows.length > 0) {
            $('.u-grid-noScroll-left').css('display', "block");
        } else {
            $('.u-grid-noScroll-left').css('display', "none");
        }
    }

};
/*
 * 设置数据源 格式为：
 * {
    fields:['column1','column2','column3','column4','column5','column6'],
    values:[["cl1","1","cl3","cl4","cl5","cl6"]
            ,["cl12","2","cl32","cl42","cl52","cl62"]
            ,["cl13","3","cl33","cl43","cl53","cl63"]
            ,["cl14","4","cl34","cl44","cl54","cl64"]
            ,["cl15","5","cl35","cl45","cl55","cl65"]
            ,["cl16","6","cl36","cl46","cl56","cl66"]
        ]

    }
 */
const setDataSourceFun1 = function(dataSource) {
    var dataSourceObj = {};
    if (dataSource.values) {
        var valuesArr = new Array();
        $.each(dataSource.values, function() {
            if (dataSource.fields) {
                var valueObj = {},
                    value = this;
                $.each(dataSource.fields, function(j) {
                    $(valueObj).attr(this, value[j])
                });
                valuesArr.push(valueObj);
            }
        });
    }
    $(dataSourceObj).attr('values', valuesArr);
    this.setDataSource(dataSourceObj);
};
export const setFunObj = {
    setColumnVisibleByColumn: setColumnVisibleByColumn,
    setColumnVisibleByIndex: setColumnVisibleByIndex,
    setCoulmnWidthByField: setCoulmnWidthByField,
    setColumnWidth: setColumnWidth,
    setDataSource: setDataSource,
    setDataSourceFun1: setDataSourceFun1,
}
