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
        global.gridCompWDChange = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /*
     * 整体宽度改变处理
     */
    const widthChangeFun = function () {
        var oThis = this;
        if ($('#' + this.options.id)[0]) {
            // 获取整体区域宽度
            //var w = $('#' + this.options.id).width()  //[0].offsetWidth;
            // jquery获取方式有问题，修改为offsetWidth
            var w = $('#' + this.options.id)[0].offsetWidth;
            // w!=0的判断是为了处理页签中的grid在切换的过程中会重绘
            if (this.wholeWidth != w && this.$ele.data('gridComp') == this && w != 0) {
                this.wholeWidth = w;

                // 树展开/合上的时候会导致页面出现滚动条导致宽度改变，没有&&之后会重新刷新页面导致无法收起
                if (w > this.options.formMaxWidth && (this.showType == 'form' || this.showType == '' || !$('#' + this.options.id + '_content_div tbody')[0]) || this.options.overWidthHiddenColumn || this.options.noScroll) {
                    //lyk--需要完善隐藏之后再显示同事添加数据操作
                    oThis.widthChangeGridFun();
                } else if (w > 0 && w < this.options.formMaxWidth && (this.showType == 'grid' || this.showType == '')) {}
                if (w > this.options.formMaxWidth) {
                    this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
                    if (this.contentMinWidth < 0) this.contentMinWidth = 0;
                    setTimeout(function () {
                        $('#' + oThis.options.id + '_header_wrap').css('max-width', oThis.wholeWidth + 'px');
                        $('#' + oThis.options.id + '_content_div').css('width', oThis.contentMinWidth + 'px');
                        $('#' + oThis.options.id + '_content_table').css('min-width', oThis.contentMinWidth + 'px');
                        $('#' + oThis.options.id + '_content_table').css('width', oThis.contentMinWidth + 'px');
                        $('#' + oThis.options.id + '_header_table').css('min-width', oThis.contentMinWidth + 'px');
                        $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
                        $('#' + oThis.options.id + '_noRowsShow').css('width', oThis.contentMinWidth + 'px');
                        //滚动条可能发生变化导致grid内部列的宽度发生变化
                        oThis.columnsVisibleFun();
                        if (oThis.contentRealWidth < oThis.contentMinWidth) {
                            oThis.contentWidth = oThis.contentMinWidth;
                        } else {
                            oThis.contentWidth = oThis.contentRealWidth;
                        }
                        $('#' + oThis.options.id + '_noRows').css('width', oThis.contentWidth + 'px');
                        if (typeof oThis.options.afterCreate == 'function') {
                            oThis.options.afterCreate.call(oThis);
                        }
                    }, 300);
                }
                $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
                $('#' + oThis.options.id + '_edit_form').css('width', oThis.contentMinWidth + 'px');

                this.preWholeWidth = w;
                this.resetLeftHeight();
            }
        }
    };
    /*
     * 整体宽度改变处理(grid形式)
     */
    const widthChangeGridFun = function () {
        var oThis = this,
            halfWholeWidth = parseInt(this.wholeWidth / 2);
        this.noScrollWidthReset();
        this.widthChangeGridFunFixed(halfWholeWidth);
        /* 如果宽度不足处理自动隐藏*/
        this.widthChangeGridFunOverWidthHidden();
        // 内容区域宽度自动扩展
        this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
        if (this.contentMinWidth < 0) this.contentMinWidth = 0;
        if (this.contentRealWidth < this.contentMinWidth) {
            this.contentWidth = this.contentMinWidth;
            var oldWidth = this.lastVisibleColumn.options.width;
            this.lastVisibleColumnWidth = oldWidth + (this.contentMinWidth - this.contentRealWidth);
            // modfied by tianxq1 最后一列自动扩展
            this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
        } else {
            this.contentWidth = this.contentRealWidth;
        }
        this.createGridFlag = false;
        this.createGridDivs();
        $('#' + this.options.id + '_form').css('display', 'none');
        $('#' + this.options.id + '_grid').css('display', 'block');
    };

    /**
     * 不显示滚动条的情况下需要重置每列的宽度
     */
    const noScrollWidthReset = function () {
        if (this.options.noScroll) {
            //云采不支持拖动，后续再完善拖动之后的情况
            /*if (this.hasNoScrollRest) {
                var nowW = 0;
                for (var i = 0; i < this.gridCompColumnArr.length; i++) {
                    var column = this.gridCompColumnArr[i];
                    var nowWidth = column.options.width;
                    var pre = this.preWholeWidth - this.leftW;
                    var whole = this.wholeWidth - this.leftW;
                    var newWidth = parseInt(nowWidth / pre * whole);
                    if(column.options.visible){
                        nowW += newWidth;
                    }
                    this.setColumnWidth(column, newWidth);
                }
             } else {*/
            //先按100%来处理
            var nowW = 0;
            for (var i = 0; i < this.gridCompColumnArr.length; i++) {
                var column = this.gridCompColumnArr[i];
                // var nowWidth = column.options.width + '';
                var nowWidth = column.options.optionsWidth + '';
                var whole = this.wholeWidth - this.leftW;

                if (nowWidth.indexOf('%') > 0) {
                    var newWidth = parseInt(nowWidth.replace('%', '') * whole / 100);
                } else {
                    var newWidth = nowWidth;
                }
                if (newWidth < this.minColumnWidth) {
                    newWidth = this.minColumnWidth;
                }
                if (column.options.visible) {
                    nowW += newWidth;
                }
                this.setColumnWidth(column, newWidth);
            }
            /*}*/
            this.hasNoScrollRest = true;
        }
        if (nowW > whole) {
            var lastVisibleColumn = this.lastVisibleColumn;
            var lastWidth = lastVisibleColumn.options.width;
            var newLastWidth = lastWidth - (nowW - whole);
            this.setColumnWidth(lastVisibleColumn, newLastWidth);
        }
    };
    const widthChangeGridFunFixed = function (halfWholeWidth) {};
    const widthChangeGridFunOverWidthHidden = function () {};
    /*
     * 整体高度改变处理
     */
    const heightChangeFun = function () {
        if (this.countContentHeight) {
            var oldH = this.wholeHeight,
                h = $('#' + this.options.id)[0].offsetHeight;
            this.wholeHeight = h;
            if (oldH != h && h > 0) {
                var contentH = h - 1 - this.exceptContentHeight > 0 ? h - 1 - this.exceptContentHeight : 0;
                $('#' + this.options.id + '_content').css('height', contentH + 'px');
                $('#' + this.options.id + '_content_div').css('height', contentH + 'px');
            }
        }
    };
    /*
     * 内容区宽度改变
     */
    const contentWidthChange = function (newContentWidth) {
        if (newContentWidth < this.contentMinWidth) {
            var oldW = parseInt(this.lastVisibleColumn.options.width);
            this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
            $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
            $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
            newContentWidth = this.contentMinWidth;
        }

        if (newContentWidth > this.contentMinWidth) {
            // 首先处理扩展列的宽度为原有宽度，然后再扩展最后一列
            var l = this.overWidthVisibleColumnArr.length;
            if (l > 0) {
                for (var i = 0; i < l; i++) {
                    var overWidthColumn = this.overWidthVisibleColumnArr[i];
                    var nowVisibleIndex = this.getVisibleIndexOfColumn(overWidthColumn);
                    var w = parseInt(overWidthColumn.options.width);
                    var realW = overWidthColumn.options.realWidth;
                    $('#' + this.options.id + '_header_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
                    $('#' + this.options.id + '_content_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
                    newContentWidth = newContentWidth - (w - realW);
                    overWidthColumn.options.width = overWidthColumn.options.realWidth;
                }
                if (newContentWidth < this.contentMinWidth) {
                    var oldW = parseInt(this.lastVisibleColumn.options.width);
                    this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
                    $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
                    $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
                    this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
                    newContentWidth = this.contentMinWidth;
                }
            }
            if (newContentWidth > this.contentMinWidth) {
                $('#' + this.options.id + '_content_left_bottom').css('display', 'block');
                $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 16);
            } else {
                $('#' + this.options.id + '_content_left_bottom').css('display', 'none');
                $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 0);
            }
        } else {
            $('#' + this.options.id + '_content_left_bottom').css('display', 'none');
            $('#' + this.options.id + '_content_left_sum_bottom').css('bottom', 0);
        }
        if (!this.options.noScroll) {
            $('#' + this.options.id + '_content_table').css('width', newContentWidth + "px");
            $('#' + this.options.id + '_noRows').css('width', newContentWidth + "px");
        }

        return newContentWidth;
    };
    const wdChangeFunObj = exports.wdChangeFunObj = {
        widthChangeFun: widthChangeFun,
        widthChangeGridFun: widthChangeGridFun,
        widthChangeGridFunFixed: widthChangeGridFunFixed,
        widthChangeGridFunOverWidthHidden: widthChangeGridFunOverWidthHidden,
        heightChangeFun: heightChangeFun,
        contentWidthChange: contentWidthChange,
        noScrollWidthReset: noScrollWidthReset
    };
});