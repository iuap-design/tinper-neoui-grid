'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var base64 = require('gulp-base64');
var minifycss = require('gulp-minify-css');
var util = require('gulp-util');
var version = require('./version.js');

/**
 * 公共错误处理函数
 * 使用示例：
 *  .pipe(uglify())
 .on('error', errHandle)
 .pipe(rename('u.min.js'))
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
var errHandle = function ( err ) {
    // 报错文件名
    var fileName = err.fileName;
    // 报错类型
    var name = err.name;
    // 报错信息
    var message = err.message;
    // 出错代码位置
    var loc = err.loc;

    var logInfo = '报错文件：' + fileName + '报错类型：' + name + '出错代码位置：' + loc.line + ',' + loc.column;

    util.log( logInfo );

    this.end();
}


var globs = {
    js:[
        'src/js/gridComp.js',
        'src/js/ColumnMenu.js',
        'src/js/Drag.js',
        'src/js/Edit.js',
        'src/js/EditForm.js',
        'src/js/Fixed.js',
        'src/js/FormShow.js',
        'src/js/HeaderLevel.js',
        'src/js/OverWidthHidden.js',
        'src/js/Sort.js',
        'src/js/SumRow.js',
        'src/js/Swap.js',
        'src/js/Tree.js',
    ],
    css: 'css/grid.css'
};

gulp.task('js-init', function() {
    return gulp.src(globs.js)
        .pipe(concat('u-grid.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify().on('error', errHandle))
        .pipe(rename('u-grid.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js', ['js-init'], function(){
    version.init([
            'dist/js/u-grid.js',
            'dist/js/u-grid.min.js',
        ]);
})


gulp.task('css-init',function(){
    return gulp.src(globs.css)
        .pipe(base64().on('error',errHandle))
        .pipe(gulp.dest('dist/css'))
        .pipe(minifycss())
        .pipe(rename('grid.min.css'))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('css', ['css-init'], function(){
    // version.init([
    //         'dist/css/grid.css',
    //         'dist/css/grid.min.css',
    //     ]);
})

gulp.task('distWatch',function(){
    // gulp.watch(globs.js,['js']);
    gulp.watch(globs.css,['css'])
})

gulp.task('dev', [ 'css'], function(){
    gulp.run('distWatch');
});

gulp.task('dist', ['css'], function(){
});
