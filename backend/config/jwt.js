const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      isAdmin: user.isAdmin // Include admin status in token
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const verifyToken = (token) => {
  console.log('Verifying JWT token');
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };