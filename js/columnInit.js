/*
 * 处理参数
 */
const init = function(options, gridComp){
    // this.gridComp = gridComp; // 在处理前端缓存将column转为string的时候会因为此属性出现死循环
    var gridOptions = gridComp.options;
    this.gridGetBoolean = gridComp.getBoolean;
    this.defaults = {
            width:200, // 默认宽度为200
            sortable: true, // 是否可以排序
            canDrag: true, // 是否可以拖动
            fixed: false, // 是否固定列
            visible: true, // 是否显示
            canVisible: true, // 是否可以隐藏
            sumCol:false, // 是否计算合计
            editable:true, // 是否可修改
            editFormShow:true, // 是否可修改
            autoExpand:false, // 是否自动扩展列
            editType:'text', // 编辑类型，支持传入function扩展
            dataType:'String', // 数据类型,String, Date, Datetime, Int, Float
            //precision:  //精度
            format:'YYYY-MM-DD hh:mm:ss',
            //renderType:'', 渲染类型
            //headerColor
            headerLevel:1, // header层级
            hiddenLevel:1, // 宽度不足隐藏的优先级，值越大优先隐藏
            // parentHeader 对应的父header的title
            // 目前仅支持两级，多级的话需要改变头的高度，另外处理当前级别的时候需要看下是否存在上级，如果存在上级的话
            // 则创建新的div，这就涉及到需要躲变量计算每级的宽度，需要考虑下如何实现。
            // headerColor:'#a8a8a8'
    };
        // 从grid继承的属性
    var gridDefault = {
        sortable: gridOptions.sortable,
        canDrag: gridOptions.canDrag,
        width: gridOptions.columnWidth
    };
    if(options.dataType == 'Date'){
        this.defaults.format = 'YYYY-MM-DD';
    }
    // 树表暂时不支持排序
    options = this.initTree(options,gridOptions)
    this.options = $.extend({}, this.defaults, gridDefault, options);
    this.getBooleanOptions();
    try{
        if(typeof this.options.renderType == 'string')
            this.options.renderType = eval(this.options.renderType)
    }catch(e){

    }
    try{
        if(typeof this.options.editType == 'string')
            this.options.editType = eval(this.options.editType)
    }catch(e){

    }

    // 转成数字
    this.options.width = this.options.width;
    this.firstColumn = false;
};
const initTree = function(options){
    return options;
};
const getBooleanOptions = function(){
    this.options.sortable = this.gridGetBoolean(this.options.sortable);
    this.options.canDrag = this.gridGetBoolean(this.options.canDrag);
    this.options.fixed = this.gridGetBoolean(this.options.fixed);
    this.options.visible = this.gridGetBoolean(this.options.visible);
    this.options.canVisible = this.gridGetBoolean(this.options.canVisible);
    this.options.sumCol = this.gridGetBoolean(this.options.sumCol);
    this.options.editable = this.gridGetBoolean(this.options.editable);
    this.options.editFormShow = this.gridGetBoolean(this.options.editFormShow);
    this.options.autoExpand = this.gridGetBoolean(this.options.autoExpand);
};

export{
    init,
    initTree,
    getBooleanOptions
}
