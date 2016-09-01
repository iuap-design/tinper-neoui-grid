import {
    init,
    initTree,
    getBooleanOptions
} from './columnInit';

class column{
    constructor(options, gridComp){

		this.init = init;
		this.initTree = initTree;
		this.getBooleanOptions = getBooleanOptions;


        this.init(options, gridComp);

    }
};

export{column}
