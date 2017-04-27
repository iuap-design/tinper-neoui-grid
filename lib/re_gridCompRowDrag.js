var rowDrag_initGridEventFun = function rowDrag_initGridEventFun() {

    var oThis = this;

    // 判断是否操作在内容行上
    // 根据某个字段判断是否可拖拽，如果可编辑调用rowDragStart
    $('#' + this.options.id + '_content_tbody').on('mousedown', function (e) {
        var $tarTr = $(e.target).closest("tr");
        var isEditTr = $(e.target).closest("tr").hasClass('grid_edit_form_tr');
        if ($tarTr.length > 0 && !isEditTr) {
            var eleTr = $(e.target).closest("tr")[0];
            if (oThis.options.canRowDrag) {
                oThis.rowDragStart(e, eleTr);
            }
            // e.preventDefault();
        }
    });

    // move事件
    $('#' + this.options.id + '_content_tbody').on('mousemove', function (e) {
        oThis.mouseMoveX = e.clientX;
        oThis.mouseMoveY = e.clientY;
        if (oThis.rowDragEle && (oThis.mouseMoveX != oThis.rowDragStartX || oThis.mouseMoveY != oThis.rowDragStartY) && oThis.options.canRowDrag) {
            oThis.rowDragFlag = true;
            // 鼠标按下之后移动了
            oThis.rowDragFun(e);
        }

        e.stopPropagation();
    });

    $('#' + this.options.id + '_content_tbody').on('mouseup', function (e) {
        oThis.mouseUpX = e.clientX;
        oThis.mouseUpY = e.clientY;
        oThis.rowDragEnd(e);
    });
};

// const rowDrag_initGridEventFun = function(){
// 	// 扩展方法
// 	var oThis = this;
// };
// 行拖拽开始之前
var rowDragStart = function rowDragStart(e, ele) {
    var oThis = this;
    // 保存element，
    // 记录之前clientx，clienty
    // 记录当前行的序号
    if (!this.options.canRowDrag) {
        return;
    }
    this.rowDragStartX = e.clientX;
    this.rowDragStartY = e.clientY;
    this.rowDragEle = ele;
    // 查询rowDragEle是第几个tr元素
    $('#' + this.options.id + '_content_tbody').find('tr').each(function (i) {
        if ($(this).is(oThis.rowDragEle)) {
            oThis.rowDragStartIndex = i;
            return false;
        }
    });
};

// 行拖拽
var rowDragFun = function rowDragFun(e) {
    var oThis = this;
    // 拖拽时动态生成图标
    if (!oThis.options.canRowDrag) {
        return;
    }

    if (this.rowDragFlag) {
        this.rowDragEndX = e.clientX;
        this.rowDragEndY = e.clientY;
        var changeX = this.rowDragEndX - this.rowDragStartX,
            changeY = this.rowDragEndY - this.rowDragStartY;
        var rowHeight = this.rowDragEle.clientHeight;

        var rowCounts = parseInt(changeY / rowHeight);

        if (rowCounts < 0) {
            this.dragdirection = -1;
        } else {
            this.dragdirection = 1;
        }

        this.rowDragEndIndex = this.rowDragStartIndex + rowCounts;

        if (this.rowDragEndIndex < 0) {
            this.rowDragEndIndex = 0;
        }

        if (this.rowDragEndIndex != this.rowDragStartIndex) {
            // var $flagIconDom = $('<span class="uf uf-moveoption" />');
            //先删除相关的标记元素
            $('#' + this.options.id + '_content_tbody').find('tr td').removeClass('u-grid-drag-icon');
            //添加标记元素
            $('#' + this.options.id + '_content_tbody').find('tr').eq(this.rowDragEndIndex).find('td').first().addClass('u-grid-drag-icon');
        }
    }
};

// 行拖拽结束
var rowDragEnd = function rowDragEnd(e) {
    var tempdata;
    if (!this.options.canRowDrag) {
        return;
    }
    if (this.rowDragFlag && this.rowDragEndIndex != this.rowDragStartIndex) {
        //保存下临时数据
        tempdata = this.dataSourceObj.rows[this.rowDragStartIndex];

        $('#' + this.options.id + '_content_tbody').find('tr td').removeClass('u-grid-drag-icon');

        if (this.dragdirection < 0) {

            //dom元素操作
            $('#' + this.options.id + '_content_tbody').find('tr').eq(this.rowDragEndIndex).before(this.rowDragEle);

            // 删除起始位置
            this.dataSourceObj.rows.splice(this.rowDragStartIndex, 1);

            this.dataSourceObj.rows.splice(this.rowDragEndIndex, 0, tempdata);
        } else {

            // 数据操作
            this.dataSourceObj.rows.splice(this.rowDragStartIndex, 1);
            // dom元素操作
            if (this.rowDragEndIndex >= this.dataSourceObj.rows.length) {
                $('#' + this.options.id + '_content_tbody').append(this.rowDragEle);
                this.dataSourceObj.rows.splice(this.rowDragEndIndex + 1, 0, tempdata);
            } else {
                $('#' + this.options.id + '_content_tbody').find('tr').eq(this.rowDragEndIndex + 1).before(this.rowDragEle);
                this.dataSourceObj.rows.splice(this.rowDragEndIndex, 0, tempdata);
            }
        }
    }
    // 删除之前行，插入新行

    this.rowDragFlag = false;
    this.rowDragEle = undefined;
};

var setRowDrag = function setRowDrag(isDrag) {
    this.options.canRowDrag = isDrag;
};
export var rowDragFunObj = {
    rowDrag_initGridEventFun: rowDrag_initGridEventFun,
    rowDragStart: rowDragStart,
    rowDragFun: rowDragFun,
    rowDragEnd: rowDragEnd,
    setRowDrag: setRowDrag
};