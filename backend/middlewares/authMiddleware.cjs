const jwt = require('jsonwebtoken');
const User = require('../models/userModel.cjs');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decoding token
    jwt.verify(token, JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ message: 'Invalid token' });
      }

      const userId = decodedToken.userId;
      const email = decodedToken.email;
      const role = decodedToken.role; // Retrieve the role from the decoded token
      console.log('Decoded role:', role);

      if (!userId || !email || !role) {
        console.error('User ID, email, or role not found in decoded token');
        return res.status(401).json({ message: 'Invalid token' });
      }

      try {
        // Find the user based on the email
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        // Check if the user's role is either 'admin' or 'user'
        if (role !== 'admin' && role !== 'user') {
          return res.status(403).json({ message: 'Access denied. Invalid role' });
        }
        console.log('Authorization check - role:', role);

        req.user = user; // Assign the user object to req.user

        next();
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
