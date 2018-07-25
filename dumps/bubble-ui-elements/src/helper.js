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
