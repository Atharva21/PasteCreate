const path = require('path');

const express = require('express');

const accountController = require('../controllers/account');

const router = express.Router();

router.post('/sign-up', accountController.signUp);
router.post('/sign-in', accountController.signIn);

module.exports = router;