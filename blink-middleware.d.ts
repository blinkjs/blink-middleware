///<reference path="./node_modules/blink/blink.d.ts"/>

declare module "blink-middleware" {
	import blink = require('blink');
	function middleware(source: any, options?: {
		dest?: string;
		compiler?: blink.IConfigurationOptions;
	}): (req: any, res: any, next: any) => void;
}
