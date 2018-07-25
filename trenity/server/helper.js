//Utilties
const moment = require("moment");
const fs = require("fs-extra");
const util = require("util");

//Technical Debt
const { ABSOLUTE_MATCH_START_TIME, SIM_MATCH_FILE } = require("./variables");
const readFile = util.promisify(fs.readFile);

const maxEmotion = emotions =>
  Object.keys(emotions).reduce((a, b) => (emotions[a] > emotions[b] ? a : b));

const getTimeInsideMatch = (simulatedMatchStartTime, collection) => {
  const now = moment.utc();
  const absoluteMatchStartTime = getAbsoluteMatchStartTime(collection);
  const period = now - simulatedMatchStartTime;
  return moment.utc(absoluteMatchStartTime + period);
};

const writeSimulationTimeToFile = async () => {
  await fs.writeFile(SIM_MATCH_FILE, moment.utc().format());
};

const readSimulationTimeFromFile = async () =>
  moment.utc(await readFile(SIM_MATCH_FILE, "utf-8"));

const getAbsoluteMatchStartTime = collection => {
  console.log(ABSOLUTE_MATCH_START_TIME[collection]);
  return ABSOLUTE_MATCH_START_TIME[collection];
};

module.exports = {
  maxEmotion,
  getTimeInsideMatch,
  writeSimulationTimeToFile,
  readSimulationTimeFromFile
};
