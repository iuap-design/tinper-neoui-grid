import {
    init,
    sortRows,
    basicSortRows,
    treeSortRows,
    getSumValue
} from './dataSourceInit';

class dataSource{
    constructor(options, gridComp){

        this.init(options, gridComp);
    	this.sortRows();

    }
};

var dataSourceProto = dataSource.prototype;

dataSourceProto.init = init;
dataSourceProto.sortRows = sortRows;
dataSourceProto.basicSortRows = basicSortRows;
dataSourceProto.treeSortRows = treeSortRows;
dataSourceProto.getSumValue = getSumValue;


import{re_basicSortRows} from './re_gridCompSort';
dataSourceProto.basicSortRows = re_basicSortRows;


/*
 * tree
 */
import{
    re_treeSortRows,
    pushChildRows
} from './re_gridCompTree';

dataSourceProto.treeSortRows = re_treeSortRows;
dataSourceProto.pushChildRows = pushChildRows;

export{dataSource}
