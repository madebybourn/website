var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    concat 	= require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify 	= require('gulp-uglify'),
    sourcemaps = require("gulp-sourcemaps"),
    webpack = require('webpack-stream'),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "./src/stylesheets/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "../web/stylesheets"
    },

    app_scripts: {
        src: "./src/javascripts/app/**/*.js",
        dest: "../web/javascripts",
    },

    vendor_scripts: {
        src: "./src/javascripts/vendor/**/*.js",
        dest: "../web/javascripts",
    },
 
    // Easily add additional paths
    // html: {
    //     src: "./src/templates/*.html",
    //     dest: "../templates/compiled",
    // }
};

function style() {
    return gulp
        .src(paths.styles.src)
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}

// Multiple Entry Points - https://www.npmjs.com/package/webpack-stream-watch
function app_scripts() {
    return gulp
      .src('./src/javascripts/app/index.js')
      .pipe(webpack({
        mode: 'production',
        entry: {
          app: './src/javascripts/app/index.js',
        },
        output: {
          filename: 'app.js',
        },
      }))
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
      // .pipe(concat('app.js'))
      .pipe(gulp.dest(paths.app_scripts.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream());
}

function vendor_scripts() {
    return gulp
      .src(paths.vendor_scripts.src)
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.vendor_scripts.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream());
}

function jquery() {
  return gulp
  .src('./src/javascripts/jquery.js')
    .pipe(gulp.dest(paths.vendor_scripts.dest))
}
  
/*
function templates(){
    gulp.src('views/*.hbs')
      .pipe(handlebars())
      //.pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        namespace: 'MyApp.templates',
        noRedeclare: true, // Avoid duplicate declarations
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('assets/js/'));
}
*/


// A simple task to reload the page
function reload() {
    browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
function watch() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        // server: {
        //     baseDir: "./src"
        // },
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        //
        // KG: Leave this empty and a snippet will pop-up up for use with a vhost
        // proxy: "local.samreich.com",
        //
        // open: 'external',
        // host: 'localhost',
        // Use the SSL cert to make this work with browsersync
        https: {
          key: "./server.key",
          cert: "./server.crt",
        }, 
        // files: ['../templates/**/*'],
    });

    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.app_scripts.src, app_scripts);
    gulp.watch(paths.vendor_scripts.src, vendor_scripts);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    //gulp.watch("src/*.html", reload);
    // gulp.watch(paths.html.src).on('change', browserSync.reload);
}
 
// We don't have to expose the reload function
// It's currently only useful in other functions

    
// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
exports.app_scripts = app_scripts;
exports.vendor_scripts = vendor_scripts;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var dev = gulp.parallel(style, app_scripts, vendor_scripts, jquery, watch);
var build = gulp.parallel(style, app_scripts, vendor_scripts, jquery);
 
/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);
 
/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', dev);