var responseMgr = require("../util/response-mgr");
var inventoryMgr = require("../util/inventory-mgr");
var ddbMgr = require("../util/ddb-mgr");

module.exports.handler = async (event) => {
  await inventoryMgr.insertInventories();
  await ddbMgr.insertUser('admin', 'admin', 'Admin');
  return responseMgr.response(200, {
    message: 'All Good',
  });
};