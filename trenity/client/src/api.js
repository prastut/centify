import axios from "axios";
import moment from "moment";
import { concat, isEmpty, toPairs, sort, fromPairs } from "ramda";

const api = {
  getMatchData: async (matchId, matchStartMinute, matchStartSecond) => {
    const matchPromise = await axios.get(`/api/match/data/${matchId}`);
    const { matchName, teamOneId, teamTwoId, isLive } = matchPromise.data;

    const teamOnePromise = axios.get(`/api/team/entities/${teamOneId}`);
    const teamTwoPromise = axios.get(`/api/team/entities/${teamTwoId}`);

    const [teamOne, teamTwo] = await Promise.all([
      teamOnePromise,
      teamTwoPromise
    ]);

    const match = {
      matchId,
      name: matchName,
      isLive,
      teamOneId,
      teamTwoId,
      startTime: moment.utc(
        `2018-07-15 15:${matchStartMinute}:${matchStartSecond}`
      ),
      allEntities: concat(teamOne.data, teamTwo.data)
    };
    return match;
  },

  getTrendingEntities: async (matchId, timeInsideMatch, prevEntities) => {
    const dataForTrendingEntitiesCount = await axios.get(
      `/api/match/trending/${matchId}`,
      {
        params: {
          timeInsideMatch
        }
      }
    );

    // console.log(dataForTrendingEntitiesCount);

    const data = dataForTrendingEntitiesCount.data;
    if (!data) {
      return null;
    }

    const trendingEntitiesCount = data.until_now;
    const trendingEntitiesSentiment = data.sentiment;

    let sortedTrendingEntities = null;

    if (isEmpty(prevEntities)) {
      sortedTrendingEntities = sort(
        (a, b) => b[1] - a[1],
        toPairs(trendingEntitiesCount)
      ).reduce((accumulator, currentValue, index) => {
        return {
          ...accumulator,
          [currentValue[0]]: {
            count: currentValue[1],
            difference: 0,
            sentiment: trendingEntitiesSentiment[currentValue[0]]
          }
        };
      }, {});

      // console.log("Intial Dict Set->", sortedTrendingEntities);
    } else {
      const unsortedTrendingEntities = {};

      Object.keys(trendingEntitiesCount).forEach(entity => {
        const prevDataForEntity = prevEntities[entity];

        if (prevDataForEntity) {
          const oldCount = prevDataForEntity.count;
          const newCount = trendingEntitiesCount[entity];
          const difference = newCount - oldCount;

          unsortedTrendingEntities[entity] = {
            ...prevDataForEntity,
            count: newCount,
            difference,
            sentiment: trendingEntitiesSentiment[entity]
          };
        } else {
          unsortedTrendingEntities[entity] = {
            count: trendingEntitiesCount[entity],
            difference: 0,
            sentiment: trendingEntitiesSentiment[entity]
          };
        }
      });

      sortedTrendingEntities = fromPairs(
        sort(
          (a, b) => b[1].difference - a[1].difference,
          toPairs(unsortedTrendingEntities)
        )
      );
    }

    // console.log(sortedTrendingEntities);
    return sortedTrendingEntities;
  },

  getEventsTillNow: async (matchId, timeInsideMatch) => {
    const events = await axios.get(`/api/match/events/${matchId}`, {
      params: {
        timeInsideMatch
      }
    });

    return events.data;
  },

  getAllFixtures: async () => {
    const fixtures = await axios.get("/api/match/all");
    return fixtures.data;
  },

  socket: {
    dev: "http://localhost:5000/",
    production: "https://trenity.me/"
  }
};

export default api;
