var ddbMgr = require("./ddb-mgr");
var common = require("./common");

module.exports.checkValidity = async (
  requestType,
  email,
  bloodType,
  name,
  birthday
) => {
  params = {
    TableName: "blood-center",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
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
  let previousBloodType = "";
  let previousName = "";
  let previousBirthday = "";

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
      previousBloodType = item.bloodType;
      previousName = item.name;
      previousBirthday = item.birthday;
      let previousRequestType = item.requestType;
      let lastTransactionDate = new Date(item.completedDate);
      let monthDiff = common.getMonthDiff(lastTransactionDate, today);
      if (requestType == 'donation' && previousRequestType == 'donation') {
        if (monthDiff <= 3) {
          console.log("You have donated blood for the past 3 months");
          valid = false;
          message =
            "You have donated blood for the past 3 months. You need to wait after 3 months to donate again.";
        }
      }
    }
  });

  if (previousName !== "" && previousName !== name && valid) {
    valid = false;
    message = `The name you entered (${name}) doesn't match the name from our previous record which is ${previousName}.`;
  }

  if (previousBirthday !== "" && previousBirthday !== birthday && valid) {
    valid = false;
    message = `The birthdate you entered (${birthday}) doesn't match the birthday from our previous record which is ${previousBirthday}.`;
  }

  if (previousBloodType !== "" && previousBloodType !== bloodType && valid) {
    valid = false;
    message = `The blood type selected (${bloodType}) doesn't match your previous blood type ${previousBloodType}.`;
  }

  return {
    valid: valid,
    bloodType: bloodType,
    message: message,
  };
};
