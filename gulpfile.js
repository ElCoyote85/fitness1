var gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    autoprefixer = require("gulp-autoprefixer"),
    clean = require("gulp-clean-css"),
    jade = require("gulp-jade"),
    prettify = require("gulp-html-prettify"),
    sourcemaps = require("gulp-sourcemaps"),
    plumber = require("gulp-plumber");

var foundation = "./bower_components/foundation-sites",
    site_sass = "./sass",
    css = "./css",
    scripts = [
       foundation + "/js/foundation.core.js",
       foundation + "/js/foundation.util.mediaQuery.js",
       foundation + "/js/foundation.reveal.js",
       foundation + "/js/foundation.interchange.js",
    //    foundation + "/js/foundation.responsiveMenu.js",
    //    foundation + "/js/foundation.responsiveToggle.js",
       foundation + "/js/foundation.util.timerAndImageLoader.js",
       foundation + "/js/foundation.util.touch.js",
       foundation + "/js/foundation.orbit.js",
       foundation + "/js/foundation.util.keyboard.js",
       foundation + "/js/foundation.util.box.js",
       foundation + "/js/foundation.util.triggers.js",
       foundation + "/js/foundation.tabs.js",
       foundation + "/js/foundation.util.motion.js"
    ];

gulp.task("default", ["sass"]);

gulp.task("sass", function () {
    console.log("goood");
    gulp.src(["./scss/*.scss", "./scss/fontcss/*.css"])
    .pipe(plumber())
    .pipe(sourcemaps.init()) 
    .pipe(sass({includePaths: [
        foundation + "/scss",
        "./bower_components/motion-ui"
    ]}))
    .pipe(concat("app.css"))
    .pipe(autoprefixer({
        browser: ["last 2 versions"],
        cascade: false
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest("./public/css"));
})

gulp.task("jade", function () {
    gulp.src(["./templates/*.jade"])
    .pipe(plumber())
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest("./public"));
})

gulp.task("makejs", function () {
    gulp.src(scripts)
    .pipe(concat("foundation.js"))
    .pipe(babel({presets:["es2015"]}))
    // .pipe(uglify())
    .pipe(gulp.dest("./public/js"));
})

gulp.task("minifycss", function(){
    gulp.src("./public/css/*.css")
    .pipe(clean())
    .pipe(gulp.dest("./public/css"));
})

gulp.task("compressjs", function () {
    gulp.src("./public/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./public/js"))
})

// Deprecated
// gulp.task("copyjs", function () {
//     gulp.src(foundation + "/js/*.js")
//     .pipe(gulp.dest("./public/js"));
// });


gulp.task("watch", function () {
    gulp.watch(["./scss/**"], ["sass"]);
    gulp.watch(["./templates/*.jade", "./templates/**/*.jade"], ["jade"]);
    // gulp.watch([foundation + "/js/*.js"], ["copyjs"]);
});
