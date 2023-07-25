const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/Newsletter.cjs');
// const authMiddleware = require('../middlewares/authMiddleware.cjs');

router.get('/', newsletterController.getAllNewsletter);
router.get('/:id', newsletterController.getNewsletterById);
router.post('/', newsletterController.createNewsletter);
router.patch('/:id', newsletterController.updateNewsletter);
router.delete('/:id', newsletterController.deleteNewsletter);

module.exports = router;
