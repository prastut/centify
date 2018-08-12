const fs = require("fs-extra");
const path = require("path");
const ramda = require("ramda");
const express = require("express");
const moment = require("moment");
const router = express.Router();

const { FIXTURES_COLLECTION } = require("../variables");
const helper = require("../helper");

const db = require("../db");

//Fixtures
router.get("/fixtures", async (req, res) => {
  const allFixtures = await db.getAllFixtures(FIXTURES_COLLECTION);
  /*
      Match can be: 
      1. Upcoming. startTime is after currentTime
      2. Live. Range [startTime, endTime]
      3. Past
    */

  const currentTime = moment.utc();

  const allFixturesWithMatchState = allFixtures.map(fixture => {
    const matchStartTime = moment.utc(fixture.timeStamp);
    const matchEndingTime = matchStartTime.clone().add(150, "minutes");

    let matchState = null;

    if (currentTime.isBefore(matchStartTime)) {
      matchState = "upcoming";
    } else if (currentTime.isBetween(matchStartTime, matchEndingTime)) {
      matchState = "live";
    } else if (currentTime.isAfter(matchEndingTime)) {
      matchState = "past";
    }

    return {
      ...fixture,
      startTime: matchStartTime,
      endTime: matchEndingTime,
      matchState
    };
  });

  res.json(allFixturesWithMatchState);
});

router.get("/match/live", async (req, res) => {
  currentTime = moment.utc();
  const liveFixtures = await db.getLiveFixtures(
    FIXTURES_COLLECTION,
    currentTime
  );
  res.json(liveFixtures);
});

//Match Related Routes
router.get("/match/data/:matchId", (req, res) => {
  const { matchId } = req.params;
  const matchData = MATCHES_LIST.find(m => m.key === matchId);

  if (matchData) {
    res.json(matchData);
  } else {
    res.sendStatus(404);
  }
});

router.get("/match/endingTime/:matchId", async (req, res) => {
  const matchId = req.params.matchId;
  const lastTweetData = await db.getLastTweetForAPastMatch(matchId);
  res.json(lastTweetData[0].timeStamp);
});

router.get("/match/trending/:matchId", async (req, res) => {
  const { matchId } = req.params;
  console.log(req.query);
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

//Team Related Routes
router.get("/match/entities/:matchId", async (req, res) => {
  const { matchId } = req.params;
  try {
    const entities = await db.getAllEntitiesForMatch(matchId);
    res.json(entities);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
