var ddbMgr = require("../util/ddb-mgr");
var responseMgr = require("../util/response-mgr");

module.exports.handler = async (event) => {
  console.log(event.body);
  let data = JSON.parse(event.body);
  let { name, birthday, bloodType, mobile, email, password } = data;
  console.log(
    `${name} - ${birthday} - ${bloodType} - ${mobile} - ${email} - ${password}`
  );

  let record = await ddbMgr.findByPKUser(email);
  console.log(`record ${record}`);
  if(record != null){
    return responseMgr.response(200, {
      valid: false,
      message: 'Email already exist.'
    });
  }

  var params = {
    TableName: "blood-center-user",
    Item: {
      username: email,
      name: name,
      birthday: birthday,
      bloodType: bloodType,
      mobile: mobile,
      email: email,
      password: password,
      isAdmin: false
    },
  };
  await ddbMgr.put(params);

  return responseMgr.response(200, {
    valid: true,
  });
};
