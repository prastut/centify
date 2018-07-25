const fs = require("fs-extra");
const path = require("path");
const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const util = require("util");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const r = require("ramda");

const readFile = util.promisify(fs.readFile);

/* === Variables === */
//DB
const DB_URL = "mongodb://bubble:bubble@104.196.215.99/Bubble";
const COLLECTION = "CRODEN_R16";

//Match
const SIM_MATCH_FILE = path.join(__dirname, "simulation-match-time.txt");
const ABSOLUTE_MATCH_START_TIME = moment.utc("2018-07-01 18:00:00");

//DB
let db = null;

/* === Express Setup === */
app.use(express.static(path.join(__dirname, "public")));

/* === Routes === */
//REST
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.get("/dashboard", (req, res) =>
  res.sendFile(__dirname + "/dashboard.html")
);

app.get("/api/simulate-match-now", (req, res) => {
  writeSimulationTimeToFile()
    .then(() => res.sendStatus(201))
    .catch(error => console.log(error));
});

//Socket
io.on("connection", socket => {
  readSimulationTimeFromFile()
    .then(simulatedMatchStartTime => {
      //Trending
      emitTrending(simulatedMatchStartTime)
        .then(entities => {
          entities.each((err, entity) => {
            if (entity && "emotion" in entity) {
              socket.emit("emojis for all entities", {
                entity: entity.entity_name,
                emotion: maxEmotion(entity.emotion)
              });
            }
          });
        })
        .catch(err => console.log(err));

      //Tweets for selected Entity
      socket.on("get entity tweets", entity => {
        emitEntityTweets(simulatedMatchStartTime, entity).then(tweets => {
          tweets.each((err, t) => {
            if (t && "emotion" in t) {
              socket.emit("entity tweets", {
                entity: t.entity_name,
                emotion: maxEmotion(t.emotion),
                profile_imag: t.user_profile,
                tweet: t.tweet
              });
            }
          });
        });
      });
    })
    .catch(err => console.log(err));
});

const emitTrending = async simulatedMatchStartTime => {
  try {
    const timeInsideMatch = getTimeInsideMatch(simulatedMatchStartTime);

    const paramsForFind = { timeStamp: { $gte: timeInsideMatch } };

    return await db.collection(COLLECTION).find(paramsForFind);
  } catch (err) {
    console.log(err);
  }
};

const emitEntityTweets = async (simulatedMatchStartTime, entity_name) => {
  try {
    const timeInsideMatch = getTimeInsideMatch(simulatedMatchStartTime);

    const paramsForFind = {
      $and: [
        { timeStamp: { $gte: timeInsideMatch } },
        { entity_name: entity_name }
      ]
    };

    return await db.collection(COLLECTION).find(paramsForFind);
  } catch (err) {
    console.log(err);
  }
};

const getTimeInsideMatch = (absoluteTime, simulatedMatchStartTime) => {
  const now = moment.utc();
  const period = now - simulatedMatchStartTime;
  return moment.utc(ABSOLUTE_MATCH_START_TIME + period).toDate();
};

const maxEmotion = emotions =>
  Object.keys(emotions).reduce((a, b) => (emotions[a] > emotions[b] ? a : b));

const writeSimulationTimeToFile = async () => {
  await fs.writeFile(SIM_MATCH_FILE, moment.utc().format());
};

const readSimulationTimeFromFile = async () =>
  moment.utc(await readFile(SIM_MATCH_FILE, "utf-8"));

MongoClient.connect(
  DB_URL,
  (err, database) => {
    if (err) console.log(err);
    db = database.db("Bubble");
    emitTrending();
    http.listen(3000, () => console.log("listening on *:3000"));
  }
);
