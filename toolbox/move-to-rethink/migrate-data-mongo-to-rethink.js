const { MongoClient, ObjectId, Timestamp } = require("mongodb");
const r = require("rethinkdb");

const COLLECTION = {
  fixtures: "fixtures",
  entities: "entities"
};

const RE_THINK_DB_CONFIG = {
  host: process.env.RETHINK_HOST || "localhost",
  port: process.env.RETHINK_PORT || 28015,
  database: "test"
};

const MONGO_DB_CONFIG = {
  url: "mongodb://localhost:27017/",
  database: "EPL"
};

const rethinkConnect = async ({ host, port, database }) => {
  try {
    return await r.connect({ host, port, db: database });
  } catch (err) {
    console.log(err);
  }
};

const mongoConnect = async ({ url, database }) => {
  try {
    const mongo = await MongoClient.connect(
      url,
      { useNewUrlParser: true }
    );
    return mongo.db(database);
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  try {
    const rethinkConnection = await rethinkConnect(RE_THINK_DB_CONFIG);

    const mongoConnection = await mongoConnect(MONGO_DB_CONFIG);

    const fixturesInsideMongo = await mongoConnection
      .collection(COLLECTION.fixtures)
      .find()
      .toArray();

    console.log(fixturesInsideMongo);
    // console.log(fixturesInsideMongo);
  } catch (err) {
    console.log(err);
  }
  // const mongoConnection = await mongoConnect(...MONGO_DB_CONFIG);
};

main();
