const path = require('path');

const express = require('express');

const pasteController = require('../controllers/paste');
const auth = require("../utils/auth");

const router = express.Router();

router.get('/my-pastes', auth.authenticateRequest, pasteController.getMyPastes);
router.post('/save-paste', auth.authenticateRequest, pasteController.storePaste);
router.post('/delete-paste', auth.authenticateRequest, pasteController.deletePaste);
router.get('/:pasteUrl', auth.softAuthenticate, pasteController.getPasteFromUrl);

module.exports = router;
