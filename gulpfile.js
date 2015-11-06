var gulp = require('gulp');
var glp = require('gulp-load-plugins')({
  lazy: true
});
var browserify = require('browserify');
var watchify = require('watchify');
var tsify = require('tsify');
var babelify = require('babelify');
var path = require('path');
var source = require('vinyl-source-stream');

gulp.task('browserify', function (done) {

  var args = watchify.args;
  args.extensions = ['.tsx'];

  watchify(browserify(path.join("./client", "main.tsx"), args), args)
    .plugin('tsify', {noImplicitAny: true, jsx: "react"})
    .bundle()
    .on('error', function(err){
      console.error(err.message);
      done();
    })
    .pipe(source("app.js"))
    .pipe(gulp.dest("./wwwroot"))
    .pipe(glp.livereload()).on('end', done);
});

gulp.task('vendor:css', function () {

  var source = [
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/font-awesome/css/font-awesome.css"];

  return gulp.src(source)
    .pipe(glp.minifyCss())
    .pipe(glp.concat("vendor.css"))
    .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task('vendor:icons', function () {
  var source = [
    "./node_modules/bootstrap/dist/fonts/**/*",
    "./node_modules/font-awesome/fonts/**/*"
  ];

  return gulp.src(source).pipe(gulp.dest("./wwwroot/fonts"));
});

gulp.task('app:css', function () {

  // pipe the target file to the
  var mainFile = [path.join("./client/styles", "app.scss")];
  var imports = [
    "!" + mainFile[0],
    "./client/**/*.scss"
  ];

  return gulp.src(mainFile)
    .pipe(glp.inject(gulp.src(imports, {read: false}), {
      relative: true,
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: function(filePath){
        return '@import "' + filePath + '";';
      }
    }))
    .pipe(glp.sass())
    .pipe(glp.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('wwwroot/css'))
    .pipe(glp.livereload());
});


gulp.task('default', ['vendor:icons', 'vendor:css', 'app:css', 'browserify'], function () {
  glp.livereload.listen();

  gulp.watch('./client/**/*.tsx', ['browserify']);
  gulp.watch('./client/**/*.scss', ['app:css']);
});
