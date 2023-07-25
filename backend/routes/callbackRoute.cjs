const express = require('express');
const Payment = require('../models/paymentModel.cjs'); 

const router = express.Router();

router.post('/callback', (req, res) => {
  const { paymentId } = req.body;

  Payment.findOne({ _id: paymentId }, (err, payment) => {
    if (err) {
      console.error('Error retrieving payment:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!payment) {
      
      return res.status(404).json({ error: 'Payment not found' });
    }

    payment.status_flag = 1;

    payment.save((err, updatedPayment) => {
      if (err) {
        console.error('Error updating payment:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.cookie('mp_eeb0103404a2857dec4c324d2f2108c5_mixpanel', 'cookie-value', {
        sameSite: 'None',
      });

      return res.status(200).json({ message: 'Payment updated successfully' });
    });
  });
});

module.exports = router;
