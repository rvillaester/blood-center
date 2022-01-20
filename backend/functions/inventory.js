var inventoryMgr = require('../util/inventory-mgr');
var responseMgr = require('../util/response-mgr');

module.exports.handler = async (event) => {
    let record = await inventoryMgr.fetchInventory();

    return responseMgr.response(
            200,
            {
                dataANeg: JSON.stringify(record.dataANeg),
                dataAPos: JSON.stringify(record.dataAPos),
                dataBNeg : JSON.stringify(record.dataBNeg),
                dataBPos : JSON.stringify(record.dataBPos),
                dataABNeg: JSON.stringify(record.dataABNeg),
                dataABPos: JSON.stringify(record.dataABPos),
                dataONeg: JSON.stringify(record.dataONeg),
                dataOPos: JSON.stringify(record.dataOPos),
            }
        );
};
