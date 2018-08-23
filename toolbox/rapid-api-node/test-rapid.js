const RapidAPI = new require("rapidapi-connect");
const rapid = new RapidAPI(
  "trenity_5b77ba31e4b05c78e920f4a0",
  "/connect/auth/trenity_5b77ba31e4b05c78e920f4a0"
);

rapid.call("NasaAPI", "getPictureOfTheDay", {});
