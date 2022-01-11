var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');

module.exports.handler = async (event) => {
    console.log(event.body);
    let data = JSON.parse(event.body);
    let {username, password} = data;
    console.log(`${username} - ${password}`)
    let record = await ddbMgr.findByPKUser(username);
    console.log(`record ${record}`);

    let statusCode = 403
    let name = '';
    if(record != null){
        statusCode = 200;
        name = record.name;
    } 

    return responseMgr.response(
        statusCode,
            {
                name: name,
                status: statusCode
            }
        );
};
