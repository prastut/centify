const fs = require("fs-extra");
const path = require("path");
const ramda = require("ramda");
const express = require("express");
const moment = require("moment");
const router = express.Router();

//Techical Debt
const { BEL, FRA, CRO, ENG, SWE, MATCHES_LIST } = require("../entityList");
const helper = require("../helper");

const db = require("../db");

router.get("/events/:matchId", (req, res) => {
  const matchId = req.params.matchId;

  try {
  } catch (err) {}
});

//Match Related Routes
router.get("/match/all", (req, res) => {
  res.json(MATCHES_LIST);
});

router.get("/match/data/:matchId", (req, res) => {
  const matchId = req.params.matchId;
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
router.get("/team/entities/:teamId", async (req, res) => {
  const { teamId } = req.params;
  try {
    const entities = await db.getAllEntitiesForTeam(teamId);
    res.json(entities);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
