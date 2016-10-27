/*
 * 处理renderType
 * begin为起始行，length为行数（增加行数时使用）
 */
const renderTypeFun = function(obj){
    if(!this.isGridShow())
        return;
    if(typeof obj == 'undefined'){
        var begin = null,length = null,field = '';
    }else{
        var begin = typeof obj.begin == 'undefined'?null:obj.begin,length = typeof obj.length == 'undefined'?null:obj.length,field = typeof obj.field == 'undefined'?'':obj.field;
    }
    var oThis = this,begin = parseInt(begin),length = parseInt(length),end = begin;
    if(length >0){
        end = parseInt(begin + length - 1);
    }
    if (field == ''){
        if(this.gridCompColumnFixedArr)
            $.each(this.gridCompColumnFixedArr,function(i){
                oThis.renderTypeByColumn(this,i,begin,length,true);
            })
        $.each(this.gridCompColumnArr,function(i){
            oThis.renderTypeByColumn(this,i,begin,length, false);
        })
    }
    else{
        var rendered = false
        if(this.gridCompColumnFixedArr)
            $.each(this.gridCompColumnFixedArr,function(i){
                if (this.options.field == field){
                    oThis.renderTypeByColumn(this,i,begin,length,true);
                    rendered = true
                    return;
                }
            })
        if (!rendered)
            $.each(this.gridCompColumnArr,function(i){
                if (this.options.field == field){
                    oThis.renderTypeByColumn(this,i,begin,length,false);
                    return;
                }
            })
    }
};
/*
 * 处理renderType
 * gridCompColumn对象，index为第几列
 * begin为起始行，length为行数（增加行数时使用）
 */
const renderTypeByColumn = function(gridCompColumn,i,begin,length, isFixedColumn){
    var oThis = this,renderType = gridCompColumn.options.renderType,
        sumCol = gridCompColumn.options.sumCol,
        sumRenderType = gridCompColumn.options.sumRenderType,
        dataType = gridCompColumn.options.dataType,
        precision = gridCompColumn.options.precision,
        format = gridCompColumn.options.format,field = gridCompColumn.options.field,
        end = begin,idSuffix = isFixedColumn === true ? '_content_fixed_tbody' : '_content_tbody',
        idStr = isFixedColumn === true? 'fixed_' : '',
        visibleColIndex = this.getVisibleIndexOfColumn(gridCompColumn);


    if(length >0){
        end = parseInt(begin + length - 1);
    }
    this.realtimeTableRows = document.getElementById(oThis.options.id + idSuffix).children;
    // 记录role不是row的行
    var notRowIndex = -1;
    for(var k = 0;k < oThis.realtimeTableRows.length;k++) {
        if(oThis.realtimeTableRows[k].getAttribute("role") != "row") {
            notRowIndex = k
        }
    }
    $.each(oThis.dataSourceObj.rows, function(j) {
        if((begin >= 0 && j >= begin && j <= end) || isNaN(begin)){
            //如果当前修改此列则将变量重置
            if(oThis.editColIndex == visibleColIndex && oThis.eidtRowIndex == j && oThis.options.editType == 'default'){
                oThis.editColIndex = -1;
                oThis.eidtRowIndex = -1;
            }
            var trIndex = j;
            if(notRowIndex != -1 && j >= notRowIndex) {
                trIndex++;
            }
            var tr = oThis.realtimeTableRows[trIndex],td = tr.children[i];
            if (oThis.iconSpan) {
						var iconSpan = oThis.iconSpan;
					}

            if(td){
                if(td.children[0].innerHTML.indexOf('u-grid-content-tree-span')   !=  -1){
                    var span =  td.children[0].children[1];
                }else{
                    // td.innerHTML = '<div class="u-grid-content-td-div"></div>'; //如果是树表的话第一列显示会有问题，等出现其他问题之后再修改此处
                    var span =  td.children[0];
                }
                if(span){
                    var v = $(this.value).attr(field);
                    if(typeof renderType == 'function' || dataType == 'Date' || dataType == 'Datetime' || dataType == 'Int' || dataType == 'Float'){
                        span.innerHTML = '';
                        if(typeof renderType == 'function'){
                            v = oThis.getString(v,'');
                            var obj = {};
                            obj.value = v;
                            obj.element = span;
                            obj.gridObj = oThis;
                            obj.row = this;
                            obj.gridCompColumn = gridCompColumn;
                            obj.rowIndex = j;
                            renderType.call(oThis,obj);
                        }else if(dataType == 'Date' || dataType == 'Datetime'){
                            if(v == null || v == undefined || v == 'null' || v == 'undefined' || v == ""){
                                v = "";
                            }
                            if (dataType == 'Date'){
                                v = u.dateRender(v);
                            }else{
                                v = u.dateTimeRender(v);
                            }
                            span.innerHTML = v;
                            span.title = v;
                        }else if(dataType == 'Int'){
                            v = parseInt(v);
                            if(v){
                                span.innerHTML = v;
                                span.title = v;
                            }else{
                                span.innerHTML = "";
                                span.title = "";
                            }
                        }else if(dataType == 'Float'){
                            if(precision){
                                var o = {};
                                o.value = v;
                                o.precision = precision;
                                v = oThis.DicimalFormater(o);
                            }else{
                                v = parseFloat(v);
                            }
                            if(v){
                                span.innerHTML = v;
                                span.title = v;
                            }else{
                                span.innerHTML = "";
                                span.title = "";
                            }
                        }else{ //此处逻辑放到渲染处，减少render执行次数。
                            v = oThis.getString(v,'');
                            var v1 = v.replace(/\</g,'\<');
                            v1 = v1.replace(/\>/g,'\>');
                            span.title = v;
                            v = v.replace(/\</g,'&lt;');
                            v = v.replace(/\>/g,'&gt;');
                            span.innerHTML = v;
                        }
                    }else{
                        v = oThis.getString(v,'');
                        var v1 = v.replace(/\</g,'\<');
                        v1 = v1.replace(/\>/g,'\>');
                        span.title = v;
                        v = v.replace(/\</g,'&lt;');
                        v = v.replace(/\>/g,'&gt;');
                        if (i == 0 && iconSpan) {
                        	v = iconSpan += v;
                       }
                        span.innerHTML = v;
                    }

                    /* 增加处理判断是否需要显示... */
                    var obj = {
                        span: span,
                        column: gridCompColumn
                    };
                    var overFlag = oThis.getRenderOverFlag(obj);
                    if (overFlag) {
                        $(span).addClass('u-grid-content-td-div-over');
                    }
                }

            }
        }
    });
    this.renderTypeSumRow(gridCompColumn,i,begin,length, isFixedColumn);
};

const getRenderOverFlag = function(obj){
    var span = obj.span;
    var nowHeight = span.offsetHeight;
    var nowWidth = span.offsetWidth;
    var newSpan = $(span).clone()[0];
    var overFlag = false;
    obj.span.parentNode.appendChild(newSpan);
    newSpan.style.height = '';
    newSpan.style.maxHeight = '999999px';
    var newHeight = newSpan.offsetHeight;
    if (newHeight > nowHeight) {
        overFlag = true;
    }
    obj.span.parentNode.removeChild(newSpan);
    return overFlag;
};

const renderTypeSumRow = function(gridCompColumn,i,begin,length, isFixedColumn){
};
export{
    renderTypeFun,
    renderTypeByColumn,
    renderTypeSumRow,
    getRenderOverFlag
}
