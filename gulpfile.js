'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var util = require('gulp-util');

/**
 * 公共错误处理函数
 * 使用示例：
 *  .pipe(uglify())
 .on('error', errHandle)
 .pipe(rename('u.min.js'))
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function errHandle(err) {
    util.log(err.fileName + '文件编译出错，出错行数为' + err.lineNumber + '，具体错误信息为：' + err.message);
    this.end();
};


var globs = {
    js: {
        js:[
            'js/gridComp.js',
            'js/ColumnMenu.js',
            'js/Drag.js',
            'js/Edit.js',
            'js/EditForm.js',
            'js/Fixed.js',
            'js/FormShow.js',
            'js/HeaderLevel.js',
            'js/OverWidthHidden.js',
            'js/Sort.js',
            'js/SumRow.js',
            'js/Swap.js',
            'js/Tree.js',
        ],
        dtJs:[
            'dist/js/grid.js',
            'js/dtJs/grid.js'
        ]
    },
    css: 'css/grid.css'
};

gulp.task('gridJs', function() {
    return gulp.src(globs.js.js)
        .pipe(concat('grid.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('grid.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uGridJs', ['gridJs'], function(){
    return gulp.src(globs.js.dtJs)
        .pipe(concat('u-grid.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('u-grid.min.js'))
        .pipe(gulp.dest('dist/js'));
})

gulp.task('gridCss',function(){
    return gulp.src(globs.css)
        .pipe(gulp.dest('dist/css'))
        .pipe(minifycss())
        .pipe(rename('grid.min.css'))
        .pipe(gulp.dest('dist/css'));
})


gulp.task('dist', ['uGridJs', 'gridCss'], function(){
});
