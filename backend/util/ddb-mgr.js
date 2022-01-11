var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.put =  async (params) => {
  console.log('Saving to DB');
  try{
    let res = await docClient.put(params).promise();
    console.log('Record inserted: ' + res);
  } catch(err) {
    console.log('error: ' + err);
  }
}

module.exports.scan =  async (params) => {
  console.log('Searching DB');
  try{
    let res = await docClient.scan(params).promise();
    return res;
  } catch(err) {
    console.log('error: ' + err);
  }
}

module.exports.query =  async (params) => {
  console.log('Searching DB');
  console.log(`params ${params}`);
  console.log(JSON.stringify(params));
  try{
    return await docClient.query(params).promise();
  } catch(err) {
    console.log('error: ' + err);
  }
}

module.exports.update =  async (params) => {
  console.log('Updating item');
  try{
    let res = await docClient.update(params).promise();
    return res;
  } catch(err) {
    console.log('error: ' + err);
  }
}

module.exports.findByPK =  async (id) => {
  let pk = id;
  if(typeof id === 'string'){
    pk = parseInt(id);
  }

  let params = {
    TableName: 'blood-center',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': pk,
    }
  };

  let res = await this.query(params);
  console.log(`res ${res}`);
  if(res.Items.length > 0)
    return res.Items[0];
  return null;
}

module.exports.findByPKUser =  async (username) => {
  let params = {
    TableName: 'blood-center-user',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username,
    }
  };

  let res = await this.query(params);
  console.log(`length ${res.Items.length}`);
  if(res.Items.length > 0)
    return res.Items[0];
  return null;
}

