const express = require('express');
const twitterCtrl = require('../controllers/twitter.controller');
const router = express.Router();
const ComplaintTweets = require('../models/twitter.model')

router.get('/showtweets', twitterCtrl.showtweets);
router.get('/fetch_complaints', twitterCtrl.fetchingComplaints);
router.get('/resolved_complaints', twitterCtrl.resolvedComplaints);

router.post('/complaint', twitterCtrl.complaint);


router.put('/process_complaint', twitterCtrl.process);
router.put('/resolve_complaint', twitterCtrl.resolve);


module.exports = router;

