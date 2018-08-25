const path = require("path");
const moment = require("moment");

const PORT = process.env.PORT || 5000;

const BUILD_DIRECTORY = path.join(__dirname, "../client/build");

const DB_URL =
  process.env.MONGODB_URI ||
  "mongodb://bubble:bubble@104.196.215.99:27017/Bubble";

const DATABASE = "EPL";

const ENTITIES_COLLECTION = "entities";
const FIXTURES_COLLECTION = "fixtures";

module.exports = {
  PORT,
  BUILD_DIRECTORY,
  DB_URL,
  DATABASE,
  ENTITIES_COLLECTION,
  FIXTURES_COLLECTION
};
