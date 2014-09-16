var gulp = require('gulp');
var gutil = require('gulp-util');

var del = require('del');
var fs = require('fs');
var tsc = require('gulp-tsc');
var mocha = require('gulp-mocha');

var paths = {
	lib: {
		ts: ['lib/**/*.ts'],
		js: ['lib/**/*.js']
	},
	test: {
		fixtures: {
			ts: ['test/fixtures/*.ts'],
			js: ['js/test/fixtures/*.js'],
			css: ['js/test/fixtures/*.css']
		},
		spec: {
			ts: ['test/spec/**/*.spec.ts'],
			js: ['js/test/spec/**/*.spec.js']
		}
	}
};

gulp.task('clean', function(done) {
  del(['js', 'd.ts', 'dist'], done);
});

gulp.task('build', ['ts']);

gulp.task('ts', ['clean', 'ts']);

gulp.task('ts', function() {
	return gulp.src(paths.test.spec.ts)
		.pipe(tsc({ target: 'es5' }))
		.pipe(gulp.dest('js'));
});

gulp.task('d.ts', function() {
	return gulp.src(paths.lib.ts)
		.pipe(tsc({
			target: 'es5',
			declaration: true
		}))
		.pipe(gulp.dest('d.ts'));
});

gulp.task('test', ['ts'], function() {
	return gulp.src(paths.test.spec.js, { read: false })
		.pipe(mocha({
			reporter: 'spec',
			clearRequireCache: true
		}));
});

gulp.task('watch', ['test'], function() {
	gulp.watch([
		paths.lib.ts,
		paths.test.fixtures.ts,
		paths.test.spec.ts
	], ['test']);
});

gulp.task('default', ['watch']);
