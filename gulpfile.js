const gulp = require('gulp');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const htmlreplace = require('gulp-html-replace');
sass.compiler = require('node-sass');
const imagemin = require('gulp-imagemin');
const archiver = require('gulp-archiver');
const browserSync = require('browser-sync').create();


const css = ['css/reset.css', 'css/additional.css', 'css/theme/sky.css', 'css/fonts.css', 'lib/css/zenburn.css', 'plugin/verticator/verticator.css'];
gulp.task('styles', () => {
    let sassStream = gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(concat('sassFiles.css'))
        .pipe(sourcemaps.init());

    let cssStream = gulp
        .src(css)
        .pipe(sourcemaps.init())
        .pipe(concat('cssFiles.css'));

    return merge(sassStream, cssStream)
        .pipe(concat('styles.min.css'))
        // .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie10'}))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

const js = ['js/reveal.js',
    'plugin/verticator/verticator.js',
    'plugin/markdown/marked.js',
    'plugin/markdown/markdown.js',
    'plugin/notes/notes.js',
    'plugin/highlight/highlight.js'];


gulp.task('js', () => {
    return gulp.src(js)
        .pipe(sourcemaps.init())
        .pipe(rename(function (path) {
            path.extname = '.min.js'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./maps")) // Inline source maps.
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());

});

gulp.task('md', () => {
    return gulp
        .src('slides/*.md')
        .pipe(gulp.dest('dist/slides/'));
});

gulp.task('img', () => {
    return gulp
        .src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp
        .src('index.html')
        .pipe(htmlreplace({
            "css": "css/styles.min.css"
        }, {
            resolvePaths: true
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
});

gulp.task('index', gulp.series(gulp.parallel('styles', 'js', 'md', 'img'), 'html'));

gulp.task('clean', () => del(['dist']));
gulp.task('default', gulp.series('clean', 'index'));

gulp.task('serve', gulp.series('default', function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('slides/*', gulp.series('md'));
    gulp.watch('index.html', gulp.series('html'));
    gulp.watch(js, gulp.series('js'));
    gulp.watch(css, gulp.series('styles'));
    gulp.watch('./css/*.scss', gulp.series('styles'));
    gulp.watch("dist/**/*").on('change', browserSync.reload);
}));

gulp.task('zip', gulp.series('default', () => {
    return gulp.src('dist/**/*', '!dist/build.zip')
        .pipe(archiver('build.zip'))
        .pipe(gulp.dest('dist'))
}));