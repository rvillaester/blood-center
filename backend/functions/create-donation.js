var ddbMgr = require("../util/ddb-mgr");
var responseMgr = require("../util/response-mgr");
var emailMgr = require("../util/email-mgr");
var common = require("../util/common");
var donateMgr = require("../util/validation-mgr");

module.exports.handler = async (event) => {
  console.log(event.body);
  let data = JSON.parse(event.body);
  const { quantity, userId } = data;
  console.log(
    `${quantity} - ${userId}`
  );
  
  let user = await ddbMgr.findByPKUser(userId);
  const {name, bloodType, birthday } = user;

  let requestType = "donation";
  let validity = await donateMgr.checkValidity(
    requestType,
    userId,
    birthday
  );
  console.log(JSON.stringify(validity));
  if (!validity.valid) {
    return responseMgr.response(200, {
      valid: false,
      message: validity.message,
    });
  }

  let id = new Date().valueOf();
  let requestStatus = "Pending";
  var params = {
    TableName: "blood-center",
    Item: {
      id: id,
      createdDate: common.getFormattedDateTimeToday(),
      requestType: requestType,
      name: name,
      bloodType: bloodType,
      userId: userId,
      quantity: parseInt(quantity),
      requestStatus: requestStatus
    },
  };
  await ddbMgr.put(params);
  await emailMgr.sendEmail(userId, id, "donation");

  return responseMgr.response(200, {
    valid: true,
    referenceNo: id,
  });
};
