var ddbMgr = require('../util/ddb-mgr');
var responseMgr = require('../util/response-mgr');

function addCriteria(criteria, field, value) {
  if(criteria.filterExp.length > 0) {
    criteria.filterExp += ' AND ';
  }
  criteria.filterExp += `${field} = :${field}`;
  criteria.expAttVals[`:${field}`] = value;
}

module.exports.handler = async (event) => {
	console.log(event.body);
  let data = JSON.parse(event.body);
  let {type, bloodType, status, userId} = data;
  console.log(`${type} - ${bloodType} - ${status} - ${userId}`)

  let user = await ddbMgr.findByPKUser(userId);

  let params = {
    TableName: 'blood-center'
  };

  let criteria = {
    filterExp: '',
    expAttVals: {}
  }

  // let filterExp = '';
  // let expAttVals = {};

  if(!user.isAdmin) {
    addCriteria(criteria, 'userId', userId);
  }

  if((type != 'All')) {
    addCriteria(criteria, 'requestType', type);
  }

  if(bloodType != 'All') {
    addCriteria(criteria, 'bloodType', bloodType);
  }

  if(status != 'All') {
    addCriteria(criteria, 'requestStatus', status);
  }

  if(criteria.filterExp !== '') {
    console.log('Filter Expression: ' + criteria.filterExp);
    console.log('Filter Expression attr values: ' + JSON.stringify(criteria.expAttVals));
    params = {
      TableName: 'blood-center',
      FilterExpression : criteria.filterExp,
      ExpressionAttributeValues : criteria.expAttVals
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
