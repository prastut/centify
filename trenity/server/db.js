const MongoClient = require("mongodb").MongoClient;
const { DATABASE } = require("./variables");
const { ENTITIES_COLLECTION } = require("./variables");
const { FIXTURES_COLLECTION } = require("./variables");
const state = {
  db: null
};

const connect = (url, done) => {
  if (state.db) return done();

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, database) => {
      if (err) return done(err);
      state.db = database.db(DATABASE);
      done();
    }
  );
};

const get = () => state.db;

const close = done => {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};

/*Data Getting Functions
  1. Entities for both teams are procured and merged
  2. Match -> events are got until timeInsideMatch
  3. Match -> TrendingEntitiesCount are got until timeInsideMathc
  4. Match -> getTrendingEmojis for allTrendingEntities
  */
const getAllEntitiesForTeam = async team => {
  try {
    return await state.db
      .collection(ENTITIES_COLLECTION)
      .find({ team })
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

const getEventsUpto = async (t, collection) => {
  try {
    // console.log(`TIME->${t}, Match->${collection}`);
    const paramsForFind = {
      timeStamp: {
        $lt: t.toDate()
      }
    };

    return await state.db
      .collection(`${collection}_EVENTS`)
      .find(paramsForFind)
      .sort({ timeStamp: 1 })
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

const getTrendingEntitiesInTimeFrame = async (t, collection) => {
  // console.log(
  //   `collection -> ${collection}_TRENDING, timeInsideMatch ${t.format()}`
  // );

  try {
    const paramsForFind = {
      timeStamp: {
        $gte: t
          .clone()
          .subtract(10, "s")
          .toDate(),
        $lt: t.toDate()
      }
    };

    return await state.db
      .collection(`TRENDING_${collection}`)
      .findOne(paramsForFind, { sort: { timeStamp: -1 }, limit: 1 });
  } catch (err) {
    console.log(err);
  }
};

const getTrendingEmojis = async (t, collection) => {
  try {
    const paramsForFind = {
      timeStamp: {
        $gte: t
          .clone()
          .subtract(2, "s")
          .toDate(),
        $lt: t.toDate()
      }
    };

    return await state.db
      .collection(collection)
      .find(paramsForFind)
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

const getSelectedEntityTweets = async (t, match, entity_name) => {
  console.log(`timeInsideMatch ${t.format()} , entity: ${entity_name}`);

  try {
    const paramsForFind = {
      $and: [
        {
          timeStamp: {
            $gte: t
              .clone()
              .subtract(2, "s")
              .toDate(),
            $lt: t.toDate()
          }
        },
        { entity_name }
      ]
    };

    return await state.db
      .collection(match)
      .find(paramsForFind)
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

//Technical Debt
const countTrendingEntities = async (t, collection) => {
  try {
    const paramsForFind = {
      timeStamp: {
        $gte: t
          .clone()
          .subtract(5, "minutes")
          .toDate(),
        $lt: t.toDate()
      }
    };
    return await state.db
      .collection(collection)
      .find(paramsForFind)
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

//Need to get a single value here.
//Filed under techincal debt because we already know the endTime of a past match.
const getLastTweetForAPastMatch = async collection => {
  try {
    return await state.db
      .collection(collection)
      .find()
      .limit(1)
      .sort({ $natural: -1 })
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

const getAllFixtures = async collection => {
  const timeStampSortAscending = { timeStamp: 1 };
  try {
    return await state.db
      .collection(collection)
      .find()
      .sort(timeStampSortAscending)
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connect,
  get,
  close,
  getAllEntitiesForTeam,
  getEventsUpto,
  getTrendingEntitiesInTimeFrame,
  getTrendingEmojis,
  getSelectedEntityTweets,
  countTrendingEntities,
  getLastTweetForAPastMatch,
  getAllFixtures
};
