var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');

module.exports.handler = async (event) => {
  let id = event.queryStringParameters.id;
	console.log(id);
  let record = await ddbMgr.findByPKUser(id);
  return responseMgr.response(
        200,
        {
          data: JSON.stringify(record)
        }
    );
};
