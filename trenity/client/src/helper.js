import React from "react";

export const textToEmoji = emotion => {
  switch (emotion) {
    case "joy":
      return "😁";
    case "sadness":
      return "😢";
    case "disgust":
      return "🤬";
    case "fear":
      return "🤯";
    case "anger":
      return "😡";
    default:
      return "😊";
  }
};

export const positiveSentimentToEmoji = value => {
  if (value <= 100 && value > 80) {
    return "🤩";
  } else if (value <= 80 && value > 60) {
    return "😁";
  } else if (value <= 60 && value > 40) {
    return "😀";
  } else if (value <= 40 && value > 20) {
    return "☹️";
  } else {
    return "😡";
  }
};

export const eventsToGif = event => {
  switch (event) {
    case "GOAL":
      return (
        <img
          src="https://media1.tenor.com/images/99a34b7db0d2872967b1058018dc3c03/tenor.gif?itemid=4932210"
          style={{ width: "100%", borderRadius: "100%" }}
          alt=""
        />
      );
    case "YELLOW CARD":
      return (
        <img
          src="https://media1.tenor.com/images/46be2621151dd22f314d7aa01994d379/tenor.gif?itemid=10681726"
          style={{ width: "100%", borderRadius: "100%" }}
          alt=""
        />
      );
    case "RED CARD":
      return (
        <img
          src="https://media1.tenor.com/images/980c4915a1436d7c13cafc9845dfd20e/tenor.gif?itemid=12053171"
          style={{ width: "100%", borderRadius: "100%" }}
          alt=""
        />
      );
    case "CHANCE":
      return (
        <img
          src="https://media1.tenor.com/images/90076d94c9d4da212b7bc5836b3d3665/tenor.gif?itemid=5609465"
          style={{ width: "100%", borderRadius: "100%" }}
          alt=""
        />
      );
    case "FOUL":
      return (
        <img
          src="https://media.tenor.com/images/e60445406301561fbbeb62e7c4959ad4/tenor.gif"
          style={{ width: "100%", borderRadius: "100%" }}
          alt=""
        />
      );
    case "START HALF":
      return (
        <img
          src="https://media1.tenor.com/images/24e696d7b7c8fdd0ba39a0cc8e4b3526/tenor.gif?itemid=8904323"
          style={{ width: "100%", borderRadius: "100%" }}
          alt=""
        />
      );
    default:
      return "";
  }
};

export const eventsToEmoji = event => {
  switch (event) {
    case "GOAL":
      return "⚽";
    case "YELLOW CARD":
      return "📒";
    case "RED CARD":
      return (
        <img
          src="https://media1.tenor.com/images/980c4915a1436d7c13cafc9845dfd20e/tenor.gif?itemid=12053171"
          style={{ width: "100%", borderRadius: "100%" }}
          alt=""
        />
      );
    case "CHANCE":
      return "🤯";
    case "FOUL":
      return "🤬";
    case "START HALF":
      return "🏁";
    default:
      return "";
  }
};

const FRA = {
  Nabil_Fekir:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401458_sq-300_jpg?allowDefaultPicture=true",
  Ousmane_Dembele:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398680_sq-300_jpg?allowDefaultPicture=true",
  Benjamin_Pavard:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/411471_sq-300_jpg?allowDefaultPicture=true",
  Benjamin_Mendy:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/335995_sq-300_jpg?allowDefaultPicture=true",
  Olivier_Giroud:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358015_sq-300_jpg?allowDefaultPicture=true",
  Djibril_Sidibe:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398682_sq-300_jpg?allowDefaultPicture=true",
  Blaise_Matuidi:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358014_sq-300_jpg?allowDefaultPicture=true",
  Paul_Pogba:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/367388_sq-300_jpg?allowDefaultPicture=true",
  Ngolo_Kante:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398681_sq-300_jpg?allowDefaultPicture=true",
  Antoine_Griezmann:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/336435_sq-300_jpg?allowDefaultPicture=true",
  Presnel_Kimpembe:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401459_sq-300_jpg?allowDefaultPicture=true",
  Steven_Nzonzi:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/319327_sq-300_jpg?allowDefaultPicture=true",
  Lucas_Hernandez:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/411470_sq-300_jpg?allowDefaultPicture=true",
  Steve_Mandanda:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/254133_sq-300_jpg?allowDefaultPicture=true",
  Adil_Rami:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/299876_sq-300_jpg?allowDefaultPicture=true",
  Hugo_Lloris:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/297105_sq-300_jpg?allowDefaultPicture=true",
  Corentin_Tolisso:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/404566_sq-300_jpg?allowDefaultPicture=true",
  Deschamps_Didier:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/48455_sq-300_jpg?allowDefaultPicture=true",
  Florian_Thauvin:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/368965_sq-300_jpg?allowDefaultPicture=true",
  Thomas_Lemar:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/402049_sq-300_jpg?allowDefaultPicture=true",
  Samuel_Umtiti:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/368846_sq-300_jpg?allowDefaultPicture=true",
  Raphael_Varane:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/359440_sq-300_jpg?allowDefaultPicture=true",
  Alphonse_Areola:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/368840_sq-300_jpg?allowDefaultPicture=true",
  Kylian_Mbappe:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/389867_sq-300_jpg?allowDefaultPicture=true"
};

