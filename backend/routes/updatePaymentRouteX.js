// const express = require('express');
// const authMiddleware = require('../middlewares/authMiddleware');
// const Payment = require('../models/paymentModel.cjs');

// const app = express();

// // ...

// // PUT route to update payment status
// app.put('/payment/:id', authMiddleware, async (req, res) => {
//   try {
//     const paymentId = req.params.id;
//     const { status_flag } = req.body;

//     const payment = await Payment.findByPk(paymentId);
//     if (!payment) {
//       return res.status(404).json({ error: 'Payment not found' });
//     }

//     payment.status_flag = status_flag;
//     await payment.save();

//     return res.status(200).json({ payment });
//   } catch (error) {
//     console.error('Error updating payment status:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // ...

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
