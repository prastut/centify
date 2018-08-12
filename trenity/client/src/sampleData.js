import moment from "moment";
import videoFranceVsCroatiaFrom17to20 from "./assets/videos/FRA-vs-CRO-17-20.mp4";

export const DEMO_LIST = [
  {
    matchId: "CROFRA_FINAL",
    variant: "17_20",
    title: "Croatia vs France - FIFA WC 2018 FINAL - 17'-20'",
    time: {
      start: moment.utc("2018-07-15 15:17:48"),
      end: moment.utc("2018-07-15 15:23:00")
    },
    video: videoFranceVsCroatiaFrom17to20
  },
  {
    matchId: "CROFRA_FINAL",
    variant: "13_23",
    title: "Croatia vs France - FIFA WC 2018 FINAL - 13'-23'",
    time: {
      start: moment.utc("2018-07-15 15:13:00"),
      end: moment.utc("2018-07-15 15:23:00")
    },
    throttle: [
      {
        key: "Mario_Mandzukic",
        at: moment.utc("2018-07-15 15:20:00")
      }
    ]
  }
];

export const DUMMY_TWEET_IMAGE =
  "http://www.razzlesnightclub.com/sites/default/files/default_images/default_testimonial.png";