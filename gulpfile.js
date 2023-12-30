import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import notify from 'gulp-notify';


// Paths
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'assets'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'assets'
  }
};

// Compile SCSS
export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Minify JS
export function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(uglify())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Watch files
export function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

// Default task
export default gulp.parallel(styles, scripts, watch);
