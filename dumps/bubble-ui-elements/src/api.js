import axios from "axios";
import openSocket from "socket.io-client";

const BASE_URL = "http://trenity.me";

const ALL_ENTITIES_URL = `${BASE_URL}/list-entities`;
// const START_MATCH_URL = `http://${BASE_URL}/start_match`;

export const SOCKET_URL = `${BASE_URL}:5000/`;

// const socket = openSocket(TRENDING_URI, { transports: ["websocket"] });

// export const getRealTimeOpinionEmojis = cb => {
//   socket.onmessage(data => console.log(data));
// };

// export const openAllSockets = callback => {
//   const trendingSocket = openSocket(TRENDING_URL);
//   const entitySocket = openSocket(ENTITY_TWEETS_URL);
//   callback(trendingSocket, entitySocket);
// };

export const startMatchUrl = () => {
  axios.get(startMatchUrl).then(response => console.log(response));
};

export const getEntities = callback => {
  axios({
    method: "get",
    url: ALL_ENTITIES_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  })
    .then(response => callback(response))
    .catch(error => console.log(error));
};
