///<reference path="../node_modules/blink/blink.d.ts"/>
import b = require('blink');


function blinkCompiler(options: b.IConfigurationOptions) {
	options = options || {};

	function blink(req, res, next) {
		//console.log('req:', req);
		//console.log('res:', res);
		//console.log('next:', next);
		next();
	}

	return blink;
}

export = blinkCompiler;
