var gulp = require ("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
<<<<<<< HEAD
var gulpImport = require("gulp-html-import");

gulp.task("default",["html","sass"], function(){
    browserSync.init({server: "dist/"});
    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);
    gulp.watch("src/*.html", ["html"]);
=======

gulp.task("default", function(){
    browserSync.init({server: "src/"});
    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);
    gulp.watch("src/*.html").on("change", browserSync.reload);
>>>>>>> 7498995c04d11f9b4119fb36858ac50abc7db28a
})

gulp.task("sass", function(){
    gulp.src("src/scss/style.scss")
        .pipe(sass().on("error", function(error){
            return notify().write(error);
        }))
<<<<<<< HEAD
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
})

gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(gulp.dest("dist/"))
=======
        .pipe(gulp.dest("src/css/"))
>>>>>>> 7498995c04d11f9b4119fb36858ac50abc7db28a
        .pipe(browserSync.stream());
})
