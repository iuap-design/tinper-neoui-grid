(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.re_gridCompLocalStorage = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    const re_initGridCompColumnLoacl = function () {
        var oThis = this,
            localGridCompColumnArr = this.getGridCompColumnArrFromLocal();
        // 获取本地缓存中的数据
        if (localGridCompColumnArr != null) {
            this.gridCompColumnArr = localGridCompColumnArr;
            $.each(this.gridCompColumnArr, function () {
                var field = this.options.field;
                for (var i = 0; i < oThis.options.columns.length; i++) {
                    var c = oThis.options.columns[i];
                    if (c.field == field) {
                        var options = $.extend({}, c, this.options);
                        this.options = options;
                        this.options.realWidth = this.options.width;
                        break;
                    }
                }
            });
        }
    };
    /*
     * 获取本地个性化存储的设置
     */
    const getLocalData = function () {
        if (!this.options.needLocalStorage) return null;
        if (window.localStorage == null) return null;
        if (this.$sd_storageData != null) return this.$sd_storageData;else {
            if (window.localStorage.getItem(this.localStorageId) == null) {
                try {
                    window.localStorage.setItem(this.localStorageId, "{}");
                } catch (e) {
                    return null;
                }
            }
            var storageDataStr = window.localStorage.getItem(this.localStorageId);
            if (typeof JSON == "undefined") this.$sd_storageData = eval("(" + storageDataStr + ")");else this.$sd_storageData = JSON.parse(storageDataStr);
            return this.$sd_storageData;
        }
    };
    /*
     * 保存本地个性化存储的设置
     */
    const saveLocalData = function () {
        if (!this.options.needLocalStorage) return null;
        var oThis = this;
        if (this.saveSettimeout) {
            clearTimeout(this.saveSettimeout);
        }
        this.saveSettimeout = setTimeout(function () {
            if (oThis.$sd_storageData == null || window.localStorage == null) return;
            var strogeDataStr = JSON.stringify(oThis.$sd_storageData);
            try {
                window.localStorage.setItem(oThis.localStorageId, strogeDataStr);
            } catch (e) {}
        }, 200);
    };
    /*
     * 清除本地个性化存储的设置
     */
    const clearLocalData = function () {
        if (!this.options.needLocalStorage) return null;
        if (this.saveSettimeout) {
            clearTimeout(this.saveSettimeout);
        }
        window.localStorage.setItem(this.localStorageId, "{}");
        this.$sd_storageData = {};
    };
    /*
     * 将数据列顺序保存至本地个性化存储
     */
    const saveGridCompColumnArrToLocal = function () {
        if (!this.options.needLocalStorage) return null;
        var defData = this.getLocalData();
        defData["gridCompColumnArr"] = this.gridCompColumnArr.concat(this.gridCompColumnFixedArr);
        this.saveLocalData();
    };
    /*
     * 从本地个性化存储中取出数据列顺序
     */
    const getGridCompColumnArrFromLocal = function () {
        if (!this.options.needLocalStorage) return null;
        var defData = this.getLocalData();
        if (defData == null) return null;
        if (defData["gridCompColumnArr"] == null) return null;
        return defData["gridCompColumnArr"];
    };
    const localStorageFunObj = exports.localStorageFunObj = {
        initGridCompColumnLoacl: re_initGridCompColumnLoacl,
        getLocalData: getLocalData,
        saveLocalData: saveLocalData,
        clearLocalData: clearLocalData,
        saveGridCompColumnArrToLocal: saveGridCompColumnArrToLocal,
        getGridCompColumnArrFromLocal: getGridCompColumnArrFromLocal
    };
});