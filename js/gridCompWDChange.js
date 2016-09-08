/*
 * 整体宽度改变处理
 */
const widthChangeFun = function() {
    var oThis = this;
    if($('#' + this.options.id)[0]){
        // 获取整体区域宽度
        var w = $('#' + this.options.id).width()  //[0].offsetWidth;
        if(this.wholeWidth != w && this.$ele.data('gridComp') == this){
            this.wholeWidth = w;
            // 树展开/合上的时候会导致页面出现滚动条导致宽度改变，没有&&之后会重新刷新页面导致无法收起
            if (w > this.options.formMaxWidth && ((this.showType == 'form' || this.showType == '') || !$('#' + this.options.id + '_content_div tbody')[0]) || this.options.overWidthHiddenColumn) { //lyk--需要完善隐藏之后再显示同事添加数据操作
                oThis.widthChangeGridFun();
            } else if (w > 0 && w < this.options.formMaxWidth && (this.showType == 'grid' || this.showType == '')) {
            }
            if(w > this.options.formMaxWidth){
                this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
                if(this.contentMinWidth < 0)
                    this.contentMinWidth = 0;
                setTimeout(function(){
                    $('#' + oThis.options.id + '_header_wrap').css('max-width', (oThis.wholeWidth) + 'px');
                    $('#' + oThis.options.id + '_content_div').css('width', oThis.contentMinWidth  + 'px');
                    $('#' + oThis.options.id + '_content_table').css('min-width', oThis.contentMinWidth  + 'px');
                    $('#' + oThis.options.id + '_content_table').css('width', oThis.contentMinWidth  + 'px');
                    $('#' + oThis.options.id + '_header_table').css('min-width', oThis.contentMinWidth + 'px');
                    $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
                    $('#' + oThis.options.id + '_noRowsShow').css('width', oThis.contentMinWidth + 'px');
                    //滚动条可能发生变化导致grid内部列的宽度发生变化
                    oThis.columnsVisibleFun();
                    if(oThis.contentRealWidth < oThis.contentMinWidth){
                        oThis.contentWidth = oThis.contentMinWidth;
                    }else{
                        oThis.contentWidth = oThis.contentRealWidth;
                    }
                    $('#' + oThis.options.id + '_noRows').css('width', oThis.contentWidth + 'px');
                    if(typeof oThis.options.afterCreate == 'function'){
                        oThis.options.afterCreate.call(oThis);
                    }
                },300);
            }
            $('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
            $('#' + oThis.options.id + '_edit_form').css('width', oThis.contentMinWidth + 'px');
        }

    }
};
/*
 * 整体宽度改变处理(grid形式)
 */
const widthChangeGridFun = function() {
    var oThis = this,halfWholeWidth = parseInt(this.wholeWidth/2);
    this.widthChangeGridFunFixed(halfWholeWidth);
    /* 如果宽度不足处理自动隐藏*/
    this.widthChangeGridFunOverWidthHidden();
    // 内容区域宽度自动扩展
    this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
    if(this.contentMinWidth < 0)
        this.contentMinWidth = 0;
    if(this.contentRealWidth < this.contentMinWidth){
        this.contentWidth = this.contentMinWidth;
        var oldWidth = this.lastVisibleColumn.options.width;
        this.lastVisibleColumnWidth = oldWidth + (this.contentMinWidth - this.contentRealWidth);
        // modfied by tianxq1 最后一列自动扩展
        this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
    }else{
        this.contentWidth = this.contentRealWidth;
    }
    this.createGridFlag = false;
    this.createGridDivs();
    $('#' + this.options.id + '_form').css('display', 'none');
    $('#' + this.options.id + '_grid').css('display', 'block');
};
const widthChangeGridFunFixed = function(halfWholeWidth){
};
const widthChangeGridFunOverWidthHidden = function(){
};
/*
 * 整体高度改变处理
 */
const heightChangeFun = function() {
    if(this.countContentHeight){
        var oldH = this.wholeHeight,h = $('#' + this.options.id)[0].offsetHeight;
        this.wholeHeight = h;
        if (oldH != h && h > 0) {
            var contentH = h - this.exceptContentHeight  > 0 ? h - this.exceptContentHeight : 0;
            $('#' + this.options.id + '_content').css('height', contentH + 'px');
            $('#' + this.options.id + '_content_div').css('height', contentH + 'px');
        }
    }
};
/*
 * 内容区宽度改变
 */
const contentWidthChange = function(newContentWidth){
    if(newContentWidth < this.contentMinWidth){
        var oldW = this.lastVisibleColumn.options.width;
        this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
        $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
        $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
        newContentWidth = this.contentMinWidth;
    }

    if(newContentWidth > this.contentMinWidth){
        // 首先处理扩展列的宽度为原有宽度，然后再扩展最后一列
        var l = this.overWidthVisibleColumnArr.length;
        if(l > 0){
            for(var i = 0; i < l; i++){
                var overWidthColumn = this.overWidthVisibleColumnArr[i];
                var nowVisibleIndex = this.getVisibleIndexOfColumn(overWidthColumn);
                var w = overWidthColumn.options.width;
                var realW = overWidthColumn.options.realWidth;
                $('#' + this.options.id + '_header_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
                $('#' + this.options.id + '_content_table col:eq(' + nowVisibleIndex + ')').css('width', realW + "px");
                newContentWidth = newContentWidth - (w - realW);
                overWidthColumn.options.width = overWidthColumn.options.realWidth;
            }
            if(newContentWidth < this.contentMinWidth){
                var oldW = this.lastVisibleColumn.options.width;
                this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
                $('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
                $('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
                this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
                newContentWidth = this.contentMinWidth;
            }
        }
        if(newContentWidth > this.contentMinWidth){
            $('#' + this.options.id + '_content_left_bottom').css('display','block');
            $('#' + this.options.id + '_content_left_sum_bottom').css('bottom',16);
        }else{
            $('#' + this.options.id + '_content_left_bottom').css('display','none');
            $('#' + this.options.id + '_content_left_sum_bottom').css('bottom',0);
        }
    }else{
        $('#' + this.options.id + '_content_left_bottom').css('display','none');
        $('#' + this.options.id + '_content_left_sum_bottom').css('bottom',0);
    }
    $('#' + this.options.id + '_content_table').css('width', newContentWidth + "px");
    $('#' + this.options.id + '_noRows').css('width', newContentWidth + "px");
    return newContentWidth;
};
export{
    widthChangeFun,
    widthChangeGridFun,
    widthChangeGridFunFixed,
    widthChangeGridFunOverWidthHidden,
    heightChangeFun,
    contentWidthChange
}
