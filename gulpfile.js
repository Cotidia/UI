'use strict';

const gulp     = require('gulp');
const sass     = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const del      = require('del');

// JS compilation - may need reviewing (copied from https://gist.github.com/danharper/3ca2273125f500429945)
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');

const fractal  = require('./fractal.js'); // import the Fractal instance configured in the fractal.js file
const logger = fractal.cli.console;      // make use of Fractal's console object for logging

require("node-neat")
/*
 * An example of a Gulp task that starts a Fractal development server.
 */

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.urls.sync.local}`);
    });
});

/*
 * An example of a Gulp task that to run a static export of the web UI.
 */

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

/* CSS */

gulp.task('css:process', function() {
  return gulp.src('assets/sass/build.scss')
    .pipe(sassGlob())
    .pipe(sass({
            includePaths: require("node-neat").includePaths.concat(require('sixteen').includePaths)
        }))
    .on('error', err => console.log(err.message))
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('css:clean', function() {
    return del(['public/assets/css']);
});

gulp.task('css:watch', function () {
    gulp.watch([
        'assets/css/**/*.scss',
        'components/**/*.scss'
    ], ['css']);
});

gulp.task('css', ['css:clean', 'css:process']);


/* Javascript */

function compileJS(watch) {
  var bundler = watchify(browserify('assets/js/main.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/assets/js/main.js'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watchJS() {
  return compileJS(true);
};

gulp.task('js:build', function(){
    return compileJS();
})

gulp.task('js:watch', function(){
    return watchJS();
})

gulp.task('js', ['js:build']);


/* Fonts */

gulp.task('fonts:copy', function() {
  return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('fonts:clean', function(done) {
    return del(['public/assets/fonts'], done);
});

gulp.task('fonts', ['fonts:clean', 'fonts:copy']);

gulp.task('fonts:watch', function() {
    gulp.watch('assets/fonts/**/*', ['fonts']);
});

/* Images */

gulp.task('images:copy', function() {
  return gulp.src('assets/img/**/*')
    .pipe(gulp.dest('public/assets/img'));
});

gulp.task('images:clean', function(done) {
    return del(['public/assets/img'], done);
});

gulp.task('images', ['images:clean', 'images:copy']);

gulp.task('images:watch', function() {
    gulp.watch('assets/img/**/*', ['images']);
});


gulp.task('default', ['css', 'js', 'fonts', 'images']);
gulp.task('watch', ['css:watch', 'js:watch', 'fonts:watch', 'images:watch']);

gulp.task('dev', ['default', 'fractal:start', 'watch']);
