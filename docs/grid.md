# 表格控件

表格控件将数据以表格的方式进行展示，同时提供了排序、交换列、数字列、复选、合计、自定义渲染、修改等复杂功能，满足了复杂场景下数据展示的需求。

# 如何使用

暂无

# 示例



<!--### 示例1

示例1说明

### 示例2

示例2说-->

# API

## 属性

暂无
<!--### 属性1

属性1说明

### 属性2

属性2说明-->

## 方法

暂无
<!--### 方法1

方法1说明

### 方法2

方法2说明-->


# datatable关联使用

## 如何使用

	<div id="gridTest" u-meta='{"id":"grid1","type":"grid","data":"dataTable1","multiSelect":true,"editType":"form","showNumCol":true,"editable":true,"onRowSelected":"onRowSelected1"}'>
    	<div options='{"field":"name","dataType":"String","title":"姓名","editOptions":{"id":"stringname","type":"string","maxLength":6},"editType":"string"}'></div>
    	<div options='{"field":"time","dataType":"time","title":"时间","editType":"time" ,"renderType":"timeRender"}'></div>
	</div>

## 示例

### base
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
&lt;/div></code></pre>
<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>

### columnMenu
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":true,"canDrag":false,"sortable":false,"canSwap":false}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
&lt;/div></code></pre>

<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>
### drag
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":true,"sortable":false,"canSwap":false}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
&lt;/div></code></pre>

<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>
### edit
<pre><code>
&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false,"editable":true,"editType":"default"}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名","editType":"string"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期","editType":"eidtTypeFun"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离","editType":"float"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额","editType":"float"}'>&lt;/div>
	&lt;div options='{"field":"comboField","dataType":"String","title":"下拉","editType":"combo","editOptions":{"id":"combobox1","type":"combo","datasource":"comItems"},"renderType":"comboRender"}'>&lt;/div>
&lt;/div></code></pre>
<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
    comItems: [{
      "value": "001",
      "name": "1122"
    }, {
      "value": "002",
      "name": "3344"
    }, {
      "value": "003",
      "name": "4455"
    }, {
      "value": "004",
      "name": "5566"
    }, { 
      "value": "005",
      "name": "6677"
    }, {
      "value": "006",
      "name": "7788"
    }, {
      "value": "007",
      "name": "8899"
    }],
    eidtTypeFun:function(obj){
      var gridObj = obj.gridObj;
      var viewModel = gridObj.viewModel;
      var field = obj.field;
      var ele = obj.element;
      var dataTableId = gridObj.dataTable.id;
      var innerStr = '&lt;div class=\'u-datepicker\' style="width:100%;padding:0px;" u-meta=\'{"id":"' + field + '","type":"u-datetime","data":"' + dataTableId + '","field":"' + field + '"}\'>&lt;input class="u-input" type="text">&lt;/div>';
      var innerDom = u.makeDOM(innerStr);
      ele.innerHTML = '';
      ele.appendChild(innerDom);
      var comp = app.createComp(innerDom,viewModel);
      comp.comp.on('select',function(){
        // gridObj.nextEditShow();
      });
      comp.modelValueChange(obj.value);
    },
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>

### fixed

<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名","fixed":true}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
	&lt;div options='{"field":"column11","dataType":"String","title":"列1"}'>&lt;/div>
	&lt;div options='{"field":"column22","dataType":"String","title":"列2"}'>&lt;/div>
	&lt;div options='{"field":"column33","dataType":"String","title":"列3"}'>&lt;/div>
	&lt;div options='{"field":"column44","dataType":"String","title":"列4"}'>&lt;/div>
