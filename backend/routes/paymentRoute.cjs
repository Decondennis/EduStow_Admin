const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const UpdatePaymentController = require('../controllers/UpdatePayment.cjs');

router.get('/', authMiddleware, UpdatePaymentController.getAllPayments);
router.get('/:id', UpdatePaymentController.getPaymentById);
router.post('/', UpdatePaymentController.createPayment);
router.patch('/:id', UpdatePaymentController.updatePayment);
router.delete('/:id', UpdatePaymentController.deletePayment);

module.exports = router;
