const express = require('express');
const { login, callback, connectWallet } = require('../controllers/authController');

const router = express.Router();

router.get('/login', login);
router.get('/callback', callback);
router.post('/connectWallet', connectWallet);

module.exports = router;
