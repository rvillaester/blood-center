var ddbMgr = require("./ddb-mgr");
var common = require("./common");

module.exports.checkHistory = async (email) => {
  params = {
    TableName: "blood-center",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  let res = await ddbMgr.scan(params);
  let items = res.Items;
  if (items.length > 1) {
    return true;
  }
  return false;
};

module.exports.fetchHistories = async (email) => {
  params = {
    TableName: "blood-center",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  let res = await ddbMgr.scan(params);
  return res.Items;
};
