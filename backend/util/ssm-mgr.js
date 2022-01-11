const AWS = require('aws-sdk')
AWS.config.update({
  region: 'ap-southeast-1'
})

const store = new AWS.SSM()

module.exports.getEmailPassword =  async () => {
  console.log('Retrieving DB password from SSM');
  try{
    let data = await store.getParameter({
        Name: 'mail_password'
    }).promise();

    return data.Parameter.Value;
  } catch(err) {
    console.log('error: ' + err);
  }
}