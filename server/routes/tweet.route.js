const express = require('express');
const twitterCtrl = require('../controllers/twitter.controller');
const router = express.Router();
const ComplaintTweets = require('../models/twitter.model')
const nlpCtrl = require('../controllers/npl.controller')

router.get('/showtweets', twitterCtrl.showtweets);
router.get('/fetch_complaints', twitterCtrl.fetchingComplaints);
router.get('/resolved_complaints', twitterCtrl.resolvedComplaints);
router.get('/all_complaints', twitterCtrl.allComplaints);

router.post('/complaint', twitterCtrl.complaint);


router.put('/process_complaint', twitterCtrl.process);
router.put('/resolve_complaint', twitterCtrl.resolve);
router.put('/reactive', twitterCtrl.reactive);


module.exports = router;

