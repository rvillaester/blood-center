module.exports.response = (statusCode, body) => {
    return {
        statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body)
      };
}