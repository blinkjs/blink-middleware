var gulp = require('gulp');
var gutil = require('gulp-util');

var clean = require('gulp-clean');
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

gulp.task('clean', function() {
	return gulp.src(['js', 'd.ts', 'dist'], { read: false })
		.pipe(clean());
});

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
