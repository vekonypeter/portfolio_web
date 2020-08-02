var gulp = require('gulp');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');

const DIST_PATH = './dist/';
 
// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
    .pipe(gulp.dest(DIST_PATH + 'vendor/bootstrap'))

  // Devicons
  gulp.src([
    './node_modules/devicons/**/*',
    '!./node_modules/devicons/*.json',
    '!./node_modules/devicons/*.md',
    '!./node_modules/devicons/!PNG',
    '!./node_modules/devicons/!PNG/**/*',
    '!./node_modules/devicons/!SVG',
    '!./node_modules/devicons/!SVG/**/*'
  ])
    .pipe(gulp.dest(DIST_PATH + 'vendor/devicons'))

  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
    .pipe(gulp.dest(DIST_PATH + 'vendor/font-awesome'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest(DIST_PATH + 'vendor/jquery'))

})

// Compile SCSS
gulp.task('css:compile', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(DIST_PATH + 'css'))
});

// Copy files
gulp.task('copy', function () {
  return gulp.src(['./*.html', './img/*', './js/*'])
    .pipe(copy(DIST_PATH))
});

// Clean files
gulp.task('clean', function () {
  return gulp.src(DIST_PATH + '*')
    .pipe(clean());
});

// Build task
gulp.task('build', ['clean', 'copy', 'vendor', 'css:compile']);

// Default task
gulp.task('default', ['build']);

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: DIST_PATH
    }
  });
});

// Dev task
gulp.task('dev', ['build', 'browserSync'], function () {
  gulp.watch('./scss/*.scss', ['css:compile', browserSync.reload]);
  gulp.watch('./*.html', browserSync.reload);
});
