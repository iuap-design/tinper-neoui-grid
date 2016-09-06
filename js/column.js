import {
    init,
    initTree,
    getBooleanOptions
} from './columnInit';

class column{
    constructor(options, gridComp){

        this.init(options, gridComp);

    }
};

 var gridCompColumnProto = column.prototype;

 gridCompColumnProto.init = init;
 gridCompColumnProto.initTree = initTree;
 gridCompColumnProto.getBooleanOptions = getBooleanOptions;

 /*
  * tree
  */
 import{re_initTree} from './re_gridCompTree';

 gridCompColumnProto.initTree = re_initTree;

export{column}
