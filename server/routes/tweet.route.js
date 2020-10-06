const express = require('express');
const twitterCtrl = require('../controllers/twitter.controller');
const router = express.Router();

router.get('/showtweets', twitterCtrl.showtweets);
router.post('/complaint', twitterCtrl.complaint);
router.put('/process_complaint', twitterCtrl.process);
router.put('/resolve_complaint', twitterCtrl.resolve);

module.exports = router;

