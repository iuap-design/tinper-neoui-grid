## Grid 生命周期API

### onBeforeRowSelected

类型       | 说明
-------- | ---------------------------------------------------------------------------------------------------
function | 在数据行被选中之前触发，可在function中决定是否选中数据行，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onRowSelected

类型       | 说明
-------- | --------------------------------------
function | 在数据行被选中后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onBeforeRowUnSelected

类型       | 说明
-------- | ------------------------------------------------------------------------------------------------------
function | 在数据行取消选中之前触发，可在function中决定是否取消数据行选中，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onRowUnSelected

类型       | 说明
-------- | ---------------------------------------
function | 在数据行取消选中后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onBeforeAllRowSelected

类型       | 说明
-------- | -------------------------------------------------------------------------------------------------------------
function | 在点击表头复选框选中所有数据行之前触发，可在function中决定是否选中所有数据行，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

### onAllRowSelected

类型       | 说明
-------- | -----------------------------------------------
function | 在点击表头复选框选中所有数据行之后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

### onBeforeAllRowUnSelected

类型       | 说明
-------- | -----------------------------------------------------------------------------------------------------------------
function | 在点击表头复选框取消选中所有数据行之前触发，可在function中决定是否取消选中所有数据行，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

### onAllRowUnSelected

类型       | 说明
-------- | -----------------------------------------------
function | 在点击表头复选框选中所有数据行之后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

### onBeforeRowFocus

类型       | 说明
-------- | -----------------------------------------------------------------------------------------------------------
function | 在数据行触发focus之前触发，可在function中决定是否继续focus操作，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

### onRowFocus

类型       | 说明
-------- | -------------------------------------------
function | 在数据行触发focus之后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onBeforeRowUnFocus

类型       | 说明
-------- | -----------------------------------------------------------------------------------------------------------
function | 在数据行取消focus之前触发，可在function中决定是否取消focus操作，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onRowUnFocus

类型       | 说明
-------- | -------------------------------------------
function | 在数据行取消focus之后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onDblClickFun

类型       | 说明
-------- | --------------------------------------
function | 在数据行被双击时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onBeforeValueChange

类型       | 说明
-------- | -----------------------------------------------------------------------------------------------------
function | 在对数据进行修改之前触发，可在function中决定是否进行数据修改，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

### onValueChange

类型       | 说明
-------- | ----------------------------------------
function | 在对数据进行修改之后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | ------------
gridObj  | 表格控件对象
rowIndex | 数据行对应的index
field    | 数据改变对应的field
oldValue | 数据改变之前的值
newValue | 数据改变之后的值

### onBeforeClickFun

类型       | 说明
-------- | ---------------------------------------------------------------------------------------------------------------
function | 在数据行触发click之前触发，可在function中决定是否继续数据行的click操作，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### onBeforeEditFun

类型       | 说明
-------- | -------------------------------------------------------------------------------------------------------
function | 在数据行编辑操作之前触发，可在function中决定是否取消进行编辑操作，return true则继续当前操作，return false则取消当前操作，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index
colIndex | 数据列对应的index

### onRowHover

类型       | 说明
-------- | -----------------------------------------
function | 在数据行hover之后触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

### afterCreate

类型       | 说明
-------- | ---------------------------
function | 表格创建完成或者重新添加数据之后触发，调用时无传入参数
