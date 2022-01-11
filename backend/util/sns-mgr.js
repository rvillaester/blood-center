var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

module.exports.send = (type, referenceNo) => {
    let message = '';
    if(type == 'donation'){
        message = 'Thank you donor. We have receive your request. Here is your reference number: ' + referenceNo;
    } else if(type == 'request'){
        message = 'Thank you patient. We have receive your request. Here is your reference number: ' + referenceNo;
    }

    var params = {
        Message: message,
        TopicArn: process.env.TopicArn
      };
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    publishTextPromise.then(
    function(data) {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });
}