var ddbMgr = require('./ddb-mgr');

const idA = 1000000;
const idB = 1000001;
const idAB = 1000002;
const idO = 1000003;

function getIdByBloodType(bloodType) {
    if(bloodType == 'A') return idA;
    if(bloodType == 'B') return idB;
    if(bloodType == 'AB') return idAB;
    if(bloodType == 'O') return idO;
}

module.exports.updateInventory = async (requestType, status, quantity, bloodType) => {
    console.log(`${requestType} - ${status} - ${quantity} - ${bloodType}`);
    let id = getIdByBloodType(bloodType);
    console.log(`id ${id}`);
    let data = await ddbMgr.findByPK(id);
    console.log(`data ${data}`);
    console.log(JSON.stringify(data));
    const {available, pending} = data;
    let newPending = pending;
    let newAvailable = available;

    if (typeof quantity === 'string'){
        quantity = parseInt(quantity);
    }

    if(requestType == 'donation') {
    if(status == 'Pending'){
        newPending += quantity;
        console.log(`new pending ${newPending}`);
    }else if(status == 'Cancelled'){
        newPending -= quantity;
    }else if(status == 'Completed'){
        newPending -= quantity;
        newAvailable += quantity;
    }
    } else if(requestType == 'request') {
        if(status == 'Completed'){
            newAvailable -= quantity;
        }
    }

    var params = {
        TableName: 'blood-center',
        Key: { id : id },
        UpdateExpression: 'set available = :available, pending = :pending',
        ExpressionAttributeValues: {
          ':available' : newAvailable,
          ':pending' : newPending
        }
      };

    await ddbMgr.update(params);
    console.log('update complete');
}

module.exports.fetchInventory = async () => {
    let dataA = await ddbMgr.findByPK(idA);
    let dataB = await ddbMgr.findByPK(idB);
    let dataAB = await ddbMgr.findByPK(idAB);
    let dataO = await ddbMgr.findByPK(idO);

    return {
        dataA,
        dataB,
        dataAB,
        dataO
    }
}