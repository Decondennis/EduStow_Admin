const crypto = require('crypto');

const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString('hex');
  return secret;
};

module.exports = generateSecretKey;