const tweets = [
  {
    emotion: "joy",
    entity_name: "Paul_Pogba",
    tweet:
      "RT @premierleague: Tonight's #WorldCup semi-final contains a compelling midfield battle 🤜🤛\n\nOn one side, Paul Pogba of @ManUtd and #FRA...…",
    image:
      "https://pbs.twimg.com/profile_images/994424349858902017/BnIwDZFW_normal.jpg"
  },

  {
    emotion: "anger",
    entity_name: "Olivier_Giroud",
    tweet:
      "RT @WhoScored: #FRA 0-0 #BEL HT:\n\nOlivier Giroud has now had 10 shots at the 2018 #WorldCup without hitting the target \n\nFull match statist…",
    image:
      "https://pbs.twimg.com/profile_images/957804463565299713/4zz1wGCg_normal.jpg"
  },
  {
    emotion: "fear",
    text: "Olivier Giroud",
    tweet:
      "Olivier Giroud has now played over 7\nhours of football at the 2018 #WorldCup\nwithout managing a single shot on targ… https://t.co/X50bv6CV64",
    image:
      "https://pbs.twimg.com/profile_images/804489457172971520/s20h0MPs_normal.jpg"
  },
  {
    emotion: "joy",
    entity_name: "Paul_Pogba",
    tweet:
      "RT @premierleague: Tonight's #WorldCup semi-final contains a compelling midfield battle 🤜🤛\n\nOn one side, Paul Pogba of @ManUtd and #FRA...…",
    image:
      "https://pbs.twimg.com/profile_images/994424349858902017/BnIwDZFW_normal.jpg"
  },
  {
    emotion: "joy",
    entity_name: "Paul_Pogba",
    tweet:
      "RT @premierleague: Tonight's #WorldCup semi-final contains a compelling midfield battle 🤜🤛\n\nOn one side, Paul Pogba of @ManUtd and #FRA...…",
    image:
      "https://pbs.twimg.com/profile_images/994424349858902017/BnIwDZFW_normal.jpg"
  },
  {
    emotion: "joy",
    entity_name: "Paul_Pogba",
    tweet:
      "RT @premierleague: Tonight's #WorldCup semi-final contains a compelling midfield battle 🤜🤛\n\nOn one side, Paul Pogba of @ManUtd and #FRA...…",
    image:
      "https://pbs.twimg.com/profile_images/994424349858902017/BnIwDZFW_normal.jpg"
  },
  {
    emotion: "joy",
    entity_name: "Paul_Pogba",
    tweet:
      "RT @premierleague: Tonight's #WorldCup semi-final contains a compelling midfield battle 🤜🤛\n\nOn one side, Paul Pogba of @ManUtd and #FRA...…",
    image:
      "https://pbs.twimg.com/profile_images/994424349858902017/BnIwDZFW_normal.jpg"
  },
  {
    emotion: "joy",
    entity_name: "Paul_Pogba",
    tweet:
      "RT @premierleague: Tonight's #WorldCup semi-final contains a compelling midfield battle 🤜🤛\n\nOn one side, Paul Pogba of @ManUtd and #FRA...…",
    image:
      "https://pbs.twimg.com/profile_images/994424349858902017/BnIwDZFW_normal.jpg"
  }
];

const getArrayOfEntities = entityObj =>
  Object.keys(entityObj).map(entity => {
    return { entity, image: entityObj[entity] };
  });

export const sampleData = {
  trendingEntities: getArrayOfEntities(FRA),
  tweets
};
