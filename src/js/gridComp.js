import {
    createFunObj
} from './gridCompCreate';

import {
    createCalFunOjb
} from './gridCompCreateCal';

import {
    eventFunObj
} from './gridCompEvent';

import {
    getFunObj
} from './gridCompGet';

import {
    initFunObj
} from './gridCompInit';

import {
    operateRowFunObj
} from './gridCompOperateRow';

import {
    renderTypeFunObj
} from './gridCompRenderType';

import {
    setFunObj
} from './gridCompSet';

import {
    wdChangeFunObj
} from './gridCompWDChange';

import {
    clickFunObj
} from './gridCompClick';

import {
    otherFunObj
} from './gridCompOther';

import {
    utilFunOjb
} from './ut_utility';

class gridComp {

    constructor(ele, options) {
        this.init(ele, options);
        this.initGrid();
    }

};
var gridCompProto = gridComp.prototype;
Object.assign(gridCompProto, createFunObj);
Object.assign(gridCompProto, createCalFunOjb);
Object.assign(gridCompProto, eventFunObj);
Object.assign(gridCompProto, getFunObj);
Object.assign(gridCompProto, initFunObj);
Object.assign(gridCompProto, operateRowFunObj);
Object.assign(gridCompProto, renderTypeFunObj);
Object.assign(gridCompProto, setFunObj);
Object.assign(gridCompProto, wdChangeFunObj);
Object.assign(gridCompProto, clickFunObj);
Object.assign(gridCompProto, otherFunObj);
Object.assign(gridCompProto, utilFunOjb);

/*
 * colmuenu
 */
var oldInitGridCompColumn = gridCompProto.initGridCompColumn,
    oldInitEventFun = gridCompProto.initEventFun,
    oldInitGridEventFun = gridCompProto.initGridEventFun;

import {
    re_initGridCompColumnColumnMenuFun,
    colMenu_initGridCompColumn,
    re_createColumnMenu,
    colMenu_initEventFun,
    colMenu_initGridEventFun
} from './re_gridCompColMenu';

gridCompProto.initGridCompColumnColumnMenuFun = re_initGridCompColumnColumnMenuFun;
gridCompProto.initGridCompColumn = function() {
    // 执行原有方法
    oldInitGridCompColumn.apply(this, arguments);
    colMenu_initGridCompColumn.apply(this, arguments);

};
gridCompProto.createColumnMenu = re_createColumnMenu;
gridCompProto.initEventFun = function() {
    // 执行原有方法
    oldInitEventFun.apply(this, arguments);
    colMenu_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function() {
    // 执行原有方法
    oldInitGridEventFun.apply(this, arguments);
    colMenu_initGridEventFun.apply(this, arguments);
};

if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
    gridCompProto.saveGridCompColumnArrToLocal = function() {};
}
if (typeof gridCompProto.clearLocalData == 'undefined') {
    gridCompProto.clearLocalData = function() {};
}


/*
 * grag
 */
