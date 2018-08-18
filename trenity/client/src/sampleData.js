import moment from "moment";
import videoFranceVsCroatiaFrom17to20 from "./assets/videos/FRA-vs-CRO-17-20.mp4";
import videoFranceVsCroatiaFrom13to23 from "./assets/videos/FRA-VS-CRO-13-23.mp4";

export const DEMO_LIST = [
  {
    matchId: "5b75f46c73dbef8460d1de89",
    variant: "17_20",
    title: "Croatia vs France - FIFA WC 2018 FINAL - 17'-20'",
    demoStartTime: moment.utc("2018-07-15 15:17:29"),
    demoEndTime: moment.utc("2018-07-15 15:23:00"),
    video: videoFranceVsCroatiaFrom17to20
  },
  {
    matchId: "5b75f46c73dbef8460d1de89",
    variant: "13_23",
    title: "Croatia vs France - FIFA WC 2018 FINAL - 13'-23'",
    demoStartTime: moment.utc("2018-07-15 15:13:00"),
    demoEndTime: moment.utc("2018-07-15 15:23:00"),
    video: videoFranceVsCroatiaFrom13to23
  }
];

export const DUMMY_TWEET_IMAGE =
  "http://www.razzlesnightclub.com/sites/default/files/default_images/default_testimonial.png";
