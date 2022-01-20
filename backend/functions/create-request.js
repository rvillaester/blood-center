var ddbMgr = require("../util/ddb-mgr");
var responseMgr = require("../util/response-mgr");
var emailMgr = require("../util/email-mgr");
var common = require("../util/common");
var donateMgr = require("../util/validation-mgr");

module.exports.handler = async (event) => {
  console.log(event.body);
  let data = JSON.parse(event.body);
  let { name, birthday, bloodType, mobile, email, quantity, donor } = data;
  console.log(
    `${name} - ${birthday} - ${bloodType} - ${mobile} - ${email} - ${quantity}- ${donor}`
  );
  let requestType = "request";
  let validity = await donateMgr.checkValidity(
    requestType,
    email,
    bloodType,
    name,
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
      birthday: birthday,
      bloodType: bloodType,
      mobile: mobile,
      email: email,
      quantity: parseInt(quantity),
      donor: donor,
      requestStatus: requestStatus,
    },
  };
  await ddbMgr.put(params);
  await emailMgr.sendEmail(email, id, "request");

  return responseMgr.response(200, {
    valid: true,
    referenceNo: id,
  });
};
