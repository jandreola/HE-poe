'use strict'

// Load gulp
var gulp = require('gulp');

// Modules container
var $ = {};

// Modules declaration
var modules = {
        concat     : 'gulp-concat',
        del        : 'del',
        sass       : 'gulp-ruby-sass',
        minify_css : 'gulp-minify-css',
        autoprefix : 'gulp-autoprefixer',
        jshint     : 'gulp-jshint',
        rimraf     : 'gulp-rimraf',
        browserSync: 'browser-sync'
    };

// Load all modules into modules container
for(var key in modules) {
    if (modules.hasOwnProperty(key)) {
        $[key] = require(modules[key]);
    }
}

///////////////////////
// DEVELOPMENT TASKS //
///////////////////////

/////////////
// Scripts //
/////////////

/**
 * Concatenates all bower dependencies in components folder
 */
gulp.task('vendor', function(){

    // List of all dependencies
    var dependencies = [
        'bower_components/jquery/dist/jquery.js',
    ];

    return gulp.src(dependencies)
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./'));
});

/**
 * Concatenates all application scripts in assets/js folder
 */
gulp.task('script', function(){
    return gulp.src([
        'content/js/**/!(init)*.js',
        'content/js/init.js',
    ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('./'));
});


////////////
// Styles //
////////////

/**
 * Compile style
 */
gulp.task('style', function() {
    return gulp.src('./content/sass/main.sass')
    .pipe($.sass({
        'style': 'expanded',
        'sourcemap=none': true,
        'container':'gulp-ruby-sass'
    }))
    .pipe($.autoprefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulp.dest('./content/css/'));
});

//////////////////
// Browser Sync //
//////////////////
gulp.task('serve', function (cb) {
      $.browserSync({
        files: ['./**/*.{js,css,html}'],
        port: 8002,
        notify: true,
        server: {
          baseDir: './',
          index: 'index.html'
        }
      }, cb);
    });


///////////////
// MAIN TASK //
///////////////

/**
 * Sets watchers and triggers appropriate tasks
 */
gulp.task('default', ['vendor', 'script', 'style', 'serve'], function() {

    // Watch for scripts changes
    gulp.watch('./content/js/**/*.js', ['script']);

    // Watch for SASS changes
    gulp.watch('./content/sass/**/*.sass', ['style']);
});