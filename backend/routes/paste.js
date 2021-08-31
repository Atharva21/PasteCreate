const path = require('path');

const express = require('express');

const pasteController = require('../controllers/paste');
const auth = require("../utils/auth");

const router = express.Router();

router.use(auth.authenticateRequest);

router.get('/my-pastes', pasteController.getMyPastes);
router.post('/save-paste', pasteController.storePaste);
router.post('/delete-paste', pasteController.deletePaste);
router.get('/:pasteUrl', pasteController.getPasteFromUrl);

module.exports = router;
