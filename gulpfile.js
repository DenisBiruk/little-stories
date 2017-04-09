var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var wait = require('gulp-wait');

gulp.task('sass', function () {
  return gulp.src('app/sass/main.scss')
    .pipe(wait(200))
    .pipe(sass({outputStyle: 'compressed', includePaths: ['app/sass/base', 'app/sass/partials']}))
    .pipe(autoprefixer({browsers: ['last 15 versions', '> 1%', 'ie 9'], cascade: true }))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('jade', function () {
  return gulp.src(['app/jade/*.jade', '!app/jade/**/_*.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('app'))
});

gulp.task('scripts', function () {
  return gulp.src(['app/js/**/*.js', '!app/js/common.min.js', '!app/js/jquery.min.js'])
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('clean', function () {
  return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'sass', 'jade', 'scripts'], function () {
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/css/**/*.css', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'scripts'], function () {
  var buildCSS = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('docs/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('docs/fonts'));

  var buildScripts = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('docs/js'));

  var buildImages = gulp.src('app/img/**/*')
    .pipe(gulp.dest('docs/img'));

  var buildHTML = gulp.src('app/*.html')
    .pipe(gulp.dest('docs'));
});