'use strict';

module.exports.handler = async (event) => {
	console.log(event.body);
	return {
		statusCode: 200,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials': true,
		},
		body: JSON.stringify(
		  {
			referenceNo: 12323432
		  }
		)
	  };
}
