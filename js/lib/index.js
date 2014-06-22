function blinkCompiler(options) {
    options = options || {};

    function blink(req, res, next) {
        //console.log('req:', req);
        //console.log('res:', res);
        //console.log('next:', next);
        next();
    }

    return blink;
}

module.exports = blinkCompiler;
