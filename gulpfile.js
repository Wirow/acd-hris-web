var gulp = require('gulp');
var del = require('del');
// var concat = require('gulp-concat');
// var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
// var ngConfig = require('gulp-ng-config');
// var addStream = require("add-stream");
// var ngAnnotate = require("gulp-ng-annotate");
// var uglify = require("gulp-uglify");
// var plumber = require("gulp-plumber");

var path = {
    src: "src/",
    dist: "dist/"
};

var img = [
    path.src + "img/**/*.*"
];

var favicon = [
    path.src + "img/favicon.ico"
];

var manifest = [
    path.src + "manifest.json"
];

var scss = [
    path.src + "scss/*.*"
];

var fonts = [
    path.src + "fonts/**/*.*"
];

var index = path.src + "index.html";

var templates = [
    path.src + "modules/**/*.html"
];

//Error handling function
function handleErrors() {
    for(var i = 0; i < arguments.length; i++) {
        console.log("Plugin: " + arguments[i].plugin + "\n" + "Message: " + arguments[i].message)
    }
}

//Convenience wrapper to adopt plumber
gulp.plumbedSrc = function(){
    return gulp.src.call(gulp, arguments[0])
        .pipe(plumber());
};

//Task begging
//==========================================

//Task for deleting "dist" folder
gulp.task("clean", function() {
    return del(path.dist, {
        force: true
    });
});


//Task for moving fonts to dist
var fontsTask = function() {
    return gulp.src(fonts)
        .pipe(gulp.dest(path.dist + "fonts/"));
};
gulp.task("fonts", fontsTask);


//Task for moving images to dist
var imagesTask = function() {
    return gulp.src(img)
        .pipe(gulp.dest(path.dist + "img/"))
};

gulp.task("images", imagesTask);


//Task for moving "index.html" to dist
var indexTask = function() {
    return gulp.src(index)
        .pipe(gulp.dest(path.dist));
};

gulp.task("index", indexTask);


//Task for moving manifest to dist
var manifestTask = function() {
    return gulp.src(manifest)
        .pipe(gulp.dest(path.dist))
};

gulp.task("manifest", manifestTask);


// //Task for moving "index.html" to dist
// var indexTask = function() {
//     return gulp.src(index)
//         .pipe(gulp.dest(path.dist));
// };
//
// gulp.task("index", indexTask);
//
//
// //Task for converting sass to css and gather it together
// var scssTask = function() {
//     gulp.plumbedSrc(scss)
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({ browsers: ['last 2 versions'] })).on("error", handleErrors)
//         .pipe(concat("styles.css")).on("error", handleErrors)
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(path.dist + "css/"));
// };
//
// gulp.task("scss", scssTask);
//
//
// //Function for creating from json constants for module
// var createConfig = function(environment){
//     return gulp.src(path.src + "modules/acdn-web/apiEndpoints.json")
//         .pipe(ngConfig("acdn-web", {
//             createModule: false,
//             environment: environment,
//             wrap: true
//         }))
// };
//
// // var jsTask = function() {
// //     gulp.plumbedSrc(js)
// //         .pipe(sourcemaps.init()).on("error", handleErrors)
// //         .pipe(addStream.obj(createConfig("development")))
// //         .on("error", handleErrors)
// //         .pipe(ngAnnotate())
// //         .on("error", handleErrors)
// //         .pipe(concat("scripts.js"))
// //         .on("error", handleErrors)
// //         .pipe(sourcemaps.write("."))
// //         .on("error", handleErrors)
// //         .pipe(gulp.dest(path.www + "/js"))
// // };
// //
// // gulp.task("js", jsTask);
//
//
// //Task for copying all templates
// // var templatesTask =  function() {
// //     return gulp.src(templates)
// //         .pipe(gulp.dest(path.dist + "/templates"));
// // };
//
// gulp.task("templates", templatesTask);
//
// var watchProject = function() {
//     gulp.watch(path.src + "scss/**/*", ["scss"]);
//     gulp.watch(path.src + "img/**/*", ["images"]);
//     // gulp.watch(path.src + "modules/**/*.js", ["js-dev"]);
//     // gulp.watch(path.src + "modules/**/*.html", ["templates"]);
//     gulp.watch(path.src + "index.html", ["index"]);
// };
//
//
// gulp.task("dev", ["images", "favicon", "manifest", "index", "css-dev", "fonts", "js-dev", "templates"], watchProject); // use for developing
// gulp.task("build", ["images", "favicon", "manifest", "index", "css-build", "fonts", "js-build", "templates"]); // use for production build
