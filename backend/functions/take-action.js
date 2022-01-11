var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');

module.exports.handler = async (event) => {
    console.log(event.body);
  let data = JSON.parse(event.body);
  let {action, id} = data;
  console.log(`${action} - ${id}`)

  var params = {
    TableName: 'blood-center',
    Key: { id : parseInt(id) },
    UpdateExpression: 'set requestStatus = :requestStatus',
    ExpressionAttributeValues: {
      ':requestStatus' : action
    }
  };

  await ddbMgr.update(params);

  return responseMgr.response(
        200
    );
};
