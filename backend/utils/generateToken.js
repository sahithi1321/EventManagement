const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

const generateToken = (id) => {
  if (!id) {
    throw new Error('User ID is required to generate token');
  }
  
  return jwt.sign({ id }, secret, {
    expiresIn
  });
};

module.exports = generateToken;