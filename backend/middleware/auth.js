const { protect, admin } = require('./authMiddleware');

module.exports.protect = protect;
module.exports.admin = admin;