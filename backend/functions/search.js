var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');

module.exports.handler = async (event) => {
	console.log(event.body);
  let data = JSON.parse(event.body);
  let {type, bloodType, status} = data;
  console.log(`${type} - ${bloodType} - ${status}`)

  let params = {
    TableName: 'blood-center'
  };

  let filterExp = '';
  let expAttVals = {};
  let validType = false;

  if((type != 'All')) {
    validType = true;
    filterExp = 'requestType = :requestType';
    expAttVals[':requestType'] = type;
  }

  if(bloodType != 'All') {
    validBloodType = true;
    if(validType) {
      filterExp += ' AND bloodType = :bloodType';
    } else {
      filterExp += 'bloodType = :bloodType';
    }
    expAttVals[':bloodType'] = bloodType;
  }

  if(status != 'All') {
    if(validType){
      filterExp += ' AND requestStatus = :status';
    } else {
      filterExp += 'requestStatus = :status';
    }
    expAttVals[':status'] = status;
  }

  if(filterExp !== '') {
    console.log('Filter Expression: ' + filterExp);
    console.log('Filter Expression attr values: ' + JSON.stringify(expAttVals));
    params = {
      TableName: 'blood-center',
      FilterExpression : filterExp,
      ExpressionAttributeValues : expAttVals
    };
  }

  let res = await ddbMgr.scan(params);

  return responseMgr.response(
        200,
        {
          items: JSON.stringify(res.Items)
        }
    );
};
