// middleware/organizerMiddleware.js
const organizerAuth = (req, res, next) => {
  const organizerLoggedIn = req.headers['organizer-auth'] === 'true' || 
                          req.cookies.organizerLoggedIn === 'true';
  
  if (!organizerLoggedIn) {
    return res.status(401).json({ 
      success: false,
      message: 'Organizer authentication required' 
    });
  }
  
  next();
};

module.exports = organizerAuth;