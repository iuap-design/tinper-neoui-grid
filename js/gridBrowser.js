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

if(ua.indexOf('Android') > -1 || ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('adr') > -1) {
    gridBrowser.isAndroid = true;
}

if(gridBrowser.isAndroid){
    if(window.screen.width >= 768 && window.screen.width < 1024){
        gridBrowser.isAndroidPAD=true;
    }
    if(window.screen.width <= 768) {
        gridBrowser.isAndroidPhone = true;
    }
}


if(ua.match(/iphone/i)) {
    gridBrowser.isIOS = true;
    gridBrowser.isIphone = true;
}

if(gridBrowser.isIphone || gridBrowser.isAndroidPhone){
    gridBrowser.isMobile = true;
}
        
export{gridBrowser}
