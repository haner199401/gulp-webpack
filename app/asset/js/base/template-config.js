var template = require('template'),
    config = require('./config'),
    Tools = require('./tools'),
    UserService = require('UserService');

template.openTag = "<!--[";
template.closeTag = "]-->";
/**
 * 模板帮助方法，绝对化图片地址
 * type {user,good}
 */
template.helper('$absImg', function(content, type) {
    return content;
});

// 模板帮助方法，转换时间戳成字符串
template.helper('$formatDate', function(content, type, defaultValue) {
    if (content) {
        if (content.length == 10)
            content = content + '000';
        return Tools.formatDate(content, type);
    } else {
        return defaultValue || '--';
    }
});

//模板帮助方法，编码url参数
template.helper('$encodeUrl', function(content) {
    return encodeURIComponent(content);
});

//模板帮助方法，格式化货币
template.helper('$formatCurrency1', function(content, defaultValue, unit) {
    if (!content) {
        return defaultValue || '--';
    }
    content = content + ''; //转字符串

    var prefix, subfix, idx = content.indexOf('.');
    if (idx > 0) {
        prefix = content.substring(0, idx);
        subfix = content.substring(idx, content.length);
    } else {
        prefix = content;
        subfix = '';
    }

    var mod = prefix.toString().length % 3;
    var sup = '';
    if (mod == 1) {
        sup = '00';
    } else if (mod == 2) {
        sup = '0';
    }

    prefix = sup + prefix;
    prefix = prefix.replace(/(\d{3})/g, '$1,');
    prefix = prefix.substring(0, prefix.length - 1);
    if (sup.length > 0) {
        prefix = prefix.replace(sup, '');
    }
    if (subfix) {
        if (subfix.length == 2) {
            subfix += '0';
        } else if (subfix.length == 1) {
            subfix += '00';
        }
        subfix = subfix.substring(0, 3);
    }

    return prefix + subfix;
});

//模板帮助方法，截取内容长度添加省略号
template.helper('$ellipsis', function(content, length) {
    var v = content.replace(/[^\x00-\xff]/g, '__').length;
    if (v / 2 > length) {
        return content.substring(0, length) + '...';
    }
    return content;
});

//模板帮助方法，格式化货币
template.helper('$formatCurrency', function(content, i) {
    if (!content) {
        return '--';
    }
    content = content + ''; //转字符串

    //1200.55->1200<span class="c-red f-s">.55</span>
    var p, f, idx = content.indexOf('.');
    if (idx > 0) {
        p = content.substring(0, idx);
        f = content.substr(idx, 3);
    } else {
        p = content;
        f = '.00';
    }
    return p + '<span class="f-s">' + f + '</span>';
});

//模板帮助方法，格式化货币
template.helper('$replaceStr', function(content, key, val) {
    if (!content) return '';
    return content.replace(key, val);
});