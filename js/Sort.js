;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype,
		initEventFunFun = gridCompProto.initEventFun,
		initGridEventFunFun = gridCompProto.initGridEventFun,
		dataSource = $.fn.grid.dataSource,
		dataSourceProto = dataSource.prototype;

	gridCompProto.initEventFun = function(){
		// 执行原有方法
		initEventFunFun.apply(this,arguments);
		// 扩展方法
		var oThis = this;
		$('#' + this.options.id).on('mouseup', function(e) {
			if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
				// 点击的是header区域
				oThis.mouseUpX = e.clientX;
				oThis.mouseUpY = e.clientY;
				//点击过程中鼠标没有移动
				if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
				//或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
	//					if( Math.abs(parseInt(oThis.mouseDownX) - parseInt(oThis.mouseUpX)) <=5 && Math.abs(parseInt(oThis.mouseDownY) - parseInt(oThis.mouseUpY)) <=5){
					oThis.columnClickX = e.clientX;
					oThis.columnClickY = e.clientY;
					var eleTh = $(e.target).closest('th')[0];
					if($(e.target).hasClass('u-grid-header-columnmenu')){
						
					}else{
						// 执行click操作,进行排序
						oThis.canSortable(e, eleTh);
					}
				}
			} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
				// 点击的是数据区域

			}
		
		});
	};

	gridCompProto.initGridEventFun = function(){
		// 执行原有方法
		initGridEventFunFun.apply(this,arguments);
		// 扩展方法
		var oThis = this;
	};

	/*
	 * 处理排序
	 */
	gridCompProto.canSortable = function(e, ele) {
		var oThis = this,
			$ele = $(ele),
			field = $ele.attr('field'),
			sortable = this.getColumnAttr('sortable', field);
		if (sortable) {
			if(e.ctrlKey) {
				// 构建排序信息的数据结构
				var prioArray = []
				$('.u-grid-header-sort-priority').each(function(index, domEle){
					var $el = $(domEle)
					var p = parseInt($el.text())
					var f = $el.closest('th').attr('field')
					var st
					if($el.parent().hasClass("uf-caretarrowup")) {
						st = 'asc'
					} else if($el.parent().hasClass("uf-caretdown")){
						st = 'desc'
					}
					prioArray[p-1] = {field:f, sortType:st}
				})
				// 页面调整
				/*修改ue将caret调整为caret*/
				var $caret
				if(($caret = $ele.find('.uf-caretarrowup')).length > 0) {
					var p = parseInt($caret.find('.u-grid-header-sort-priority').text())
					prioArray[p-1].sortType = 'desc'
					$caret.removeClass('uf-caretarrowup').addClass('uf-caretdown')
				} else if(($caret = $ele.find('.uf-caretdown')).length > 0) {
					var p = parseInt($caret.find('.u-grid-header-sort-priority').text())
					for(var i=p;i<prioArray.length;i++) {
						var $flag = $('[field='+prioArray[i].field+']').find('.u-grid-header-sort-priority')
						$flag.text(parseInt($flag.text())-1)
					}
					prioArray.splice(p-1,1)
					$caret.remove()
				} else {
					prioArray.push({field:field, sortType:'asc'})
					// $ele.first().append('<span class="uf uf-caretarrowup u-grid-header-sort-span" ><span class="u-grid-header-sort-priority">'+prioArray.length+'</span></span>')
					$ele.first().first().append('<span class="uf uf-caretarrowup u-grid-header-sort-span" ></span>')
				}
				// 执行排序逻辑
				this.dataSourceObj.sortRowsByPrio(prioArray)

			} else {
				if ($(".uf-caretarrowup").parent().parent().parent()[0] == ele) { //原来为升序，本次为降序
					$(".uf-caretarrowup").remove();
					//$(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-caretdown u-grid-header-sort-span" ><span class="u-grid-header-sort-priority">1</span></span>');
					$(ele.firstChild.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-caretdown u-grid-header-sort-span" ></span>');
					if(typeof this.options.onSortFun == 'function'){
						this.options.onSortFun(field,'asc')
					}else{
						this.dataSourceObj.sortRows(field, "asc");
					}
				} else if ($(".uf-caretdown").parent().parent().parent()[0] == ele) { //原来为降序，本次为不排序
					$(".uf-caretdown").remove();
					if(typeof this.options.onSortFun == 'function'){
						this.options.onSortFun();
					}else{
						this.dataSourceObj.sortRows();
					}

				} else { //本次为升序 
					$(".uf-caretarrowup").remove();
					$(".uf-caretdown").remove();
					// $(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-caretarrowup u-grid-header-sort-span"><span class="u-grid-header-sort-priority">1</span></span>');
					$(ele.firstChild.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="uf uf-caretarrowup u-grid-header-sort-span"></span>');
					if(typeof this.options.onSortFun == 'function'){
						this.options.onSortFun(field, "desc");
					}else{
						this.dataSourceObj.sortRows(field, "desc");
					}

				}
			}

			oThis.repairContent();
			oThis.afterGridDivsCreate();
		}
	};

	gridCompProto.deleteOneRowTree = function(){
		if(this.options.showTree){
			this.dataSourceObj.sortRows();
		}
	};

	/*
	 * 根据排序的优先级的排序
	 * prioArray = [{field:'f2', sortType:'asc'}, {field:'f3', sortType:'desc'}, {field:'f1', sortType:'asc'}]
	 */
	gridCompProto.sortRowsByPrio = function(prioArray, cancelSort) {
		var oThis = this;
		if(cancelSort) {
			this.rows = new Array();
			if(this.options.values){
				$.each(this.options.values, function(i) {
					var rowObj = {};
					rowObj.value = this;
					rowObj.valueIndex = i;
					oThis.rows.push(rowObj);
				});
			}
		}

		var evalStr = function(i) {
			if(i == prioArray.length-1) {
				return 'by(prioArray['+i+'].field, prioArray['+i+'].sortType)'
			} else {
				return 'by(prioArray['+i+'].field, prioArray['+i+'].sortType,' + evalStr(i+1) + ')'
			}

		}

		var by = function(field, sortType, eqCall) {
			var callee = arguments.callee
			return function(a, b) {
				var v1 = $(a.value).attr(field);
				var v2 = $(b.value).attr(field);
				var dataType = oThis.gridComp.getColumnByField(field).options.dataType;
				if(dataType == 'Float'){
					v1 = parseFloat(v1);
					v2 = parseFloat(v2);
					if(isNaN(v1)){
						return 1;
					}
					if(isNaN(v2)){
						return -1;
					}
					if(v1 == v2 && eqCall) {
						return eqCall()
					}
					return sortType == 'asc' ? (v1-v2) : (v2-v1);
				}else if (dataType == 'Int'){
					v1 = parseInt(v1);
					v2 = parseInt(v2);
					if(isNaN(v1)){
						return 1;
					}
					if(isNaN(v2)){
						return -1;
					}
					if(v1 == v2 && eqCall) {
						return eqCall()
					}
					return sortType == 'asc' ? (v1-v2) : (v2-v1);
				}else{
					v1 = oThis.gridComp.getString(v1,'');
					v2 = oThis.gridComp.getString(v2,'');
					try{
						var rsl = v1.localeCompare(v2)
						if(rsl === 0 && eqCall) {
							return eqCall()
						}
						if(rsl === 0) {
							return 0
						}
						return sortType == 'asc' ? rsl : -rsl;
					}catch(e){
						return 0;
					}
				}
			}
		}

		this.rows.sort(eval(evalStr(0)));
	};

	/*
	 * 将values转化为rows并进行排序(标准)
	 */
	dataSourceProto.basicSortRows = function(field, sortType) {
		var oThis = this;
		var dataType = "";
		if(field){
			dataType = this.gridComp.getColumnByField(field).options.dataType;
		}
		if (sortType == "asc") {
			this.rows.sort(function(a, b) {
				var v1 = $(b.value).attr(field);
				var v2 = $(a.value).attr(field);
				if(dataType == 'Float'){
					v1 = parseFloat(v1);
					v2 = parseFloat(v2);
					if(isNaN(v1)){
						return 1;
					}
					if(isNaN(v2)){
						return -1;
					}
					return v1-v2;
				}else if (dataType == 'Int'){
					v1 = parseInt(v1);
					v2 = parseInt(v2);
					if(isNaN(v1)){
						return 1;
					}
					if(isNaN(v2)){
						return -1;
					}
					return v1-v2;
				}else{
					v1 = oThis.gridComp.getString(v1,'');
					v2 = oThis.gridComp.getString(v2,'');
					try{
						return v1.localeCompare(v2);
					}catch(e){
						return 0;
					}
				}
			});
		} else if (sortType == "desc") {
			this.rows.sort(function(a, b) {
				var v1 = $(a.value).attr(field);
				var v2 = $(b.value).attr(field);
				if(dataType == 'Float'){
					v1 = parseFloat(v1);
					v2 = parseFloat(v2);
					if(isNaN(v1)){
						return 1;
					}
					if(isNaN(v2)){
						return -1;
					}
					return v1-v2;
				}else if (dataType == 'Int'){
					v1 = parseInt(v1);
					v2 = parseInt(v2);
					if(isNaN(v1)){
						return 1;
					}
					if(isNaN(v2)){
						return -1;
					}
					return v1-v2;
				}else{
					v1 = oThis.gridComp.getString(v1,'');
					v2 = oThis.gridComp.getString(v2,'');
					try{
						return v1.localeCompare(v2);
					}catch(e){
						return 0;
					}
				}
			});
		} else {
			this.rows = new Array();
			if(this.options.values){
				$.each(this.options.values, function(i) {
					var rowObj = {};
					rowObj.value = this;
					rowObj.valueIndex = i;
					oThis.rows.push(rowObj);
				});
			}
		}
	};
})(jQuery, window, document);
