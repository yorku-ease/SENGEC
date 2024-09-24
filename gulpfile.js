var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var path = require('path');
var open = require('gulp-open');

// Paths
var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/soft-design-system.scss',
  SCSS: './assets/scss/**/**',
  JS: './assets/js/**/*',
  FONTS: './assets/fonts/**/*',
  IMAGES: './assets/img/**/*',
  HTML: './pages/**/*.html'
};

// Dynamically import `del` to use it in the `clean-dist` task
gulp.task('clean-dist', async function () {
  const del = (await import('del')).deleteSync;
  return del([Paths.DIST]);
});

// Compile SCSS into CSS and place it in the `dist/assets/css` folder
gulp.task('compile-scss', function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.join(Paths.DIST, 'assets/css')));
});

// Copy JavaScript files to the `dist/assets/js` folder
gulp.task('copy-js', function () {
  return gulp.src(Paths.JS)
      .pipe(gulp.dest(path.join(Paths.DIST, 'assets/js')));
});

// Copy fonts to the `dist/assets/fonts` folder
gulp.task('copy-fonts', function () {
  return gulp.src(Paths.FONTS)
      .pipe(gulp.dest(path.join(Paths.DIST, 'assets/fonts')));
});

// Copy images to the `dist/assets/img` folder
gulp.task('copy-images', function () {
  return gulp.src(Paths.IMAGES)
      .pipe(gulp.dest(path.join(Paths.DIST, 'assets/img')));
});

// Copy HTML files to the `dist/` folder
gulp.task('copy-html', function () {
  return gulp.src(Paths.HTML)
      .pipe(gulp.dest(Paths.DIST));
});

// Watch SCSS files for changes and recompile
gulp.task('watch', function () {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

// Open the app in the browser
gulp.task('open-app', function () {
  return gulp.src('index.html')
      .pipe(open());
});

// Build task - clean, compile, and copy assets (including HTML)
gulp.task('build', gulp.series('clean-dist', 'compile-scss', 'copy-js', 'copy-fonts', 'copy-images', 'copy-html'));

// Default task (called when you run `gulp`)
gulp.task('default', gulp.series('build'));

// Serve task to open the app and watch for changes
gulp.task('serve', gulp.series('build', gulp.parallel('open-app', 'watch')));
