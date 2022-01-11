var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');

module.exports.handler = async (event) => {
  let id = event.queryStringParameters.id;
	console.log(id);

  let params = {
    TableName: 'blood-center',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': parseInt(id),
    }
  };

  let res = await ddbMgr.query(params);
  return responseMgr.response(
        200,
        {
          data: JSON.stringify(res.Items[0])
        }
    );
};
