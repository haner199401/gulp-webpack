/**
 * font-size calc
 * font－size default 20px;
 * iPhone 5 为基准 320 * 568
 * 1rem * 20px = 20px;
 * Haner
 */

(function(doc, win) {

    var docEl = doc.documentElement || doc.body,

        fontSize = 20, //default 20px

        defaultDeviceWidth = 320, //默认为 iPhone 5的设备宽

        maxDevicewidth = 1024, //最大设备宽度

        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',

        flexible = {};

    flexible.dpr = (function() {
        var devicePixelRatio = win.devicePixelRatio || 2;
        var dpr = 1;
        //对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 2) {
            dpr = 2;
        }
        return dpr;
    })();


    flexible.rem = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= maxDevicewidth) {
            clientWidth = defaultDeviceWidth;
        }
        flexible.rem = fontSize = fontSize * (clientWidth / defaultDeviceWidth);
        docEl.style.fontSize = fontSize + 'px';

        return fontSize;
    };


    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem * flexible.dpr;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    };


    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem / flexible.dpr;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    };


    flexible.refreshRem = flexible.rem;

    !win.flexible ? (win.flexible = flexible) : '';

    if (!doc.addEventListener) return;

    win.addEventListener(resizeEvt, flexible.rem, false);

    doc.addEventListener('DOMContentLoaded', flexible.rem, false);

})(document, window);