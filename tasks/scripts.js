var eventStream = require('event-stream');
var gulp = require('gulp');
var ts = require('gulp-typescript');

function scripts() {
	var result = gulp.src([
			'bower_components/**/*.d.ts',
			'node_modules/blink/blink.d.ts',
			'lib/**/*.ts',
			'test/spec/**/*.ts'
		], {
			base: '.'
		})
		.pipe(ts(project));

	return eventStream.merge(
		result.dts.pipe(gulp.dest('dist/d.ts')),
		result.js.pipe(gulp.dest('js'))
	);
}

var project = ts.createProject({
	target: 'es5',
	module: 'commonjs',
	declarationFiles: true,
	noExternalResolve: true
});

module.exports = scripts;
