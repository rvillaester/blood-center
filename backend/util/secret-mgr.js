var AWS = require('aws-sdk');
var client = new AWS.SecretsManager({
    region: 'ap-southeast-1'
});

module.exports.getEmailPassword =  async (params) => {
  console.log('Retrieving DB password from secret manager');
  try{
    let data = await client.getSecretValue({
        SecretId: 'mail_password'
    }).promise();

    if ('SecretString' in data) {
        secret = data.SecretString;
        console.log(`password ${secret}`);
        return secret
    }
  } catch(err) {
    console.log('error: ' + err);
  }
}