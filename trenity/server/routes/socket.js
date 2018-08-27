const db = require("../db");
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
                [t.key]: `${t.emotion}-${Date.now()}`
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
        async (timeInsideMatch, collection, entityKey, gap) => {
          // console.log(timeInsideMatch, collection, entity);
          const tweetsData = await db.getSelectedEntityTweets(
            moment.utc(timeInsideMatch),
            collection,
            entityKey,
            gap
          );

          const tweets = tweetsData.map(t => {
            return {
              id: t._id,
              tweet: t.tweet,
              emotion: t.emotion,
              image: t.userProfileImageURL
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
