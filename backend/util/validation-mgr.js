var ddbMgr = require("./ddb-mgr");
var common = require("./common");

module.exports.checkValidity = async (
  requestType,
  userId,
  birthday
) => {
  params = {
    TableName: "blood-center",
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };
  let res = await ddbMgr.scan(params);
  let items = res.Items;
  if (items.length == 0) {
    console.log("valid dito");
    return {
      valid: true,
      message: "",
    };
  }

  let valid = true;
  let message = "";

  items.forEach((item) => {
    let status = item.requestStatus;
    console.log("status " + status);
    if (status === "Pending" || status === "Scheduled") {
      console.log("You have an existing ongoing request");
      valid = false;
      message = "You have an existing ongoing request";
    }

    if (status === "Completed") {
      let today = new Date();
      previousName = item.name;
      previousBirthday = item.birthday;
      let previousRequestType = item.requestType;
      let lastTransactionDate = new Date(item.completedDate);
      let monthDiff = common.getMonthDiff(lastTransactionDate, today);
      if (requestType == 'donation' && previousRequestType == 'donation') {

        if (monthDiff <= 3) {
          valid = false;
          message =
            'You have donated blood for the past 3 months. You need to wait after 3 months to donate again.';
        }

        let age = common.calculateAge(new Date(birthday));
        if(age < 18){
          valid = false;
          message = 'You should be 18 years old and above in order to donate blood.';
        }
      }
    }
  });

  return {
    valid: valid,
    message: message,
  };
};
