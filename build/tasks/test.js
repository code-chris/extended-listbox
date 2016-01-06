var gulp = require('gulp');
var paths = require('../paths');
var ts = require('gulp-typescript');
var compilerOptions = require('../tsc-options');
var through = require('through2');
var fs = require('fs');
var path = require('path');
var runSequence = require('run-sequence');
var karma = require('karma');
var karmaParseConfig = require('karma/lib/config').parseConfig;
var coveralls = require('gulp-coveralls');
var debug = require('gulp-debug');

var files = [];

gulp.task('build-tests', function () {
    compilerOptions.outFile = null;
    compilerOptions.outDir = ".";

    return gulp.src(paths.testSource + "**/*Test.ts")
        .pipe(debug())
        .pipe(ts(compilerOptions))
        .pipe(debug())
        .pipe(gulp.dest("."));
});

function writeTestMain(files) {
    var template = 'var tests = [FILES]; require(tests);';

    var relatives = files.map(function(f) {
        return "./" + path.relative(paths.testOutput, f);
    });

    var list = '"' + relatives.join('", "') + '"';
    template = template.replace("FILES", list);

    fs.writeFileSync("test/TestMain.js", template);
}

function generateTestMain(file, enc, cb) {
    files.push(file.path.replace(".js", ""));

    // make sure the file goes through the next gulp plugin
    this.push(file);
    // tell the stream engine that we are done with this file
    cb();
}

gulp.task('generate-testmain', function () {
    return gulp.src(paths.testSource + "**/*Test.js")
        .pipe(through.obj(generateTestMain))
        .on("end", function () {
            writeTestMain(files);
        });
});

gulp.task('execute-tests', function (callback) {
    var p = path.resolve("./karma.conf.js");
    var config = karmaParseConfig(p, {});

    var server = new karma.Server(config, function(exitCode) {
        console.log('Karma has exited with ' + exitCode);
        callback();
        process.exit(exitCode);
    });

    server.start();
});

gulp.task('test', function (callback) {
    return runSequence("build", "clean-tests", "build-tests", "generate-testmain", "execute-tests", callback)
});

gulp.task('coveralls', function () {
    return gulp.src('build/**/lcov.info')
        .pipe(coveralls());
});
