var webpack = require('webpack'),
    glob = require('glob'),
    fixedDirectoryDescriptionFilePlugin = require('webpack-bower-resolver'),
    path = require('path'),
    fs = require('fs');

/**
 * 获取项目各个模块主入口
 */
function getEntry() {
    var entry = {};
    glob.sync(__dirname + '/app/asset/js/**/*.main.js').forEach(function(name) {

        var n = name.match(/([^/]+?)\.main\.js/)[1];

        entry[n] = name.replace(__dirname + '/app/', './');

    });

    return entry;
}

module.exports = {
    refreshEntry: function() {
        this.entry = getEntry();
    },
    context: __dirname + '/app/',
    entry: getEntry(),
    resolve: {
        root: [path.join(__dirname, "bower_components")],
        //设置 webpack 扫包目录
        modulesDirectories: [
            'node_modules',
            'bower_components'
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        //解析 bower 依赖包路径
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
        // ,
        // function() {
        //     this.plugin("done", function(stats) {
        //         var htmlPath = path.join(__dirname, 'build');
        //         console.log(htmlPath);
        //         console.log(stats);
        //         //var template = fs.readFileSync(htmlPath, 'utf8');
        //         //fs.writeFile(htmlPath, renderTmpl(template, stats.hash));
        //     });
        // }
    ],
    output: {
        path: __dirname + '/build/asset/js',
        filename: "[name].min.js"
            // filename: "[name]-[chunkhash].min.js"
    }
};
/**
 * 文件名替换
 */
function renderTmpl() {
    var args = arguments,
        tpl = args[0],
        i = args.length;

    if (!tpl) return;

    while (--i) {
        tpl = tpl.replace('{' + i + '}', args[i]);
    }

    return tpl;
}
