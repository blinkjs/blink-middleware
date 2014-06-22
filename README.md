<img src="https://github.com/blinkjs/blink/blob/master/artwork/blink_256_nobg.png?raw=true" width="256" height="256" alt="blink" align="right">

#blink-middleware

> [Blink](https://github.com/blinkjs/blink) middleware for Express.

[![Build Status][]](http://travis-ci.org/blinkjs/blink-middleware)
[![Dependency Status][]](https://gemnasium.com/blinkjs/blink-middleware)
[![NPM version][]](http://badge.fury.io/js/blink-middleware)
[![Views][]](https://sourcegraph.com/github.com/blinkjs/blink-middleware)

[![NPM](https://nodei.co/npm/blink-middleware.png?downloads=true)](https://nodei.co/npm/blink-middleware/)


## Installation

```sh
$ npm install --save blink-middleware
```


## Usage

```js
blink(source, [[options](#options)]);
```


### Express

```js
var blink = require('blink-middleware');
var express = require('express');

var app = express();
app.use(blink(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
```


### TypeScript

See the TypeScript definition file at
[blink-middleware.d.ts](/blinkjs/blink-middleware/blob/master/blink-middleware.d.ts).

```ts
///<reference path="./node_modules/blink-middleware/blink-middleware.d.ts"/>
import blink = require('blink-middleware');
var express = require('express');

var app = express();
app.use(blink(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
```


### Options

| Option | Description | Default |
| ------ | ----------- | ------- |
| compiler | See [blink.IConfigurationOptions](https://github.com/blinkjs/blink/blob/master/lib/interfaces/IConfigurationOptions.ts) | `{}` |
| dest   | Destination directory to output the compile `.css` files. | Same directory as blink source files. |


## License

Released under the MIT license.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/blinkjs/blink-middleware/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


[Build Status]: https://secure.travis-ci.org/blinkjs/blink-middleware.png?branch=master
[Dependency Status]: https://gemnasium.com/blinkjs/blink-middleware.png
[NPM version]: https://badge.fury.io/js/blink-middleware.png
[Views]: https://sourcegraph.com/api/repos/github.com/blinkjs/blink-middleware/counters/views-24h.png
