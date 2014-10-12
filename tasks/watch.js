var gulp = require('gulp');

function watch() {
	gulp.watch([
		'lib/**/*.ts',
		'test/**/*.ts'
	], ['test:onScriptsChanged']);
	gulp.watch([
		'test/fixtures/*',
		'test/expected/*'
	], require('./test'));
}

module.exports = watch;