&lt;/div></code></pre>
<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row111",
          "column22":"row122",
          "column33":"row133",
          "column44":"row144"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row211",
          "column22":"row222",
          "column33":"row233",
          "column44":"row244"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row311",
          "column22":"row322",
          "column33":"row333",
          "column44":"row344"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row411",
          "column22":"row422",
          "column33":"row433",
          "column44":"row444"
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>
### editForm
<pre><code>
&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false,"editable":true,"editType":"form"}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名","editType":"string"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期","editType":"eidtTypeFun"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离","editType":"float"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额","editType":"float"}'>&lt;/div>
&lt;/div></code></pre>
<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
    eidtTypeFun:function(obj){
      var gridObj = obj.gridObj;
      var viewModel = gridObj.viewModel;
      var field = obj.field;
      var ele = obj.element;
      var dataTableId = gridObj.dataTable.id;
      var innerStr = '&lt;div class=\'u-datepicker\' style="width:100%;padding:0px;" u-meta=\'{"id":"' + field + '","type":"u-date","data":"' + dataTableId + '","field":"' + field + '"}\'>&lt;input class="u-input" type="text">&lt;/div>';
      var innerDom = u.makeDOM(innerStr);
      ele.innerHTML = '';
      ele.appendChild(innerDom);
      var comp = app.createComp(innerDom,viewModel);
      comp.comp.on('select',function(){
        // gridObj.nextEditShow();
      });
      comp.modelValueChange(obj.value);
    },
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>

### overWidthHidden

<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row111",
          "column22":"row122",
          "column33":"row133",
          "column44":"row144"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row211",
          "column22":"row222",
          "column33":"row233",
          "column44":"row244"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row311",
          "column22":"row322",
          "column33":"row333",
          "column44":"row344"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "column11":"row411",
          "column22":"row422",
          "column33":"row433",
          "column44":"row444"
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false,"overWidthHiddenColumn":true}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名","hiddenLevel":8}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期","hiddenLevel":7}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离","hiddenLevel":6}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额","hiddenLevel":5}'>&lt;/div>
	&lt;div options='{"field":"column11","dataType":"String","title":"列1","hiddenLevel":4}'>&lt;/div>
	&lt;div options='{"field":"column22","dataType":"String","title":"列2","hiddenLevel":3}'>&lt;/div>
	&lt;div options='{"field":"column33","dataType":"String","title":"列3","hiddenLevel":2}'>&lt;/div>
	&lt;div options='{"field":"column44","dataType":"String","title":"列4","hiddenLevel":1}'>&lt;/div>
&lt;/div></code></pre>
### sort
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":true,"canSwap":false}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
&lt;/div></code></pre>

<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>
### headerLevel
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false,"maxHeaderLevel":2}'>
	&lt;div options='{"field":"nameTime","title":"姓名+日期","headerLevel":2}'>&lt;/div>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名","parentHeader":"nameTime"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期","parentHeader":"nameTime"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
&lt;/div></code></pre>
<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>

### sumRow
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":true,"showSumRow":true}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额","sumCol":true}'>&lt;/div>
&lt;/div></code></pre>
<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>

### swap
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":true}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
&lt;/div></code></pre>

<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": ""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          }
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>
### tree
<pre><code>&lt;div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false,"showTree":true,"keyField":"id","parentKeyField":"pid"}'>
	&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
	&lt;div options='{"field":"time","dataType":"time","title":"日期"}'>&lt;/div>
	&lt;div options='{"field":"distance","dataType":"String","title":"距离"}'>&lt;/div>
	&lt;div options='{"field":"currency","dataType":"String","title":"金额"}'>&lt;/div>
&lt;/div></code></pre>
<pre><code>viewModel = {
    dataTable: new u.DataTable({
      meta: {
        "name": "",
        "time": "",
        "distance": "",
        "currency": "",
        "id":"",
        "pid":""
      }
    }, this),
  }; 
  var app = new u.createApp();
  //console.log(viewModel)
  app.init(viewModel);
  var data = {
    "pageIndex": 1,
    "pageSize": 10,
    "rows": [
      {
        "status": "nrm",
        "data": {
          "name": "赵四",
          "time": "2016-05-16",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
          "pid": "",
          "id": "04"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "王一",
          "time": "2016-05-12",
          "distance": "25",
          "currency": {
            "value": "200.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
        "pid": "04",
        "id": "01"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "李三",
          "time": "2016-11-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
        "pid": "",
        "id": "02"
        }
      }, {
        "status": "nrm",
        "data": {
          "name": "彰武",
          "time": "2012-05-16",
          "distance": "50",
          "currency": {
            "value": "300.00",
            "meta": {
              "precision": "2",
              "max": "3000",
              "min": "0",
              "curSymbol": "$"
            }
          },
        "pid": "01",
        "id": "03"
        }
      }
    ]
  }
  viewModel.dataTable.removeAllRows();
  viewModel.dataTable.setData(data);
  </code></pre>



<!--### 示例1

示例1说明

### 示例2

示例2说-->