var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var cache = require('gulp-cache');
var notify = require('gulp-notify');
var pkg = require('./package.json');

// Config
var config = {
    src: 'src/',
    dist: 'dist/'
};

// Banner
var banner = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * Copyright (c) 2016, <%= pkg.author.name %>',
    ' * Released under the <%= pkg.license.name %> license.',
    ' */',
    ''
].join('\n');

// 压缩图片
gulp.task('img', function() {
    return gulp.src(config.src + 'img/*.{png,jpg,jpeg,gif,ico}')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(config.dist + 'img'))
        .pipe(notify({
            message: '压缩图片文件完毕',
            onLast: true
        }));
});

// 压缩css
gulp.task('css', function() {
    return gulp.src(config.src + 'css/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(gulp.dest(config.dist + 'css'))
        .pipe(notify({
            message: '压缩css文件完毕',
            onLast: true
        }));
});

// 压缩js
gulp.task('js', function() {
    return gulp.src(config.src + 'js/*.js')
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest(config.dist + 'js'))
        .pipe(notify({
            message: '压缩js文件完毕',
            onLast: true
        }));
});

// Default task
gulp.task('default', ['img', 'css', 'js']);