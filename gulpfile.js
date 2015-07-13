var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(), //gulp 插件加载
    webpackConfig = require('./webpack.config.js'), //webpack config
    mergeStream = require('merge-stream'), //文件流 处理
    browserSync = require('browser-sync'), //实时刷新
    reload = browserSync.reload,
    reveasy = require("gulp-rev-easy"); //reversion

//源目录
var globs = {
    js: 'app/asset/js/**/*.js',
    css: 'app/asset/style/**/*.styl',
    html: 'app/**/*.jade',
    assets: [
        'app/asset/fonts/*',
        'app/asset/images/*'
    ]
};
//编译后目录
var build = {
    src: {
        js: './build/asset/js/**/*.js',
        css: './build/asset/style/**/*.css',
        html: './build/**/*.html'
    },
    dest: {
        js: './build/asset/js/',
        css: './build/asset/style/',
        html: './build/'
    },
    assets: [
        './build/asset/fonts/',
        './build/asset/images/'
    ]
};



/**
 * 是否打印log
 * @type {boolean}
 */
var isLog = !0;

/**
 * clean file
 */
gulp.task('clean', require('del').bind(null, ['build']));

/**
 * js
 */
gulp.task('js', ['webpack'], function() {
    return gulp.src(build.src.js)
        .pipe(gulp.dest(build.dest.js));
});

/**
 * webpack 打包
 */
gulp.task('webpack', function() {

    webpackConfig.refreshEntry();

    return gulp.src(globs.js)
        .pipe($.webpack(webpackConfig))
        .pipe(gulp.dest(build.dest.js));
});

/**
 * stylus 编译
 */
gulp.task('css', function() {
    return gulp.src(globs.css)
        .pipe($.stylus())
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 0 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(build.dest.css));
});

/**
 * 资源迁移
 */
gulp.task('assets', function() {
    var i = 0;
    return mergeStream.apply(null, globs.assets.map(function(glob) {
        return gulp.src(glob).pipe(gulp.dest(build.assets[i++]));
    }));
});

/**
 * jade 编译
 */
gulp.task('html', function() {
    gulp.src(globs.html)
        .pipe($.plumber(errrHandler)) //异常处理
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest(build.dest.html));
});

/**
 * 构建项目，Reversion HTML
 */
gulp.task('build', ['js', 'css', 'assets', 'html'], function() {
    return gulp.src(build.src.html)
        .pipe(reveasy())
        .pipe(gulp.dest(build.dest.html))
});


/**
 * 文件变更，liveload
 */
gulp.task('watch', ['build'], function() {

    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['build']
        }
    });

    gulp.watch(globs.js, ['js']);

    gulp.watch(globs.css, ['css']);

    gulp.watch(globs.html, ['html']);

    gulp.watch(globs.assets, ['assets']);

    gulp.watch([globs.js, globs.css, globs.html, globs.assets]).on('change', reload);
});

/**
 * default
 */
gulp.task('default', ['clean'], function() {
    // gulp.start('watch');
    gulp.start('build');
});

/**
 * 异常捕获,避免jade编译出错时停止进程
 * @param e
 */
function errrHandler(e) {
    log(e.message);
}

/**
 * Log 
 */
function log(msg) {
    var dateStr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    isLog ? console.log('[' + dateStr + '] : ' + msg) : ''
}
