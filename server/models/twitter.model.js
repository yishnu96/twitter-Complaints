const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    text: {
        type: String
    },
    complaintId: {
        type: String, default:  Date.now + 'asd'
    },
    user : {
        type: Object
    },
    is_resolved:{type: Boolean},
    is_processing:{type:Boolean}
}, {
    timestamps: true
})

const ComplaintTweet = mongoose.model('ComplaintTweet', tweetSchema);

module.exports = ComplaintTweet ;
