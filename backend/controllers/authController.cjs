const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.cjs');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    console.log('User role:', user.role);
    if (user) {
      if (password && user.password) {
        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Generate a new token using the secret key
          try {
            const token = jwt.sign(
              { userId: user.id, email: user.email, role: user.role },
              JWT_SECRET_KEY,
              { algorithm: 'HS256' }
            );

            res.status(200).json({ message: 'Login successful', token, role: user.role });
          } catch (error) {
            console.error('JWT token generation error:', error);
            
            res.status(500).json({ message: 'Internal server error' });
          }
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = login;



