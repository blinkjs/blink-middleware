var gulp = require('gulp');
var gutil = require('gulp-util');

var del = require('del');
var fs = require('fs');
var tsc = require('gulp-tsc');
var mocha = require('gulp-mocha');


gulp.task('clean', function(done) {
  del(['js', 'd.ts', 'dist'], done);
});

gulp.task('build', ['ts']);

gulp.task('ts', ['clean', 'ts']);

gulp.task('ts', function() {
	return gulp.src('test/spec/**/*.spec.ts')
		.pipe(tsc({ target: 'es5' }))
		.pipe(gulp.dest('js'));
});

gulp.task('d.ts', function() {
	return gulp.src('lib/**/*.ts')
		.pipe(tsc({
			target: 'es5',
			declaration: true
		}))
		.pipe(gulp.dest('d.ts'));
});

gulp.task('test', ['ts'], function() {
	return gulp.src('js/test/spec/**/*.spec.js', { read: false })
		.pipe(mocha({
			reporter: 'spec',
			clearRequireCache: true
		}));
});

gulp.task('watch', ['test'], function() {
	gulp.watch([
		'lib/**/*.ts',
		'test/fixtures/*.ts',
		'test/spec/**/*.spec.ts'
	], ['test']);
});

gulp.task('default', ['watch']);
