const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'], nlu: { useNoneFeature: false }, forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('en', 'I am getting frustrated', 'complaint.anger');
manager.addDocument('en', 'problem', 'complaint.problem');
manager.addDocument('en', 'customers complain', 'complaint.problem');
manager.addDocument('en', 'have major issues', 'complaint.trying');
manager.addDocument('en', 'connectivity issue', 'complaint.trying');
manager.addDocument('en', 'issue', 'complaint.problem');
manager.addDocument('en', 'issues', 'complaint.problem');
manager.addDocument('en', 'no', 'complaint.problem');
manager.addDocument('en', 'worst waiting not working', 'complaint.problem');
manager.addDocument('en', 'service request no', 'complaint.problem');
manager.addDocument('en', 'complaint', 'complaint.problem');
manager.addDocument('en', 'slow', 'complaint.problem');
manager.addDocument('en', 'request number', 'complaint.problem');
manager.addDocument('en', 'Worst', 'complaint.angry');
manager.addDocument('en', 'complaint not ', 'complaint.trying');



// Train also the NLG
manager.addAnswer('en', 'complaint.problem', 'Your Complaint has been Registered ');
manager.addAnswer('en', 'complaint.anger', 'Sorry Of your Inconvinence. We are trying to resolve ');
manager.addAnswer('en', 'complaint.problem', 'We are trying to resolve As soon as possible');
manager.addAnswer('en', 'complaint.trying', 'We will try to resolve you problem ASAP');


// Train and save the model.
// (async() => {
//     await manager.train();
//     manager.save();
//     const response = await manager.process('en', 'I should go now');
//     console.log(response);
// })();

module.exports = manager;
