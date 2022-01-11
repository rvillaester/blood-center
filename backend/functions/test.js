var ssmMgr = require('../util/ssm-mgr');

module.exports.handler = async (event) => {
	let pwd = await ssmMgr.getEmailPassword();
	return {
		statusCode: 200,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials': true,
		},
		body: JSON.stringify(
		  {
			pwd: pwd
		  }
		)
	  };
}
