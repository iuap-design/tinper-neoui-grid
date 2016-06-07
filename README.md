# 表格控件

基于iUAP Design的表格控件，应对复杂场景下的数据展示。


## 1、介绍

表格控件将数据以表格的方式进行展示，同时提供了排序、交换列、数字列、复选、合计、自定义渲染、修改等复杂功能，满足了复杂场景下数据展示的需求。

## 2、快速上手
[控件使用说明](https://github.com/iuap-design/grid/blob/master/docs/grid.md)

## 3、开发说明

### 目录说明

css：控件所需的css文件

dist：在跟目录下调用gulp dist之后的项目产出

docs：项目文档说明

examples：项目示例文件。子目录ui存放单独使用控件示例。子目录datatable存放关联datatable控件示例。

js：控件所需的js文件

snippets：控件示例及文档说明的片段，根据此目录通过node app.js来产出项目示例。子目录examples中存放示例片段，ui存放单独使用控件示例片段，datatable存放关联datatable控件示例片段。子目录docs中存放文档说明片段，文档说明片段中$ui$将替换为示例片段中ui目录下示例，$datatable$将替换为示例片段中datatable目录下示例。

### 文件说明
app.js：依据snippets中的片段生成docs以及examples中的最终产出

gulpfile.js：通过gulp对项目源文件进行压缩生成dist中的最终产出

package.json：项目node说明文件

README.md：项目整体说明文件

### 控件开发过程说明

针对控件进行开发，修改css以及js文件之后通过调用gulp dist来生成项目产出

### 示例及文档开发过程说明

针对示例及文档进行开发，修改snippets文件之后通过node app.js来生成示例及文档产出