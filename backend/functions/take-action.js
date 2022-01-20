var ddbMgr = require("../util/ddb-mgr");
var responseMgr = require("../util/response-mgr");
var inventoryMgr = require("../util/inventory-mgr");
var emailMgr = require("../util/email-mgr");
var common = require("../util/common");

module.exports.handler = async (event) => {
  console.log(event.body);
  let data = JSON.parse(event.body);
  let { action, id, reason, appointmentDate } = data;
  console.log(`${action} - ${id}`);

  let record = await ddbMgr.findByPK(id);
  console.log('XXXX ' + JSON.stringify(record));
  const { requestType, bloodType, quantity, email, createdDate, donor } = record;
  if (requestType == "request" && action == "Completed" && donor === '') {
    let available = await inventoryMgr.getAvailableForBloodType(bloodType);
    console.log(`available: ${available}`)
    if (quantity > available) {
      return responseMgr.response(200, {
        code: 101,
        message: "Not enough stock in the inventory",
      });
    }
  }

  let dateToday = common.getFormattedDateToday();

  let updateExp = "set requestStatus = :requestStatus";
  let expAttrValues = {
    ":requestStatus": action,
  };

  if (action == "Scheduled") {
    updateExp += ", appointmentDate = :appointmentDate";
    expAttrValues[":appointmentDate"] = appointmentDate;
  }
  if (action == "Cancelled") {
    updateExp += ", reason = :reason, cancelledDate = :cancelledDate";
    expAttrValues[":reason"] = reason;
    expAttrValues[":cancelledDate"] = dateToday;
  }
  if (action == "Completed") {
    updateExp += ", completedDate = :completedDate";
    expAttrValues[":completedDate"] = dateToday;
  }

  var params = {
    TableName: "blood-center",
    Key: { id: parseInt(id), createdDate: createdDate },
    UpdateExpression: updateExp,
    ExpressionAttributeValues: expAttrValues,
  };

  console.log(`created date ${createdDate}`);
  console.log(JSON.stringify(params));
  console.log('test');

  await ddbMgr.update(params);

  await emailMgr.sendEmailNotifForAction(email, requestType, action, reason, appointmentDate, id);

  return responseMgr.response(200, {code: 100});
};
