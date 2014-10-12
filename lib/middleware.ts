///<reference path="../node_modules/blink/blink.d.ts"/>
import blink = require('blink');
import fs = require('fs');
import path = require('path');
var through = require('through2');
import url = require('url');
var vfs = require('vinyl-fs');

// ReSharper disable once UnusedLocals
function middleware(source, options?: {
	dest?: string;
	compiler?: blink.ConfigurationOptions;
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

	return (request, response, doneWithRequest) => {

		switch (request.method) {
			case 'GET':
			case 'HEAD':
				break;
			default:
				doneWithRequest();
				return;
		}

		var filepath = url.parse(request.url).pathname;

		if (path.extname(filepath) !== '.css') {
			doneWithRequest();
			return;
		}

		filepath = path.join(source, path.basename(filepath, '.css') + '.js');

		vfs.src(filepath)
			.pipe(blink(options.compiler))
			.on('error', (err: Error) => {
				doneWithRequest(err);
				return;
			})
			.pipe((() => {
				return through.obj(function(file, enc, doneWithFile) {
					response.type('css');
					response.send(file.contents.toString(enc));
					this.push(file);
					doneWithFile();
				});
			})())
			.on('end', () => {
				doneWithRequest();
			});
	};
}

export = middleware;
