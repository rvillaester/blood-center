var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');
var historyMgr = require('../util/history-mgr');

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
  let data = res.Items[0];
  let hasHistory = await historyMgr.checkHistory(data.email);
  return responseMgr.response(
        200,
        {
          data: JSON.stringify(data),
          hasHistory: hasHistory
        }
    );
};
