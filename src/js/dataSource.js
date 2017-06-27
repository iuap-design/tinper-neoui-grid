import {
    initFunObj
} from './dataSourceInit';

class dataSource {
    constructor(options, gridComp) {

        this.init(options, gridComp);
        this.sortRows();

    }
};

var dataSourceProto = dataSource.prototype;
if(!Object.assign){
	Object.assign = u.extend;
}
Object.assign(dataSourceProto, initFunObj);


import {
    sortFunObj
} from './re_gridCompSort';
dataSourceProto.basicSortRows = sortFunObj.re_basicSortRows;


/*
 * tree
 */
import {
    treeFunObj
} from './re_gridCompTree';

dataSourceProto.treeSortRows = treeFunObj.re_treeSortRows;
dataSourceProto.pushChildRows = treeFunObj.pushChildRows;

export {
    dataSource
}
