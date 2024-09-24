var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');

// Define paths
var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/soft-design-system.scss',
  SCSS: './assets/scss/**/**',
  HTML: './**/*.html',
  IMAGES: './assets/img/**/*'
};

// Task to compile SCSS
gulp.task('compile-scss', function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write(Paths.HERE))
      .pipe(gulp.dest(Paths.CSS));
});

// Task to copy HTML files to dist
gulp.task('copy-html', function () {
  return gulp.src(Paths.HTML)
      .pipe(gulp.dest(Paths.DIST));
});

// Task to copy images to dist
gulp.task('copy-images', function () {
  return gulp.src(Paths.IMAGES)
      .pipe(gulp.dest(path.join(Paths.DIST, 'assets/img')));
});

// Clean the dist folder (use dynamic import)
gulp.task('clean', function () {
  return import('del').then(del => {
    return del.deleteSync([Paths.DIST]);
  });
});

// Watch task for changes
gulp.task('watch', function () {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

// Open the app
gulp.task('open', function () {
  gulp.src('index.html')
      .pipe(open());
});

// Open app with watching
gulp.task('open-app', gulp.parallel('open', 'watch'));

// Build task: Clean dist, compile SCSS, and copy HTML/images
gulp.task('build', gulp.series('clean', 'compile-scss', 'copy-html', 'copy-images'));
