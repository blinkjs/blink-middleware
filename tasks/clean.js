var del = require('del');

function clean(done) {
  del(['js', 'd.ts'], done);
}

module.exports = clean;
