import {
    init,
    sortRows,
    basicSortRows,
    treeSortRows,
    getSumValue
} from './dataSourceInit';

class dataSource{
    constructor(options, gridComp){

		this.init = init;
		this.sortRows = sortRows;
		this.basicSortRows = basicSortRows;
		this.treeSortRows = treeSortRows;
		this.getSumValue = getSumValue;

        this.init(options, gridComp);
    	this.sortRows();

    }
};

export{dataSource}
