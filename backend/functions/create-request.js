var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');
var emailMgr = require('../util/email-mgr');

module.exports.handler = async (event) => {
	console.log(event.body);
  let data = JSON.parse(event.body);
  let {name, birthday, bloodType, mobile, email, quantity} = data;
  console.log(`${name} - ${birthday} - ${bloodType} - ${mobile} - ${email} - ${quantity}`)
  let id = new Date().valueOf();
  let requestType = 'request';
  let requestStatus = 'Pending';
  var params = {
      TableName: 'blood-center',
      Item: {
        'id' : id,
        'requestType': requestType,
        'name' : name,
        'birthday' : birthday,
        'bloodType' : bloodType,
        'mobile' : mobile,
        'email' : email,
        'quantity' : parseInt(quantity),
        'requestStatus' : requestStatus
      }
    };
  await ddbMgr.put(params);
  await emailMgr.sendEmail(email, id, 'request');

  return responseMgr.response(
        200,
        {
            referenceNo: id
        }
    );
};
