/**
 * 配置说明
 * 静态页面跳转
 * 静态数据
 * 公用接口地址
 */
var config = {
    //projectName: '/iread',
    projectName: '',
    begin: 1, //当前第几页，从1开始
    pageSize: 10, //默认分页大小,
    totalPage: 0, //总页数,
    pageRequest: undefined,
    currentPage: 1,
    baseUrl: 'http://115.28.131.95:8011',
    interfaceSuffix: '.aspx',
    pageSuffix: '.html'
};

config.server = config.baseUrl ? (config.baseUrl + config.projectName) : (location.protocol + '//' + location.host + config.projectName + '/'); //页面服务器地址
config.pageServer = location.protocol + '//' + location.host + config.projectName; //页面存放地址
config.imageServer = config.server + '/api/pictureapi' + config.interfaceSuffix; //图片存放地址
config.fileServer = config.server; //文件存放地址
config.interfaceServer = config.server + '/api/'; //接口地址
config.defaultImg = config.fileServer + '/assets/image/user.png'; //默认用户图片
config.defaultCarImg = config.fileServer + '/assets/image/car.png'; //默认车源图片
config.defaultGoodImg = config.fileServer + '/assets/image/good.png'; //默认货源图片
config.loadMoreImg = '/assets/image/ajax-loader.gif'; //加载中图片配置

/**
 * args = 'a','b','c'
 * @returns 'a/b/c'
 */
function createPageUrl() {
    if (!arguments.length) return;
    var n = '';
    for (i in arguments) {
        if (!arguments[i]) return n;
        if (arguments[i].charAt(0) !== '/') arguments[i] = '/' + arguments[i];
        if (arguments[i].charAt(arguments[i].length) !== '/') arguments[i] += '/';
        n += arguments[i];
    }
    if (!n.length) return n;
    n = n.replace(/\/\//g, '/');
    return config.pageServer + n.substr(0, n.length - 1) + config.pageSuffix;
}

function createInterfaceUrl(url) {
    return config.interfaceServer + url + config.interfaceSuffix;
}



module.exports = config;