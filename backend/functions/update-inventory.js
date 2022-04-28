var inventoryMgr = require("../util/inventory-mgr");

module.exports.handler = async (event, context, callback) => {
  let record = event.Records[0];
  let requestType = record.dynamodb.NewImage.requestType.S;
  let requestStatus = record.dynamodb.NewImage.requestStatus.S;
  let quantity = record.dynamodb.NewImage.quantity.N;
  let bloodType = record.dynamodb.NewImage.bloodType.S;
  if (requestType == "request") {
    let donor = record.dynamodb.NewImage.donor.S;
    if (requestStatus == "Completed" && donor !== "")
      return;
  }

  await inventoryMgr.updateInventory(
    requestType,
    requestStatus,
    quantity,
    bloodType
  );
  console.log("Inventory update done");
};
