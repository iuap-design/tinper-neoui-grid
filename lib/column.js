import { initFunObj } from './columnInit';

var column = function column(options, gridComp) {
    babelHelpers.classCallCheck(this, column);

    this.init(options, gridComp);
};

;
var gridCompColumnProto = column.prototype;
Object.assign(gridCompColumnProto, initFunObj);

/*
 * tree
 */
import { treeFunObj } from './re_gridCompTree';

gridCompColumnProto.initTree = treeFunObj.re_initTree;

export { column };