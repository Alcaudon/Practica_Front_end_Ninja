var gulp = require ("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
var gulpImport = require("gulp-html-import");

gulp.task("default",["html","sass"], function(){
    browserSync.init({server: "dist/"});

    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);    
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);
})

gulp.task("sass", function(){
    gulp.src("src/scss/style.scss")
        .pipe(sass().on("error", function(error){
           return notify().write(error);
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
})

gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
})
