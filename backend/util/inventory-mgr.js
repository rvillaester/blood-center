var ddbMgr = require("./ddb-mgr");

const idANeg = 1000000;
const idAPos = 1000001;
const idBNeg = 1000002;
const idBPos = 1000003;
const idABNeg = 1000004;
const idABPos = 1000005;
const idONeg = 1000006;
const idOPos = 1000007;

function getIdByBloodType(bloodType) {
  if (bloodType == "A-") return idANeg;
  if (bloodType == "A+") return idAPos;
  if (bloodType == "B-") return idBNeg;
  if (bloodType == "B+") return idBPos;
  if (bloodType == "AB-") return idABNeg;
  if (bloodType == "AB+") return idABPos;
  if (bloodType == "O-") return idONeg;
  if (bloodType == "O+") return idOPos;
}

function getParams(bloodType) {
  let id = getIdByBloodType(bloodType);
  return {
    TableName: 'blood-center',
    Item: {
      'id' : id,
      'createdDate': id.toString(),
      'requestType': 'inventory',
      'available' : 0,
      'pending' : 0,
      'bloodType' : bloodType
    }
  };
}

module.exports.insertInventories = async () => {
  await ddbMgr.put(getParams("A-"));
  await ddbMgr.put(getParams("A+"));
  await ddbMgr.put(getParams("B-"));
  await ddbMgr.put(getParams("B+"));
  await ddbMgr.put(getParams("AB-"));
  await ddbMgr.put(getParams("AB+"));
  await ddbMgr.put(getParams("O-"));
  await ddbMgr.put(getParams("O+"));
}

module.exports.updateInventory = async (
  requestType,
  status,
  quantity,
  bloodType
) => {
  console.log(`${requestType} - ${status} - ${quantity} - ${bloodType}`);
  let id = getIdByBloodType(bloodType);
  console.log(`id ${id}`);
  let data = await ddbMgr.findByPK(id);
  console.log(`data ${data}`);
  console.log(JSON.stringify(data));
  const { available, pending } = data;
  let newPending = pending;
  let newAvailable = available;

  if (typeof quantity === "string") {
    quantity = parseInt(quantity);
  }

  if (requestType == "donation") {
    if (status == "Pending") {
      newPending += quantity;
      console.log(`new pending ${newPending}`);
    } else if (status == "Cancelled") {
      newPending -= quantity;
    } else if (status == "Completed") {
      newPending -= quantity;
      newAvailable += quantity;
    }
  } else if (requestType == "request") {
    if (status == "Completed") {
      newAvailable -= quantity;
    }
  }

  var params = {
    TableName: "blood-center",
    Key: { id: id, createdDate: id.toString() },
    UpdateExpression: "set available = :available, pending = :pending",
    ExpressionAttributeValues: {
      ":available": newAvailable,
      ":pending": newPending,
    },
  };

  await ddbMgr.update(params);
  console.log("update complete");
};

module.exports.fetchInventory = async () => {
  let dataANeg = await ddbMgr.findByPK(idANeg);
  let dataAPos = await ddbMgr.findByPK(idAPos);
  let dataBNeg = await ddbMgr.findByPK(idBNeg);
  let dataBPos = await ddbMgr.findByPK(idBPos);
  let dataABNeg = await ddbMgr.findByPK(idABNeg);
  let dataABPos = await ddbMgr.findByPK(idABPos);
  let dataONeg = await ddbMgr.findByPK(idONeg);
  let dataOPos = await ddbMgr.findByPK(idOPos);

  return {
    dataANeg,
    dataAPos,
    dataBNeg,
    dataBPos,
    dataABNeg,
    dataABPos,
    dataONeg,
    dataOPos,
  };
};

module.exports.getAvailableForBloodType = async (bloodType) => {
  let id = getIdByBloodType(bloodType);
  let data = await ddbMgr.findByPK(id);
  return data.available;
};
