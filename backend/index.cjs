require('dotenv').config();
const express = require('express');
const db = require('./config/database.cjs');
const contactRoutes = require('./routes/index.cjs');
const userRoutes = require('./routes/userRoute.cjs');
const newsletterRoutes = require('./routes/newsletterRoute.cjs');
const paymentRoutes = require('./routes/paymentRoute.cjs');
const fetchPaymentRoute = require('./routes/fetchPaymentRoute.cjs');
const loginRoutes = require('./routes/loginRoute.cjs');
const callbackRoute = require('./routes/callbackRoute.cjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/authMiddleware.cjs');
const User = require('./models/userModel.cjs');
const Payment = require('./models/paymentModel.cjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

(async () => {
  try {
    await db.authenticate();
    console.log('Database connected...');
  } catch (error) {
    console.error('Connection error:', error);
  }
})();

app.use(cors());
app.use(express.json());

app.use('/contacts', contactRoutes);
app.use('/users', userRoutes);
app.use('/newsletter', newsletterRoutes);
app.use('/payment', paymentRoutes);
app.use('/payment', fetchPaymentRoute);
app.use('/login', loginRoutes);
app.use('/updateUserStatusByEmail', userRoutes);
app.use(callbackRoute);

app.use(cookieParser());
app.use(session({
  secret: JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.get('/userData', async (req, res) => {
  console.log(req.headers);
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    const userId = decodedToken.userId;

    const userData = await User.findOne({
      where: {
        id: userId
      }
    });

    if (userData) {
      const paymentHistory = await Payment.findAll({
        where: {
          userId: userData.id
        }
      });

      const userDataWithPaymentHistory = {
        user: userData,
        payments: paymentHistory
      };

      res.json(userDataWithPaymentHistory);
    } else {
      res.status(404).json({ error: 'User data not found' });
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const { Sequelize } = require('sequelize');
console.log(`Sequelize version: ${Sequelize.version}`);

app.listen(5000, () => console.log('Server running at port 5000'));
