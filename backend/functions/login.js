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
    let isAdmin = 'N';
    
    if(record != null && record.password === password) {
        statusCode = 200;
        name = record.name;
        isAdmin = record.isAdmin ? 'Y' : 'N';
    }

    return responseMgr.response(
        statusCode,
            {
                name: name,
                status: statusCode,
                isAdmin: isAdmin
            }
        );
};
