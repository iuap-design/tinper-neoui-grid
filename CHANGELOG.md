<a name="3.2.3"></a>
## [3.2.3](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.2.2...v3.2.3) (2017-06-23)


### Bug Fixes

* 修改获取rowIndex的bug ([50b5096](https://github.com/iuap-design/tinper-neoui-grid/commit/50b5096))


### Features

* grid树表情况下支持异步加载 ([f0cadf4](https://github.com/iuap-design/tinper-neoui-grid/commit/f0cadf4))
* 优化columnMenuType为border情况下的操作区展示 ([28d7a43](https://github.com/iuap-design/tinper-neoui-grid/commit/28d7a43))
* 增加参数支持整体宽度大于所有显示列宽度时非最后一列也可以自动扩展宽度 ([175e98d](https://github.com/iuap-design/tinper-neoui-grid/commit/175e98d))



<a name="3.2.2"></a>
## [3.2.2](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.2.1...v3.2.2) (2017-05-23)


### Bug Fixes

* 解决内容区鼠标滑动未触发docus状态的问题 ([f6cb5f3](https://github.com/iuap-design/tinper-neoui-grid/commit/f6cb5f3))
* 解决官网webIDE中拖拽demo拖动后宽度错位的问题 ([53caead](https://github.com/iuap-design/tinper-neoui-grid/commit/53caead))
* 解决设置overWidthHiddenColumn为true之后当显示的数据列宽度不足时会将开发定义的隐藏列显示出来的问题 ([6917267](https://github.com/iuap-design/tinper-neoui-grid/commit/6917267))


### Features

* columnMenu样式支持通过参数columnMenuType来控制 ([3cbeb21](https://github.com/iuap-design/tinper-neoui-grid/commit/3cbeb21))
* 优化columnMenu的样式 ([3e3a5f7](https://github.com/iuap-design/tinper-neoui-grid/commit/3e3a5f7))
* 增加参数sumRowFirst、sumRowFixed，支持合计行显示在第一行，并且可脱离内容区，不随纵向滚动条滚动 ([0d97363](https://github.com/iuap-design/tinper-neoui-grid/commit/0d97363))
* 表格支持分组功能 ([77ac86b](https://github.com/iuap-design/tinper-neoui-grid/commit/77ac86b))



<a name="3.2.1"></a>
## [3.2.1](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.2.0...v3.2.1) (2017-04-21)


### Bug Fixes

* 仓库重命名 ([ea2daa3](https://github.com/iuap-design/tinper-neoui-grid/commit/ea2daa3))
* 解决grid中输入时无法通过鼠标滑动选择 ([54d7aa8](https://github.com/iuap-design/tinper-neoui-grid/commit/54d7aa8))
* 解决grid超过10列之后交换最后一列导致显示错误的问题 ([01592de](https://github.com/iuap-design/tinper-neoui-grid/commit/01592de))
* 解决表格全选操作之后翻页需要点击2次才能执行全选操作 ([2eae2b9](https://github.com/iuap-design/tinper-neoui-grid/commit/2eae2b9))


### Features

* grid增加filterDataFun用于在新增数据之前进行过滤 ([3799a5a](https://github.com/iuap-design/tinper-neoui-grid/commit/3799a5a))
* grid增加参数支持控制左右对齐 ([cb7c48c](https://github.com/iuap-design/tinper-neoui-grid/commit/cb7c48c))
* grid支持多级表头 ([e3dc21b](https://github.com/iuap-design/tinper-neoui-grid/commit/e3dc21b))
* grid组件支持动态设置固定列 ([30ef645](https://github.com/iuap-design/tinper-neoui-grid/commit/30ef645))
* 优化grid组件添加function的方式 ([230af94](https://github.com/iuap-design/tinper-neoui-grid/commit/230af94))
* 优化grid编辑时只重绘当前编辑单元格，不再重绘整行数据 ([a0e6d84](https://github.com/iuap-design/tinper-neoui-grid/commit/a0e6d84))
* 合计行支持在第一行显示，同时优化多级表头样式 ([48efee1](https://github.com/iuap-design/tinper-neoui-grid/commit/48efee1))
* 增加参数rowHeight、sumRowHeight、headerHeight用于控制行高 ([b9406b8](https://github.com/iuap-design/tinper-neoui-grid/commit/b9406b8))
* 树表情况下增加不同的class以区分不同层级的节点 ([a5f1da2](https://github.com/iuap-design/tinper-neoui-grid/commit/a5f1da2))



<a name="3.1.28"></a>
## [3.1.28](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.27...v3.1.28) (2017-02-22)



<a name="3.1.27"></a>
## [3.1.27](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.26...v3.1.27) (2017-02-22)


### Features

* grid增加参数fixedFloat可设置固定列在左侧还是右侧 ([9c31d26](https://github.com/iuap-design/tinper-neoui-grid/commit/9c31d26))



<a name="3.1.26"></a>
## [3.1.26](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.25...v3.1.26) (2017-02-20)


### Bug Fixes

* 云采--隐藏之后重新显示会导致数据列宽度显示错误 ([47bc9bb](https://github.com/iuap-design/tinper-neoui-grid/commit/47bc9bb))



<a name="3.1.25"></a>
## [3.1.25](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.22...v3.1.25) (2017-02-10)


### Bug Fixes

* grid close事件 ([cc979bc](https://github.com/iuap-design/tinper-neoui-grid/commit/cc979bc))



<a name="3.1.22"></a>
## [3.1.22](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.21...v3.1.22) (2017-01-06)



<a name="3.1.21"></a>
## [3.1.21](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.19...v3.1.21) (2017-01-06)


### Bug Fixes

* addrows在单页面中多次触发 ([144ab18](https://github.com/iuap-design/tinper-neoui-grid/commit/144ab18))
* 优化columnMenu区域文字的点击处理逻辑 ([06bbe55](https://github.com/iuap-design/tinper-neoui-grid/commit/06bbe55))



<a name="3.1.19"></a>
## [3.1.19](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.18...v3.1.19) (2016-12-28)


### Bug Fixes

* 优化部分性能 ([d6feb24](https://github.com/iuap-design/tinper-neoui-grid/commit/d6feb24))



<a name="3.1.18"></a>
## [3.1.18](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.17...v3.1.18) (2016-12-20)



<a name="3.1.17"></a>
## [3.1.17](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.16...v3.1.17) (2016-12-14)



<a name="3.1.16"></a>
## [3.1.16](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.15...v3.1.16) (2016-12-08)


### Bug Fixes

* 优化grid编辑下连续点击出错的问题 ([d8b35b6](https://github.com/iuap-design/tinper-neoui-grid/commit/d8b35b6))
* 优化不显示滚动条情况下动态改变宽度导致最后一列显示宽度超长的问题 ([3c3a452](https://github.com/iuap-design/tinper-neoui-grid/commit/3c3a452))
* 兼容子表的情况，避免json转字符串的情况出现死循环 ([361d04c](https://github.com/iuap-design/tinper-neoui-grid/commit/361d04c))



<a name="3.1.15"></a>
## [3.1.15](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.14...v3.1.15) (2016-12-01)


### Bug Fixes

* form形式下编辑样式问题以及合计情况下左侧边线显示问题 ([7f3339c](https://github.com/iuap-design/tinper-neoui-grid/commit/7f3339c))
* grid增加onBeforeValueChange处理 ([be4fee3](https://github.com/iuap-design/tinper-neoui-grid/commit/be4fee3))



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
## [3.1.7](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.4...v3.1.7) (2016-11-10)


### Bug Fixes

* grid设置宽度为百分比情况下，优化拖拽、交换列等操作 ([1fe2a0b](https://github.com/iuap-design/tinper-neoui-grid/commit/1fe2a0b))
* pro-IUAPDESIGN-105:云彩：grid排序图标需要修改 ([4d923aa](https://github.com/iuap-design/tinper-neoui-grid/commit/4d923aa))
* pro-IUAPDESIGN-274:数字营销：grid中u-grid-content-div这个div多加了一个overflow-x:hidden属性，导致表格内部的tips被遮盖 ([7f8c036](https://github.com/iuap-design/tinper-neoui-grid/commit/7f8c036))
* 优化onRowDelete传入参数 ([f33f189](https://github.com/iuap-design/tinper-neoui-grid/commit/f33f189))
* 优化tab操作，如果下一列不可以编辑则跳过 ([4a4ed18](https://github.com/iuap-design/tinper-neoui-grid/commit/4a4ed18))
* 优化多行显示情况下的编辑组件显示 ([2e6888d](https://github.com/iuap-design/tinper-neoui-grid/commit/2e6888d))
* 修改先在datatable中选中grid中显示状态不对的问题 ([f2d1769](https://github.com/iuap-design/tinper-neoui-grid/commit/f2d1769))
* 关闭时增加判断editComp的comp是否存在hide方法，如果存在执行hide ([7461d52](https://github.com/iuap-design/tinper-neoui-grid/commit/7461d52))
* 只有editType为from的情况下才会滚动时关闭编辑 ([3da1661](https://github.com/iuap-design/tinper-neoui-grid/commit/3da1661))
* 增加判断优化页签中的grid在切换的过程中会重绘问题 ([c6b9eb4](https://github.com/iuap-design/tinper-neoui-grid/commit/c6b9eb4))
* 数据为空时选中header的复选框 ([b03a69f](https://github.com/iuap-design/tinper-neoui-grid/commit/b03a69f))
* 编辑关闭的时候调用editComp的hide方法 ([c521972](https://github.com/iuap-design/tinper-neoui-grid/commit/c521972))
* 解决grid中tab不可用的问题 ([dbe89df](https://github.com/iuap-design/tinper-neoui-grid/commit/dbe89df))
* 解决可编辑情况下tree的叶子节点首列编辑后会显示icon ([33e2ada](https://github.com/iuap-design/tinper-neoui-grid/commit/33e2ada))


### Features

* 判断grid Header选中 ([d02b9d1](https://github.com/iuap-design/tinper-neoui-grid/commit/d02b9d1))



<a name="3.1.4"></a>
## [3.1.4](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.3...v3.1.4) (2016-10-26)


### Bug Fixes

* pro-IUAPDESIGN-41:云表单：grid提供在移动端的样式修改方案 ([8b08272](https://github.com/iuap-design/tinper-neoui-grid/commit/8b08272))



<a name="3.1.3"></a>
## [3.1.3](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.1.1...v3.1.3) (2016-10-26)


### Bug Fixes

* pro-IUAPDESIGN-101:友云采：grid中横向滚动时需要隐藏编辑控件 ([928fdf1](https://github.com/iuap-design/tinper-neoui-grid/commit/928fdf1))
* pro-IUAPDESIGN-46:友云采：gird不出现左右滚动条（方案：px改为百分比） ([6c83f92](https://github.com/iuap-design/tinper-neoui-grid/commit/6c83f92))
* pro-IUAPDESIGN-50:友云采：grid表格数据不显示省略号（增加各行显示） ([b6a46ac](https://github.com/iuap-design/tinper-neoui-grid/commit/b6a46ac))
* pro-IUAPDESIGN-64:数字营销：grid增加参数控制点击content不触发Row选中 ([0a84f55](https://github.com/iuap-design/tinper-neoui-grid/commit/0a84f55))
* pro-IUAPDESIGN-89:友云采：grid没有数据的话下面的边线没有显示 ([bfa688f](https://github.com/iuap-design/tinper-neoui-grid/commit/bfa688f))
* pro-IUAPDESIGN-92:友云采：关联计算的数据在合计行的显示 ([f67aad8](https://github.com/iuap-design/tinper-neoui-grid/commit/f67aad8))
* pro-IUAPDESIGN-95:友云采：内容区点击之后第一次选中，第二次取消选中 ([b42059a](https://github.com/iuap-design/tinper-neoui-grid/commit/b42059a))
* pro-IUAPDESIGN-96:友云采：grid中取消选中之后的全选显示不对 ([eafb2dc](https://github.com/iuap-design/tinper-neoui-grid/commit/eafb2dc))
* pro-IUAPDESIGN-98:友云采：grid中title显示为id，renderType存在时取消td的title。 ([fe1160a](https://github.com/iuap-design/tinper-neoui-grid/commit/fe1160a))
* 增加参数noScroll控制grid不显示滚动条 ([a20304f](https://github.com/iuap-design/tinper-neoui-grid/commit/a20304f))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/iuap-design/tinper-neoui-grid/compare/3.0.6...v3.1.1) (2016-10-17)


### Bug Fixes

* fix test ([4d7ecc7](https://github.com/iuap-design/tinper-neoui-grid/commit/4d7ecc7))
* gird默认id绑定随机值避免冲突 ([e478905](https://github.com/iuap-design/tinper-neoui-grid/commit/e478905))
* 数表删除上的时候会导致数据丢失 ([48281f1](https://github.com/iuap-design/tinper-neoui-grid/commit/48281f1))
* 表格一直闪动问题 ([b3d74c1](https://github.com/iuap-design/tinper-neoui-grid/commit/b3d74c1))


### Features

* feat test ([9699a16](https://github.com/iuap-design/tinper-neoui-grid/commit/9699a16))



<a name="3.0.6"></a>
## [3.0.6](https://github.com/iuap-design/tinper-neoui-grid/compare/v3.0.6...3.0.6) (2016-07-04)



<a name="3.0.6"></a>
## 3.0.6 (2016-06-24)