var oldInitEventFun_grag = gridCompProto.initEventFun;
var oldInitGridEventFun_grag = gridCompProto.initGridEventFun;
import {
    dragFunObj
} from './re_gridCompDrag';
Object.assign(gridCompProto, dragFunObj);
gridCompProto.initEventFun = function() {
    // 执行原有方法
    oldInitEventFun_grag.apply(this, arguments);
    dragFunObj.drag_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function() {
    // 执行原有方法
    oldInitGridEventFun_grag.apply(this, arguments);
    dragFunObj.drag_initGridEventFun.apply(this, arguments);
};
if (typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined') {
    gridCompProto.saveGridCompColumnArrToLocal = function() {};
}


/*
 * edit
 */
var oldInitEventFun_edit = gridCompProto.initEventFun;
import {
    eidtFunObj
} from './re_gridCompEdit';
Object.assign(gridCompProto, eidtFunObj);

if (typeof gridCompProto.formEditCell == 'undefined') {
    gridCompProto.formEditCell = function() {};
};

gridCompProto.initEventFun = function() {
    // 执行原有方法
    oldInitEventFun_edit.apply(this, arguments);
    eidtFunObj.edit_initEventFun.apply(this, arguments);
};

/*
 * editForm
 */
var oldInitDefault = gridCompProto.initDefault,
    oldSetRequired = gridCompProto.setRequired;
import {
    editFromFunObj
} from './re_gridCompEditForm';
Object.assign(gridCompProto, editFromFunObj);
gridCompProto.initDefault = function() {
    // 执行原有方法
    oldInitDefault.apply(this, arguments);
    editFromFunObj.editForm_initDefault.apply(this, arguments);
};
gridCompProto.setRequired = function() {
    // 执行原有方法
    oldSetRequired.apply(this, arguments);
    editFromFunObj.editForm_setRequired.apply(this, arguments);
};


/*
 * fixed
 */
var oldColumnsVisibleFun = gridCompProto.columnsVisibleFun;
import {
    fixFunObj
} from './re_gridCompFixed';
Object.assign(gridCompProto, fixFunObj);
gridCompProto.columnsVisibleFun = function() {
    // 执行原有方法
    oldColumnsVisibleFun.apply(this, arguments);
    fixFunObj.fixed_columnsVisibleFun.apply(this, arguments);
};

/*
 * formShow
 */
import {
    formShowFunOjb
} from './re_gridCompFormShow'
Object.assign(gridCompProto, formShowFunOjb);

/*
 * headerLevel
 */
import {
    headerLevelFunObj
} from './re_gridCompHeaderLevel'
Object.assign(gridCompProto, headerLevelFunObj);

/*
 * localStorage
 */
import {
    localStorageFunObj
} from './re_gridCompLocalStorage';
Object.assign(gridCompProto, localStorageFunObj);


/*
 * overWidthColumn
 */
import {
    overWidthHiddenFunObj
} from './re_gridCompOverWidthHidden';
Object.assign(gridCompProto, overWidthHiddenFunObj);


/*
 * sort
 */
var oldInitEventFun_sort = gridCompProto.initEventFun;
var oldInitGridEventFun_sort = gridCompProto.initGridEventFun;
import {
    sortFunObj
} from './re_gridCompSort';
Object.assign(gridCompProto, sortFunObj);
gridCompProto.initEventFun = function() {
    // 执行原有方法
    oldInitEventFun_sort.apply(this, arguments);
    sortFunObj.sort_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function() {
    // 执行原有方法
    oldInitGridEventFun_sort.apply(this, arguments);
    sortFunObj.sort_initGridEventFun.apply(this, arguments);
};

/*
 * sumRow
 */
import {
    sumRowFunObj
} from './re_gridCompSumRow';
Object.assign(gridCompProto, sumRowFunObj);

/*
 * swap
 */
var oldInitEventFun_swap = gridCompProto.initEventFun;
var oldInitGridEventFun_swap = gridCompProto.initGridEventFun;
import {
    swapFunObj
} from './re_gridCompSwap';
Object.assign(gridCompProto, swapFunObj);

gridCompProto.initEventFun = function() {
    // 执行原有方法
    oldInitEventFun_swap.apply(this, arguments);
    swapFunObj.swap_initEventFun.apply(this, arguments);
};
gridCompProto.initGridEventFun = function() {
    // 执行原有方法
    oldInitGridEventFun_swap.apply(this, arguments);
    swapFunObj.swap_initGridEventFun.apply(this, arguments);
};

/*
 * rowDrag
 */


// var oldInitEventFun_rowDrag= gridCompProto.initEventFun;
var oldInitGridEventFun_rowDrag = gridCompProto.initGridEventFun;
import {
    rowDragFunObj
} from './re_gridCompRowDrag';
Object.assign(gridCompProto, treeFunObj);

gridCompProto.initGridEventFun = function() {
    // 执行原有方法
    oldInitGridEventFun_rowDrag.apply(this, arguments);
    rowDragFunObj.rowDrag_initGridEventFun.apply(this, arguments);
};



/*
 * tree
 */
import {
    treeFunObj
} from './re_gridCompTree';

Object.assign(gridCompProto, treeFunObj);



export {
    gridComp
}
