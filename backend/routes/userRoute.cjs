const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.cjs');
const authMiddleware = require('../middlewares/authMiddleware.cjs');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/data', authMiddleware, UserController.getUserData);
router.put('/updateStatus', UserController.updateUserStatus);
router.patch('/updateUserStatus', UserController.updateUserStatus);
router.put('/updateUserStatusByEmail', UserController.updateUserStatusByEmail);


module.exports = router;
