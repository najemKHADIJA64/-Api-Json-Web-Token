const express = require('express');
const router = express.Router();

const {register, login, logout} = require('../controller/AuthController');

router.post('/registre', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;