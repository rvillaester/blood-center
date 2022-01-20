function appendZero(num) {
  if (num < 10) return `0${num}`;
  return num;
}

module.exports.getMonthDiff = (dateFrom, dateTo) => {
  return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
 }

module.exports.getFormattedDateToday = () => {
  let today = new Date();
  let month = appendZero((today.getMonth() + 1));
  console.log(`month is ${month}`);
  return (
    today.getFullYear() + "-" + appendZero((today.getMonth() + 1)) + "-" + appendZero(today.getDate())
  );
};

module.exports.getFormattedDateTimeToday = () => {
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
    appendZero(today.getHours()) +
    ":" +
    appendZero(today.getMinutes()) +
    ":" +
    appendZero(today.getSeconds())
  );
};
