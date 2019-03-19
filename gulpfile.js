const { series, watch, src } = require('gulp');
var cache = require('gulp-cached');
const exec = require('gulp-exec');
function defaultTask(cb) {
    // place code for your default task here

    return cb();
}

function takeWatch() {
    let watcher = watch('*', { ignoreInitial: true, events: 'change' }, defaultTask);
    watcher.on('change', function(evt) {
        var reportOptions = {
            err: true, // default = true, false means don't write err
            stderr: true, // default = true, false means don't write stderr
            stdout: true // default = true, false means don't write stdout
        };
        return (
            src(evt)
            // .pipe(cache('eslint')) //<-
                .pipe(exec('eslint ' + evt + ' --fix  && prettier ' + evt + ' --write'))
                .pipe(exec.reporter(reportOptions))
        );
    });
}


exports.default = series(takeWatch);
