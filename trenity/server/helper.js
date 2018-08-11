//Utilties
const moment = require("moment");
const fs = require("fs-extra");
const util = require("util");

const getTimeInsideMatch = (simulatedMatchStartTime, collection) => {
  const now = moment.utc();
  const absoluteMatchStartTime = getAbsoluteMatchStartTime(collection);
  const period = now - simulatedMatchStartTime;
  return moment.utc(absoluteMatchStartTime + period);
};

module.exports = {
  getTimeInsideMatch
};
