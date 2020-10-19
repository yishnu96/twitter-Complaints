const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'], nlu: { useNoneFeature: false }, forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('en', 'I am getting frustrated', 'complaint.anger');
manager.addDocument('en', 'problem', 'greetings.hello');
manager.addDocument('en', 'customers complain', 'greetings.hello');
manager.addDocument('en', 'have major issues', 'greetings.hello');
manager.addDocument('en', 'connectivity issue', 'greetings.hello');
manager.addDocument('en', 'issue', 'greetings.hello');
manager.addDocument('en', 'issues', 'greetings.hello');
// manager.addDocument('en', 'not', 'greetings.hello');
manager.addDocument('en', 'no', 'greetings.hello');
manager.addDocument('en', 'worst waiting not working', 'complaint.problem');
manager.addDocument('en', 'service request no', 'greetings.hello');
manager.addDocument('en', 'complaint', 'greetings.hello');
manager.addDocument('en', 'slow', 'greetings.hello');
manager.addDocument('en', 'request number', 'greetings.hello');
manager.addDocument('en', 'Worst', 'greetings.hello');
manager.addDocument('en', 'complaint not ', 'complaint.trying');



// Train also the NLG
manager.addAnswer('en', 'greetings.hello', 'Your Complaint has been Registered ');
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
