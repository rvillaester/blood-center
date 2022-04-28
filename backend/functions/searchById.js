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
  let item = res.Items[0];
  let user = await ddbMgr.findByPKUser(item.userId);
  let data = { ...user, ...item };
  let hasHistory = false;
  if(user.isAdmin)
    hasHistory = await historyMgr.checkHistory(data.userId);
  return responseMgr.response(
        200,
        {
          data: JSON.stringify(data),
          hasHistory: hasHistory
        }
    );
};
