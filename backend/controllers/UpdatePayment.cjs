const Payment = require("../models/paymentModel.cjs");

exports.getAllPayments = async (req, res) => {
  try {
    const userId = req.user.id; 
    const payments = await Payment.findAll({ where: { userId: userId } });
    console.log('All payments:', payments);
    res.json(payments);
  } catch (error) {
    console.log('Error fetching all payments:', error);
    res.json({ message: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    console.log('Payment by ID:', payment);
    res.json(payment);
  } catch (error) {
    console.log('Error fetching payment by ID:', error);
    res.json({ message: error.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    await Payment.create(req.body);
    console.log('Payment created');
    res.json({
      message: "Payment Created",
    });
  } catch (error) {
    console.log('Error creating payment:', error);
    res.json({ message: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { status_flag } = req.body;
    const paymentId = req.params.id;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    payment.status_flag = status_flag;
    await payment.save();

    console.log('Payment updated:', payment);
    res.json({ message: "Payment Updated" });
  } catch (error) {
    console.log('Error updating payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};






exports.deletePayment = async (req, res) => {
  try {
    await Payment.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log('Payment deleted');
    res.json({ message: "Payment Deleted" });
  } catch (error) {
    console.log('Error deleting payment:', error);
    res.json({ message: error.message });
  }
};
