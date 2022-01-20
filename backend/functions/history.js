var historyMgr = require("../util/history-mgr");
var responseMgr = require("../util/response-mgr");

module.exports.handler = async (event) => {
  let email = event.queryStringParameters.email;
  console.log(email);
  let items = await historyMgr.fetchHistories(email);

  return responseMgr.response(200, {
    items: JSON.stringify(items),
  });
};
