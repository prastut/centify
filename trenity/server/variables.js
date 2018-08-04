const path = require("path");
const moment = require("moment");

const PORT = process.env.PORT || 5000;
const BUILD_DIRECTORY = path.join(__dirname, "../client/build");
const SIM_MATCH_FILE = path.join(__dirname, "simulation-match-time.txt");
const DB_URL =
  process.env.MONGODB_URI ||
  "mongodb://bubble:bubble@104.196.215.99:27017/Bubble";
console.log(DB_URL);
const DATABASE = "EPL";
const ABSOLUTE_MATCH_START_TIME = {
  BELFRA_SEMI: moment.utc("2018-07-10 18:00:00"),
  ENGSWE_R16: moment.utc("2018-07-07 14:00:00"),
  CROENG_SEMI: moment.utc("2018-07-11 18:00:00"),
  CROFRA_FINAL: moment.utc("2018-07-15 15:00:00")
};
const ENTITIES_COLLECTION = "entities";
const FIXTURES_COLLECTION = "fixtures";
module.exports = {
  PORT,
  BUILD_DIRECTORY,
  SIM_MATCH_FILE,
  DB_URL,
  DATABASE,
  ABSOLUTE_MATCH_START_TIME,
  ENTITIES_COLLECTION,
  FIXTURES_COLLECTION
};
