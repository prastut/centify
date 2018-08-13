const fs = require("fs-extra");
const path = require("path");
const ramda = require("ramda");
const express = require("express");
const moment = require("moment");
const router = express.Router();

const { FIXTURES_COLLECTION, ENTITIES_COLLECTION } = require("../variables");

const db = require("../db");

const matchStateUpdater = allFixtures => {
  const currentTime = moment.utc();

  return allFixtures.map(fixture => {
    return {
      ...fixture,
      matchState: getMatchState(fixture.timeStamp)
    };
  });
};

const getMatchState = timeStamp => {
  /*
      Match can be: 
      1. Upcoming: currentTime is before startTime
      2. Live: Range [startTime, endTime]
      3. Past: currentTime is after endTime
    */

  console.log(timeStamp);

  const currentTime = moment.utc();
  const startTime = moment.utc(timeStamp);
  const endTime = startTime.clone().add(150, "minutes");

  if (currentTime.isBefore(startTime)) {
    return "upcoming";
  } else if (currentTime.isBetween(startTime, endTime)) {
    return "live";
  } else if (currentTime.isAfter(endTime)) {
    return "past";
  }
};

//Fixtures
router.get("/fixtures", async (req, res) => {
  try {
    const allFixtures = await db.getAllFixtures(FIXTURES_COLLECTION);
    res.json(matchStateUpdater(allFixtures));
  } catch (e) {
    console.log("get /fixtures error", e);
  }
});

//Match Related Routes
router.get("/match/data/:matchId", async (req, res) => {
  try {
    const { matchId } = req.params;

    const matchData = await db.getMatchData(matchId);
    const matchState = getMatchState(matchData.timeStamp);

    if (matchData) {
      res.json({ ...matchData, matchState });
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log("get /match/data/:matchId error", e);
  }
});

router.get("/match/all-entities/:matchId", async (req, res) => {
  const { matchId } = req.params;

  try {
    const entities = await db.getAllEntitiesForMatch(matchId);
    res.json(entities);
  } catch (err) {
    console.log(err);
  }
});

router.get("/match/endingTime/:matchId", async (req, res) => {
  const matchId = req.params.matchId;
  const lastTweetData = await db.getLastTweetForAPastMatch(matchId);
  res.json(lastTweetData[0].timeStamp);
});

router.get("/match/trending/:matchId", async (req, res) => {
  const { matchId } = req.params;
  const { timeInsideMatch } = req.query;

  try {
    const trending = await db.getTrendingEntitiesInTimeFrame(
      moment.utc(JSON.parse(timeInsideMatch)),
      matchId
    );
    res.json(trending);
  } catch (err) {
    console.log(err);
  }
});

router.get("/match/events/:matchId", async (req, res) => {
  const { matchId } = req.params;
  const { timeInsideMatch } = req.query;

  try {
    const events = await db.getEventsUpto(
      moment.utc(JSON.parse(timeInsideMatch)),
      matchId
    );

    res.json(events);
  } catch (err) {
    console.log(err);
  }
});

//Entities Route
router.get("/entities/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const entityData = await db.getEntityData(key);

    res.json(entityData);
  } catch (e) {
    console.log("get /entities/:key error", e);
  }
});

module.exports = router;
