const User = require('../models/userModel.cjs');
const Payment = require('../models/paymentModel.cjs');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ ...req.body, password: hashedPassword });
    res.json({ message: 'Account created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    const [updatedRowCount] = await User.update(updatedUser, {
      where: { id },
    });

    if (updatedRowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Account updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { status, email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.json({ message: 'User status updated' });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserStatusByEmail = async (req, res) => {
  try {
    const { email, status } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.json({ message: 'User status updated' });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRowCount = await User.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not provided' });
    }

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Payment,
          as: 'payments',
          where: { userId: userId },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const payments = user.payments || [];

    res.status(200).json({ user, payments });
  } catch (error) {
    console.error('Get user data error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

