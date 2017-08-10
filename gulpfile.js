var gulp = require ("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");

gulp.task("default", function(){
    browserSync.init({server: "src/"});
    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);
    gulp.watch("src/*.html").on("change", browserSync.reload);
})

gulp.task("sass", function(){
    gulp.src("src/scss/style.scss")
        .pipe(sass().on("error", function(error){
            return notify().write(error);
        }))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());
})
