var gridBrowser = {},userAgent = navigator.userAgent,ua = userAgent.toLowerCase(),s;
if (s=ua.match(/msie ([\d.]+)/)) {
    gridBrowser.isIE = true;
}
if (gridBrowser.isIE) {
    var mode = document.documentMode;
    if(mode == null){
    }else{
        if (mode == 8) {
            gridBrowser.isIE8 = true;
        }
        else if (mode == 9) {
            gridBrowser.isIE9 = true;
        }
    }
}
export{gridBrowser}
