<a name="3.1.14"></a>
## [3.1.14](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.13...v3.1.14) (2016-11-29)


### Bug Fixes
* 点击也可拖拽bug ([47f7165](https://github.com/iuap-design/tinper-neoui-grid/commit/47f7165))




<a name="3.1.13"></a>
## [3.1.13](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.12...v3.1.13) (2016-11-24)


### Bug Fixes
* tab键考虑onBeforeEditFun处理 ([fbbf509](https://github.com/iuap-design/tinper-neoui-grid/commit/fbbf509))

* 云彩—-可编辑时显示图标 ([a95c9b3](https://github.com/iuap-design/tinper-neoui-grid/commit/a95c9b3))




<a name="3.1.12"></a>
## [3.1.12](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.9...v3.1.12) (2016-11-17)



<a name="3.1.8"></a>
## [3.1.8](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.7...v3.1.8) (2016-11-10)



<a name="3.1.7"></a>
## [3.1.7](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.1...v3.1.7) (2016-11-10)


### Bug Fixes
* pro-IUAPDESIGN-101:友云采：grid中横向滚动时需要隐藏编辑控件 ([928fdf1](https://github.com/iuap-design/tinper-neoui-grid/commit/928fdf1))

* pro-IUAPDESIGN-105:云彩：grid排序图标需要修改 ([4d923aa](https://github.com/iuap-design/tinper-neoui-grid/commit/4d923aa))

* pro-IUAPDESIGN-274:数字营销：grid中u-grid-content-div这个div多加了一个overflow-x:hidden属性，导致表格内部的tips被遮盖 ([7f8c036](https://github.com/iuap-design/tinper-neoui-grid/commit/7f8c036))

* pro-IUAPDESIGN-41:云表单：grid提供在移动端的样式修改方案 ([8b08272](https://github.com/iuap-design/tinper-neoui-grid/commit/8b08272))

* pro-IUAPDESIGN-46:友云采：gird不出现左右滚动条（方案：px改为百分比） ([6c83f92](https://github.com/iuap-design/tinper-neoui-grid/commit/6c83f92))

* pro-IUAPDESIGN-50:友云采：grid表格数据不显示省略号（增加各行显示） ([b6a46ac](https://github.com/iuap-design/tinper-neoui-grid/commit/b6a46ac))

* pro-IUAPDESIGN-64:数字营销：grid增加参数控制点击content不触发Row选中 ([0a84f55](https://github.com/iuap-design/tinper-neoui-grid/commit/0a84f55))

* pro-IUAPDESIGN-89:友云采：grid没有数据的话下面的边线没有显示 ([bfa688f](https://github.com/iuap-design/tinper-neoui-grid/commit/bfa688f))

* pro-IUAPDESIGN-92:友云采：关联计算的数据在合计行的显示 ([f67aad8](https://github.com/iuap-design/tinper-neoui-grid/commit/f67aad8))

* pro-IUAPDESIGN-95:友云采：内容区点击之后第一次选中，第二次取消选中 ([b42059a](https://github.com/iuap-design/tinper-neoui-grid/commit/b42059a))

* pro-IUAPDESIGN-96:友云采：grid中取消选中之后的全选显示不对 ([eafb2dc](https://github.com/iuap-design/tinper-neoui-grid/commit/eafb2dc))

* pro-IUAPDESIGN-98:友云采：grid中title显示为id，renderType存在时取消td的title。 ([fe1160a](https://github.com/iuap-design/tinper-neoui-grid/commit/fe1160a))

* grid设置宽度为百分比情况下，优化拖拽、交换列等操作 ([1fe2a0b](https://github.com/iuap-design/tinper-neoui-grid/commit/1fe2a0b))

* 优化onRowDelete传入参数 ([f33f189](https://github.com/iuap-design/tinper-neoui-grid/commit/f33f189))

* 优化tab操作，如果下一列不可以编辑则跳过 ([4a4ed18](https://github.com/iuap-design/tinper-neoui-grid/commit/4a4ed18))

* 优化多行显示情况下的编辑组件显示 ([2e6888d](https://github.com/iuap-design/tinper-neoui-grid/commit/2e6888d))

* 修改先在datatable中选中grid中显示状态不对的问题 ([f2d1769](https://github.com/iuap-design/tinper-neoui-grid/commit/f2d1769))

* 关闭时增加判断editComp的comp是否存在hide方法，如果存在执行hide ([7461d52](https://github.com/iuap-design/tinper-neoui-grid/commit/7461d52))

* 只有editType为from的情况下才会滚动时关闭编辑 ([3da1661](https://github.com/iuap-design/tinper-neoui-grid/commit/3da1661))

* 增加判断优化页签中的grid在切换的过程中会重绘问题 ([c6b9eb4](https://github.com/iuap-design/tinper-neoui-grid/commit/c6b9eb4))

* 增加参数noScroll控制grid不显示滚动条 ([a20304f](https://github.com/iuap-design/tinper-neoui-grid/commit/a20304f))

* 数据为空时选中header的复选框 ([b03a69f](https://github.com/iuap-design/tinper-neoui-grid/commit/b03a69f))

* 编辑关闭的时候调用editComp的hide方法 ([c521972](https://github.com/iuap-design/tinper-neoui-grid/commit/c521972))

* 解决grid中tab不可用的问题 ([dbe89df](https://github.com/iuap-design/tinper-neoui-grid/commit/dbe89df))

* 解决可编辑情况下tree的叶子节点首列编辑后会显示icon ([33e2ada](https://github.com/iuap-design/tinper-neoui-grid/commit/33e2ada))



### Features

* 判断grid Header选中 ([d02b9d1](https://github.com/iuap-design/tinper-neoui-grid/commit/d02b9d1))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/iuap-design/tinper-neoui-grid/compare/3.0.6...v3.1.1) (2016-10-17)


### Bug Fixes
* fix test ([4d7ecc7](https://github.com/iuap-design/tinper-neoui-grid/commit/4d7ecc7))

* gird默认id绑定随机值避免冲突 ([e478905](https://github.com/iuap-design/tinper-neoui-grid/commit/e478905))

* 数表删除上的时候会导致数据丢失 ([48281f1](https://github.com/iuap-design/tinper-neoui-grid/commit/48281f1))



### Features

* feat test ([9699a16](https://github.com/iuap-design/tinper-neoui-grid/commit/9699a16))



<a name="3.0.6"></a>
## [3.0.6](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.0.6...3.0.6) (2016-07-04)



<a name="3.0.6"></a>
## 3.0.6 (2016-06-24)



