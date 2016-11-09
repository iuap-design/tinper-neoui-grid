const trHoverFun = function(index){
    var oThis = this;
    $('#' + oThis.options.id + '_content_tbody').find('tr').removeClass('u-grid-move-bg');
    $('#' + oThis.options.id + '_content_fixed_tbody').find('tr').removeClass('u-grid-move-bg');
    if(oThis.options.multiSelect)
        $('#' + oThis.options.id + '_content_multiSelect').find('div').removeClass('u-grid-move-bg');
    if(oThis.options.showNumCol)
        $('#' + oThis.options.id + '_content_numCol').find('div').removeClass('u-grid-move-bg');
    if(index > -1){
        var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr').eq(index);
        if($tr[0].id && $tr[0].id == oThis.options.id + '_edit_tr'){
            return;
        }
        $('#' + oThis.options.id + '_content_tbody').find('tr').eq(index).addClass('u-grid-move-bg');
        $('#' + oThis.options.id + '_content_fixed_tbody').find('tr').eq(index).addClass('u-grid-move-bg');
        if(oThis.options.multiSelect)
            $('#' + oThis.options.id + '_content_multiSelect').find('div').eq(index).addClass('u-grid-move-bg');
        if(oThis.options.showNumCol)
            $('#' + oThis.options.id + '_content_numCol').find('div').eq(index).addClass('u-grid-move-bg');
        if(typeof oThis.options.onRowHover == 'function' && !$tr.is('.u-grid-content-sum-row')){
            var obj = {};
            obj.gridObj = oThis;
            obj.rowObj = oThis.dataSourceObj.rows[index];
            obj.rowIndex = index;
            oThis.options.onRowHover(obj);
        }
    }
};
/*
 * 定时器处理
 */
const setIntervalFun = function(e) {
    this.widthChangeFun();
    this.heightChangeFun();
    this.editorRowChangeFun();
};
const editorRowChangeFun = function(){
};
/*
 * grid区域创建完成之后处理
 * 1、数据列显示处理
 * 2、取行高
 */
const afterGridDivsCreate = function(){
    this.columnsVisibleFun();
    this.resetThVariable();
    this.countRowHeight();
    this.noRowsShowFun();
    this.renderTypeFun();
    this.resetScrollLeft();
    this.hideEditMenu();
    this.resetLeftHeight();
    this.isCheckedHeaderRow();
    if(typeof this.options.afterCreate == 'function'){
        this.options.afterCreate.call(this);
    }
};
/*
 * 取行高
 */
const countRowHeight = function(){
    if($('#' + this.options.id + '_content_tbody tr')[0]){
        this.rowHeight = $('#' + this.options.id + '_content_tbody tr')[0].offsetHeight;
    }
};

/**
 * 根据内容区的高度调整左侧区域的高度
 */
const resetLeftHeight = function(){
    if(this.options.showNumCol || this.options.multiSelect){
        var $trs = $('#' + this.options.id + '_content_tbody tr');
        var $leftNums = $('#' + this.options.id + '_content_numCol div');
        var $leftSelects = $('#' + this.options.id + '_content_multiSelect > div');
        for(var i = 0; i < $trs.length;i++){
            var nowRowHeight = $trs[i].offsetHeight;
            if($leftNums[i])
                $leftNums[i].style.height = nowRowHeight + 'px';
            if($leftSelects[i])
                $leftSelects[i].style.height = nowRowHeight + 'px';
        }
    }
}
/*
 * 处理是否显示无数据行
 */
const noRowsShowFun = function(){
    if(this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0){
        $('#' + this.options.id + '_noRowsShow').css('display','none');
        $('#' + this.options.id + '_noRows').css('display','none');
    }else{
        $('#' + this.options.id + '_noRowsShow').css('display','block');
        $('#' + this.options.id + '_noRows').css('display','block');
    }
};

/*
 * grid区域重画完成之后处理，已经执行过afterGridDivsCreate
 * 1、设置横向滚动条
 * 2、隐藏编辑按钮
 */
const afterRepaintGrid = function(){
    this.resetScrollLeft();
    this.hideEditMenu();
};
/*
 * 设置横向滚动条
 */
const resetScrollLeft = function(){
    if($('#' + this.options.id + '_content_div')[0]){
        try{
            $('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
        }catch(e){

        }

    }
};
/*
 * 隐藏编辑按钮
 */
const hideEditMenu = function(){
};

export{
    trHoverFun,
    setIntervalFun,
    editorRowChangeFun,
    afterGridDivsCreate,
    countRowHeight,
    noRowsShowFun,
    afterRepaintGrid,
    resetScrollLeft,
    hideEditMenu,
    resetLeftHeight
}
