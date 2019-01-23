var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
webpack = require('webpack');


gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  watch('./app/index.html', function() {
    browserSync.reload();
  });
  watch('./app/assets/styles/**/*.css', gulp.series('styles', function() {
    return gulp.src('./app/temp/styles/styles.css')
      .pipe(browserSync.stream());
  }));
  watch('./app/assets/scripts/**/*.js', gulp.series('scripts', function() {
    // webpack(require('../../webpack.config.js'), function() {
    //   console.log("Hoo, completed");
    // })
    return gulp.src('./app/assets/scripts/**/*.js')
      .pipe(browserSync.reload());
  }));

});


gulp.task('cssInjection',gulp.series('styles', function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));
