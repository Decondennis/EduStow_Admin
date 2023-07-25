const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.cjs');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  try {
    const userResponse = await axios.get('http://localhost:5000/users');
    const usersData = userResponse.data;

    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      if (req.body.password && user.password) {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
          try {
            const newToken = jwt.sign(
              { userId: user.id, email: user.email, role: user.role },
              JWT_SECRET_KEY,
              { algorithm: 'HS256' }
            );

            console.log(newToken);
            
            res.status(200).json({ token: newToken, role: user.role });
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
