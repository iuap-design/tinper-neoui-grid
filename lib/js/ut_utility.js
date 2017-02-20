"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDataTableRowIdByRow = exports.getTrIndex = exports.accAdd = exports.DicimalFormater = exports.cloneObj = exports.getFloat = exports.getInt = exports.getString = exports.swapEle = exports.formatWidth = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _gridBrowser = require("./gridBrowser");

/*
 * 对宽度和高度进行处理
 */
var formatWidth = function formatWidth(w) {
    // 获得宽度
    if (w) {
        return (w + "").indexOf("%") > 0 ? w : parseInt(w) + "px";
    } else {
        return '';
    }
};
/*
 * 两个元素交换位置，要求传入参数e1在e2之前
 */
var swapEle = function swapEle(e1, e2) {
    var n = e1.next(),
        p = e2.prev();
    e2.insertBefore(n);
    e1.insertAfter(p);
};
var getString = function getString(value, defaultValue) {
    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "") {
        value = defaultValue;
    }
    if (_gridBrowser.gridBrowser.isIE8) {
        return [value].join("");
    } else {
        return value + "";
    }
};
var getInt = function getInt(value, defaultValue) {
    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || isNaN(value)) {
        value = defaultValue;
    }
    return value;
};
var getFloat = function getFloat(value, defaultValue) {
    if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || isNaN(value)) {
        value = defaultValue;
    }
    return value;
};
/*
 * 克隆对象
 */
var cloneObj = function cloneObj(obj) {
    var o;
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(this.cloneObj(obj[i]));
                }
            } else {
                o = {};
                for (var k in obj) {
                    o[k] = this.cloneObj(obj[k]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
};
/*
 * 处理精度
 */
var DicimalFormater = function DicimalFormater(obj) {
    var value = obj.value + '',
        precision = obj.precision;
    for (var i = 0; i < value.length; i++) {
        if ("-0123456789.".indexOf(value.charAt(i)) == -1) return "";
    }
    return checkDicimalInvalid(value, precision);
};
var checkDicimalInvalid = function checkDicimalInvalid(value, precision) {
    if (value == null || isNaN(value)) return "";
    // 浮点数总位数不能超过10位
    var digit = parseFloat(value);
    var result = (digit * Math.pow(10, precision) / Math.pow(10, precision)).toFixed(precision);
    if (result == "NaN") return "";
    return result;
};
var accAdd = function accAdd(v1, v2) {
    var r1, r2, m;
    try {
        r1 = v1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = v2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (v1 * m + v2 * m) / m;
};
var getTrIndex = function getTrIndex($tr) {
    return $('tr[id!="' + this.options.id + '_edit_tr"]', $tr.parent()).index($tr);
};

var getDataTableRowIdByRow = function getDataTableRowIdByRow(row) {
    return row.value['$_#_@_id'];
};

/**
 * 按字节数截取字符串 例:"e我是d".nLen(4)将返回"e我"
 */
String.prototype.substrCH = function (nLen) {
    var i = 0;
    var j = 0;
    while (i < nLen && j < this.length) {
        // 循环检查制定的结束字符串位置是否存在中文字符
        var charCode = this.charCodeAt(j);
        if (charCode > 256 && i == nLen - 1) {
            break;
        }
        //      else if(charCode >= 0x800 && charCode <= 0x10000){
        //          i = i + 3;
        //      }
        else if (charCode > 256) {
                // 返回指定下标字符编码，大于265表示是中文字符
                i = i + 2;
            } //是中文字符，那计数增加2
            else {
                    i = i + 1;
                } //是英文字符，那计数增加1
        j = j + 1;
    };
    return this.substr(0, j);
};

exports.formatWidth = formatWidth;
exports.swapEle = swapEle;
exports.getString = getString;
exports.getInt = getInt;
exports.getFloat = getFloat;
exports.cloneObj = cloneObj;
exports.DicimalFormater = DicimalFormater;
exports.accAdd = accAdd;
exports.getTrIndex = getTrIndex;
exports.getDataTableRowIdByRow = getDataTableRowIdByRow;