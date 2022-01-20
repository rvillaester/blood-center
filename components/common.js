exports.BloodTypes = ["A-", "A+", "B-", "B+", "AB-", "AB+", "O-", "O+"];

exports.constructAPIUrl = (resource) => {
  let id = 'zdvt8v65ab';
  return `https://${id}.execute-api.ap-southeast-1.amazonaws.com/dev/${resource}`;
};

function appendZero(num) {
  if (num < 10) return `0${num}`;
  return num;
}

exports.calculateAge = (birthday) => {
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); 
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

exports.getFormattedDateToday = () => {
  let today = new Date();
  let month = appendZero((today.getMonth() + 1));
  console.log(`month is ${month}`);
  return (
    today.getFullYear() + "-" + appendZero((today.getMonth() + 1)) + "-" + appendZero(today.getDate())
  );
};

exports.getFormattedDateTimeToday = () => {
  let today = new Date();
  let month = (today.getMonth() + 1);
  console.log(`month is ${month}`);
  let month0 = appendZero(month);
  console.log(`month0 is ${month0}`);
  return (
    today.getFullYear() +
    "-" +
    appendZero((today.getMonth() + 1)) +
    "-" +
    appendZero(today.getDate()) +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds()
  );
};
