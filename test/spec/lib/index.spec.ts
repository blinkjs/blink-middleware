import http = require('http');
var request = require('supertest');

import sinonChai = require('../../sinon-chai');
var expect = sinonChai.expect;
import blink = require('../../../lib/index');


describe('blink()', () => {

	it('does nothing', done => {
		var server = createServer(null, (req, res) => {
			res.end('foo');
		});
		request(server)
			.get('/')
			.expect(200, 'foo', done);
	});

});

function createServer(options?, before?, after?) {
	var _blink = blink(options);

	return http.createServer((req, res) => {
		_blink(req, res, err => {
			if (err) {
				res.statusCode = err.status || 500;
				res.end(err.message + ' after ' + err.timeout + 'ms');
				return;
			}

			if (before) {
				before(req, res);
			}

			if (after) {
				setTimeout(() => {
					after(req, res);
				}, 200);
			}
		});
	});
}
