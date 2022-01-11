var inventoryMgr = require('../util/inventory-mgr');
var responseMgr = require('../util/response-mgr');

module.exports.handler = async (event) => {
    let record = await inventoryMgr.fetchInventory();

    return responseMgr.response(
            200,
            {
                dataA: JSON.stringify(record.dataA),
                dataB : JSON.stringify(record.dataB),
                dataAB: JSON.stringify(record.dataAB),
                dataO: JSON.stringify(record.dataO),
            }
        );
};
