///<reference path='../common.ts'/>
import middleware = require('../../../lib/middleware');
var express = require('express');
import fs = require('fs');
import path = require('path');
var request = require('supertest');


var artifacts = path.resolve('js/test/artifacts');

describe('blink middleware', () => {

	describe('simple', () => {

		var app;
		before(() => {
			app = express();
			app.use(middleware(path.resolve('test/fixtures'), {
				dest: artifacts
			}));
			app.use(express.static(artifacts));
		});

		it('processes simple blink files', done => {
			fs.readFile('test/expected/foo.css', (err, expected) => {
				if (err) {
					throw err;
				}
				request(app)
					.get('/foo.css')
					.expect(200)
					.expect(expected.toString(), done);
			});
		});

	});

});
