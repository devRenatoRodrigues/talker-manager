const { randomBytes } = require('crypto');

function tokenGenerate() {
  return randomBytes(8).toString('hex');
}

module.exports = tokenGenerate;