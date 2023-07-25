require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.cjs');
const router = express.Router();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });

    console.log('Generated token:', token);

    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    console.log('Decoded token:', decodedToken);

    const email = decodedToken.userId;

    console.log('Email:', email);

    // Check the role of the user
    if (user.role !== 'admin' && user.role !== 'user') {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    
    res.json({ token, role: user.role, email: user.email });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
