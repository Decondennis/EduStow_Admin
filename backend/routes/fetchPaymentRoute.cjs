const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const Payment = require('../models/paymentModel.cjs');


router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const payments = await Payment.findAll({ where: { userId } });
    res.json(payments);
    console.log(payments);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ error: 'Failed to fetch payment data' });
  }
});

module.exports = router;

