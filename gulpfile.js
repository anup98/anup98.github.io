const gulp = require('gulp');
const { series, parallel } = require('gulp');
const babel = require('gulp-babel');

function transpile(cb) {
    gulp.src('js/*.js')
    .pipe(babel({
        presets: ['@babel/env'],
    }))
    .pipe(gulp.dest('dist/js'));
    cb();
}

function vendor(cb) {
    gulp.src('vendor/*.js').pipe(gulp.dest('dist/js'));
    cb();
}

function minify(cb) {
    cb();
}

exports.default = parallel(vendor, transpile);
exports.build = parallel(vendor, series(transpile, minify));

// gulp.task('default', () => gulp.src('js/*.js')
//     .pipe(babel({
//         presets: ['@babel/env'],
//     }))
//     .pipe(gulp.dest('dist')));
