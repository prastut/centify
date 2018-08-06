const db = require("../db");
const helper = require("../helper");
const moment = require("moment");

exports = module.exports = io => {
  io.on("connection", async socket => {
    /*---------------------------*/
    try {
      socket.on("get trending emojis", async (timeInsideMatch, collection) => {
        try {
          const trendingEmojisData = await db.getTrendingEmojis(
            moment.utc(timeInsideMatch),
            collection
          );

          const trendingEmojis = trendingEmojisData.reduce((accumulator, t) => {
            if ("emotion" in t) {
              return {
                ...accumulator,
                [t.entity_name]: `${t.max_emotion}-${Date.now()}`
              };
            }
          }, {});

          socket.emit("trending emojis", trendingEmojis);
        } catch (err) {
          console.log("error in getting trending", err);
        }
      });

      socket.on(
        "get entity tweets",
        async (timeInsideMatch, collection, entity, gap) => {
          // console.log(timeInsideMatch, collection, entity);
          const tweetsData = await db.getSelectedEntityTweets(
            moment.utc(timeInsideMatch),
            collection,
            entity,
            gap
          );

          const tweets = tweetsData.map(i => {
            return {
              id: i._id,
              tweet: i.tweet,
              emotion: i.max_emotion,
              image: i.userProfile
            };
          });

          socket.emit("entity tweets", tweets);
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
};
