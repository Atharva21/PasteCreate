const path = require('path');

const express = require('express');

const pasteController = require('../controllers/paste');

const router = express.Router();

router.post('/my-pastes', pasteController.getMyPastes);

module.exports = router;
