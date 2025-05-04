const { verifyToken } = require('../services/auth.service');

// Middleware to authenticate token
const authenticate = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }
  
  // Extract token
  const token = authHeader.split(' ')[1];
  
  // Verify token
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  
  // Add user data to request
  req.user = decoded;
  next();
};

module.exports = { authenticate }; 