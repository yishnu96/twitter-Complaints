const ComplaintTweets = require('../models/twitter.model')
const Twitter = require('twit');
const manager = require('./npl.controller');
const env = require('../config/twitterEnv');

const clint = new Twitter(env);



//******  Automatioc Fetch Complaints  ******//
module.exports.allComplaints = function (req, res) {
  clint.get('search/tweets', { q: 'to:@airtelindia', count: 10, result_type: 'recent' }, async (err, data, response) => {
    if (err) {
      console.error('Error in fetching tweets');
      return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
    }
    await manager.train();
    manager.save();
    let tweetArray = data.statuses;
    let answerArray = [];
    tweetArray.forEach(element => {
      manager.process('en', element.text)
        .then(resp => {
          answerArray.push({ _id: element.id, message: element.text, intent: resp.intent, answer: resp.answer });
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
        })
        .finally(() => {
          // return res.status(200).json({ message: "All Answers", status: 200, data: answerArray, error: false });
          answerArray.forEach(element => {
            ComplaintTweets.find({ tweetId: element._id }, function (err, result) {
              if (err) {
                console.error('Error in fetching complaints tweets');
                return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
              }
              if (!result) {
                console.log(element)
                //Saving to database
                let newTweet = new ComplaintTweets({
                  text: element.text, is_resolved: false, is_processing: false,
                  user: element.user, tweetId: element._id
                });
                newTweet
                  .save()
                  .then((_newTweet) => {
                    // Sending responce to twitter
                    // clint.post(`statuses/update`,'@'+ element.screen_name + response.answer);
                    return res.status(200).json({ message: "Tweet Saved After Fetch", status: 200, data: _newTweet, error: false });
                  })
                  .catch(err => {
                    console.log(err);
                    return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
                  })
              } else {
                return;
              }
            })
          })
        });
    })
  });
}


// ************ Display tweets **********//
module.exports.showtweets = function (req, res) {
  clint.get('search/tweets', { q: 'to:@airtelindia', count: 10, result_type: 'recent' }, function (err, data, response) {
    if (err) {
      console.error('Error in fetching tweets');
      return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
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
module.exports.fetchingComplaints = function (req, res) {
  ComplaintTweets.find({ is_resolved: false, is_processing: false }, function (err, result) {
    if (err) {
      console.error('Error in fetching complaints tweets');
      return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
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
module.exports.resolvedComplaints = function (req, res) {
  ComplaintTweets.find({ is_resolved: true, is_processing: true }, function (err, result) {
    if (err) {
      console.error('Error in fetching complaints tweets');
      return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
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
module.exports.complaint = function (req, res) {
  const user = req.body.user;
  const text = req.body.text;

  // Delete this function
  (async () => {
    await manager.train();
    manager.save();
    const response = await manager.process('en', req.body.text);
    console.log('Training Data \n ------------------', response);
  })();   //Delete this function


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
        return;
      })
    console.log(response);
  }
  // if (user || text) {
  //   let newTweet = new ComplaintTweets({ text: text, is_resolved: false, is_processing: false, user: user });
  //   newTweet
  //     .save()
  //     .then((_newTweet) => {
  //       console.log(_newTweet);
  //       return res.status(200).json({ message: "Tweet Saved After Fetch", status: 200, data: _newTweet, error: false });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
  //     })
  // } else {
  //   return res.status(400).json({ message: "Data required", status: 400, data: null, error: true });
  // }
}

/*****  The complaint is on Process  ***** */
module.exports.process = async function (req, res) {
  const user = req.body.user
  if (user) {
    ComplaintTweets.findOne({ user: user, is_resolved: false, is_processing: false })
      .then(_complaintTweet => {
        if (_complaintTweet) {
          _complaintTweet.is_processing = true;
          _complaintTweet.save()
            .then(data => {
              // clint.post(`statuses/update`,'@'+ data.user.name+' your complaint is in process');
              return res.status(200).json({ message: "Tweet is now processing", status: 200, data: data, error: false });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true })
            })
        } else {
          return res.status(200).json({ message: "Tweet Complaint Not Found / Or already Processed", status: 200, data: null, error: false })
        }
      })
  } else {
    return res.status(400).json({ message: "Data required", status: 400, data: null, error: true });
  }
}

/********  Complaint Solved           ***************** */
module.exports.resolve = async function (req, res) {
  const user = req.body.user
  if (user) {
    ComplaintTweets.findOne({ user: user, is_resolved: false, is_processing: true })
      .then(_resolveTweet => {
        if (_resolveTweet) {
          _resolveTweet.is_resolved = true;
          _resolveTweet.save()
            .then(data => {
              // clint.post(`statuses/update`,'@' + data.user.name + ' your your complaint has been resolved');

              return res.status(200).json({ message: "Tweet is resolved", status: 200, data: data, error: false });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true })
            });
        } else {
          return res.status(200).json({ message: "Tweet Complaint Not Found / Or already Resolved", status: 200, data: null, error: false });
        }
      })
  } else {
    return res.status(400).json({ message: "Data required", status: 400, data: null, error: true });
  }
}

/**** ****  If User Wants to re-active complaint ** */
module.exports.reactive = function (req, res) {
  const user = req.body.user
  if (user) {
    ComplaintTweets.findOne({ user: user, is_resolved: true, is_processing: true })
      .then(_reactive => {
        if (_reactive) {
          _reactive.is_resolved = false;
          _reactive.save()
            .then(data => {
              // clint.post(`statuses/update`,'@'+ data.user.name + ' your your complaint has been resolved');
              return res.status(200).json({ message: "Tweet is reactive", status: 200, data: data, error: false });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true })
            });
        } else {
          return res.status(200).json({ message: "Tweet Complaint Not Found / Or already Resolved", status: 200, data: null, error: false });
        }
      })
  } else {
    return res.status(400).json({ message: "Data required", status: 400, data: null, error: true });
  }
}

module.exports.trackTweets = function (req, res) {
  const user = req.body.user;
  if (user) {
    ComplantTweets.findOne({ user: user })
      .then(_tweets => {
        if (_tweets.length) {
          return res.status(200).json({ message: "All Tweets of User", status: 200, data: _tweets, error: false });
        } else {
          return res.status(200).json({ message: "No Tweet found for user", status: 200, data: _tweets, error: false });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", status: 500, data: null, error: true });
      })
  }
}
