const ComplaintTweets = require('../models/twitter.model')
const Twitter = require('twit');

const clint = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: 'OKIkoZr0ywVN3btEyIYyOjqeD',
  consumer_secret: '47AUbZdTM6lOiZsd7a1OFM193qD2n2TQ9020v452zpJNP9rdbX',
  access_token: '2311562004-7SK3Tb9BS4QFFNxFXaymTBBF8VSblFgI3j8WGij',
  access_token_secret: '094Qvw7jD3oZ8Hhy6Da3pHlapfyQfg9EpmvWsTHmehWDT',
});



// ************ Display tweets **********//
module.exports.showtweets = function(req, res){
  clint.get('search/tweets', {
    q: 'to:@airtelindia',
    count: 10,
    result_type: 'recent'
  }, function (err, data, response) {
    if (err) {
      console.error('Error in fetching tweets');
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
        data: null,
        error: true
      });
    }

    return res.status(200).json({
      message: "All the tweets",
      status: 200,
      data: data.statuses,
      error: false
    })
  })
}


//****** Processing or just complaints Display ****** */
module.exports.fetchingComplaints = function (req, res){
  ComplaintTweets.find({ is_resolved: false, is_processing: false }, function (err, result){
    if (err){
      console.error('Error in fetching complaints tweets');
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
        data: null,
        error: true
      });
    }
    return res.status(200).json({
      message: "Tweet Saved After Fetch",
      status: 200,
      data: result,
      error: false
    });
  })
}


/*************** Resolved Complaints ************** */
module.exports.resolvedComplaints = function (req, res){
  ComplaintTweets.find({ is_resolved: true, is_processing: true }, function (err, result){
    if (err){
      console.error('Error in fetching complaints tweets');
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
        data: null,
        error: true
      });
    }
    return res.status(200).json({
      message: "Tweet Saved After Fetch",
      status: 200,
      data: result,
      error: false
    });
  })
}


/***   Sending Complaints to database   ****/
module.exports.complaint = function (req, res){
  // console.log("backend" + req.body)
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
}


module.exports.process = function (req, res){

  const user = req.body.user
  if (user) {
    ComplaintTweets.find({
        user : user,
        is_resolved: false,
        is_processing: false
      })
      .then(_complaintTweet => {
          if (_complaintTweet) {
            _complaintTweet.is_processing = true;
            _complaintTweet.save()
              .then(data => {
                // clint.post(`statuses/update`,'@'+ data.user.name+' your complaint is in process');
                return res.status(200).json({
                  message: "Tweet is now processing",
                  status: 200,
                  data: data,
                  error: false
                });
              })
              .catch()
          } else {
            return res.status(200).json({
              message: "Tweet Complaint Not Found / Or already Processed",
              status: 200,
              data: null,
              error: false
            });
          }
        })
  }else{
    return res.status(400).json({
      message: "Data required",
      status: 400,
      data: null,
      error: true
    });
  }
}

module.exports.resolve = function (req, res) {

  if (req.params.id) {
    const id = req.params.id;
    ComplaintTweets.find({
        _id: id,
        is_resolved: false,
        is_processing: true
      })
      .then(_resolveTweet => {
          if (_resolveTweet) {
            _resolveTweet.is_resolved = true;
            _resolveTweet.save()
              .then(data => {
                // clint.post(`statuses/update`,'@'+ data.user.name+' your your complaint has been resolved');
                return res.status(200).json({
                  message: "Tweet is resolved",
                  status: 200,
                  data: data,
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
                })
              });
          } else {
            return res.status(200).json({
              message: "Tweet Complaint Not Found / Or already Resolved",
              status: 200,
              data: null,
              error: false
            });
          }
        })
  }else{
    return res.status(400).json({
      message: "Data required",
      status: 400,
      data: null,
      error: true
    });
  }
}
