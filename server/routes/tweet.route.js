const express = require('express');
const twitterCtrl = require('../controllers/twitter.controller');
const router = express.Router();
const ComplaintTweets = require('../models/twitter.model')

router.get('/showtweets', twitterCtrl.showtweets);
router.post('/complaint',async (req, res) =>{
  console.log("backend" + req.body)
  const user = req.body.user;
  const text = req.body.text;
  if (user || text) {
    let newTweet = new ComplaintTweets({
      text: text,
      is_resolved: false,
      is_processing: false,
      user: user
    });
    newTweet
      .save()
      .then((_newTweet) => {
        console.log(_newTweet);
        return res.status(200).json({
          message: "Tweet Saved After Fetch",
          status: 200,
          data: _newTweet,
          error: false
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          message: "Internal Server Error",
          status: 500,
          data: null,
          error: true
        });
      })
  } else {

    return res.status(400).json({
      message: "Data required",
      status: 400,
      data: null,
      error: true
    });
  }
});
router.put('/process_complaint', twitterCtrl.process);
router.put('/resolve_complaint', twitterCtrl.resolve);

module.exports = router;

