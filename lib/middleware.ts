///<reference path="../node_modules/blink/blink.d.ts"/>
///<reference path="../node_modules/blink/bower_components/dt-vinyl/vinyl.d.ts"/>
import b = require('blink');
import fs = require('fs');
import path = require('path');
var through = require('through2');
import url = require('url');
var vfs = require('vinyl-fs');


function middleware(source, options?: {
	dest?: string;
	compiler?: b.ConfigurationOptions;
}) {
	options = options || {};

	if (!source) {
		throw new Error('blink.middleware() requires `source` directory');
	}

	if (options.dest) {
		if (!fs.existsSync(options.dest)) {
			fs.mkdirSync(options.dest);
		}
	}

	return (req, res, next) => {

		switch (req.method) {
			case 'GET':
			case 'HEAD':
				break;
			default:
				next();
				return;
		}

		var filepath = url.parse(req.url).pathname;

		if (path.extname(filepath) !== '.css') {
			next();
			return;
		}

		filepath = path.join(source, path.basename(filepath, '.css') + '.js');

		vfs.src(filepath)
			.pipe(b.compile(options.compiler))
			.on('error', (err: Error) => {
				next(err);
				return;
			})
			.pipe((() => {
				return through.obj(function(file, enc, done) {
					res.type('css');
					res.send(file.contents);
					this.push(file);
					done();
				});
			})())
			.on('end', () => {
				next();
			});
	}
}

export = middleware;
