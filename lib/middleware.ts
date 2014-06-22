///<reference path="../node_modules/blink/blink.d.ts"/>
import b = require('blink');
import fs = require('fs');
import path = require('path');
import url = require('url');


function middleware(source, options?: {
	dest?: string;
	compiler?: b.IConfigurationOptions;
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

	function blink(req, res, next) {

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

		b.compile(options.compiler, [filepath], (err, config, file) => {
			if (err) {
				next(err);
				return;
			}
			var dest = file.dest;
			if (options.dest) {
				dest = path.join(options.dest, path.basename(file.dest));
			}
			fs.writeFile(dest, file.contents, err2 => {
				next(err2);
			});
		});
	}

	return blink;
}

export = middleware;
