const express = require('express');
const { registerUser, loginUser, getUser } = require('../Controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUser);

module.exports = router;
