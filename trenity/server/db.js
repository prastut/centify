const { MongoClient, ObjectId, Timestamp } = require("mongodb");
const { DATABASE } = require("./variables");
const { ENTITIES_COLLECTION, FIXTURES_COLLECTION } = require("./variables");
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

//Fixtures related DB CRUD
const getAllFixtures = async collection => {
  const timeStampSortAscending = { startTime: 1 };
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

//Match Related DB CRUD
const getMatchData = async matchId => {
  try {
    return await state.db
      .collection(FIXTURES_COLLECTION)
      .findOne({ _id: ObjectId(matchId) });
  } catch (error) {
    console.log(error);
  }
};

const getAllEntitiesForMatch = async matchId => {
  try {
    const { teamOne, teamTwo } = await getMatchData(matchId);

    return await state.db
      .collection(ENTITIES_COLLECTION)
      .find({
        $or: [
          { team: teamOne },
          { team: teamTwo },
          { key: teamOne },
          { key: teamTwo }
        ]
      })
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

const getEvents = async (t, matchId, variant) => {
  try {
    const paramsForFind = {
      timeStamp: {
        $lt: t.toDate()
      }
    };

    return await state.db
      .collection(`${matchId}_events`)
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
      .collection(`${collection}_trending`)
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

const getSelectedEntityTweets = async (t, match, entity_name, gap) => {
  console.log(
    `timeInsideMatch ${t.format()} , entity: ${entity_name}, gap: ${gap}`
  );

  try {
    const paramsForFind = {
      $and: [
        {
          timeStamp: {
            $gte: t
              .clone()
              .subtract(gap, "s")
              .toDate(),
            $lt: t.toDate()
          }
        },
        { entity_name }
      ]
    };

    const tweets = await state.db
      .collection(match)
      .find(paramsForFind)
      .toArray();

    // console.log(tweets);
    return tweets;
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

//Entitity related DB CRUD

const getEntityData = async key => {
  try {
    return await state.db.collection(ENTITIES_COLLECTION).findOne({ key });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connect,
  get,
  close,
  getAllFixtures,
  getMatchData,
  getAllEntitiesForMatch,
  getEvents,
  getTrendingEntitiesInTimeFrame,
  getTrendingEmojis,
  getSelectedEntityTweets,
  countTrendingEntities,
  getLastTweetForAPastMatch,
  getEntityData
};
