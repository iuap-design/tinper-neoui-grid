/*
 * 获取某列对应属性
 */
const getColumnAttr = function(attr, field) {
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return $(this.gridCompColumnArr[i].options).attr(attr);
        }
    }
    return "";
};
/*
 * 根据field获取gridcompColumn对象
 */
const getColumnByField = function(field){
    for (var i = 0; i < this.gridCompColumnArr.length; i++) {
        if (this.gridCompColumnArr[i].options.field == field) {
            return this.gridCompColumnArr[i];
        }
    }
    return null;
};
/*
 * 获取column属于第几列
 */
const getIndexOfColumn = function(column){
    var index = -1;
    for(var i=0;i < this.gridCompColumnArr.length;i++){
        if(this.gridCompColumnArr[i] == column){
            index = i;
            break;
        }
    }
    return index;
};
/*
 * 获取column属于当前显示第几列
 */
const getVisibleIndexOfColumn = function(column){
    var index = -1;
    var j = 0;
    for(var i=0;i < this.gridCompColumnArr.length;i++){
        if(this.gridCompColumnArr[i] == column){
            if(!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){
                index = j;
            }
            break;
        }
        if(!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){
            j++;
        }
    }
    return index;
};
/*
 * 获取column后面第一个显示列所在第几列
 */
const getNextVisibleInidexOfColumn = function(column){
    var index = -1,flag = false,j = 0;
    for(var i=0;i < this.gridCompColumnArr.length;i++){
        if(this.gridCompColumnArr[i] == column){
            flag = true;
            continue;
        }
        if(flag == true && !($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){
            index = j;
            break;
        }
        if(!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){

            j++;
        }
    }
    return index;
};

/*
 * 获取选中行
 */
const getSelectRows = function(){
    return this.selectRows;
};
/*
 * 获取选中行对应行号
 */
const getSelectRowsIndex = function(){
    return this.selectRowsIndex;
};

/*
 * 获取focus行
 */
const getFocusRow = function(){
    return this.focusRow;
};
/*
 * 获取focus行对应行号
 */
const getFocusRowIndex = function(){
    return this.focusRowIndex;
};
/*
 * 获取所有行
 */
const getAllRows = function(){
    var oThis = this;
    this.allRows = new Array();
    if(this.dataSourceObj.rows){
        $.each(this.dataSourceObj.rows,function(){
            oThis.allRows.push(this.value);
        });
    }
    return this.allRows;
};
/*
 * 根据行号获取row
 */
const getRowByIndex = function(index){
    return this.dataSourceObj.rows[index];
};
/*
 * 根据某个字段值获取rowIndex
 */
const getRowIndexByValue = function(field,value){
    var index = -1;
    $.each(this.dataSourceObj.rows,function(i){
        var v = $(this.value).attr(field);
        if(v == value){
            index = i;
        }
    })
    return index;
};

export{
    getColumnAttr,
    getColumnByField,
    getIndexOfColumn,
    getVisibleIndexOfColumn,
    getNextVisibleInidexOfColumn,
    getSelectRows,
    getSelectRowsIndex,
    getFocusRow,
    getFocusRowIndex,
    getAllRows,
    getRowByIndex,
    getRowIndexByValue
}