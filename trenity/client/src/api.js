import axios from "axios";
import { isEmpty, toPairs, sort, fromPairs } from "ramda";
import { DEMO_LIST } from "./sampleData";

const api = {
  getAllFixtures: async () => {
    try {
      const fixtures = await axios.get("/api/fixtures/");
      return fixtures.data;
    } catch (error) {
      console.log(error);
    }
  },

  getMatchVerboseDetails: async matchId => {
    const { teamOne, teamTwo, matchState, startTime } = await api.getMatchData(
      matchId
    );

    const allEntities = await api.getAllEntities(matchId);

    const [teamOneData, teamTwoData] = await Promise.all([
      api.getEntityData(teamOne),
      api.getEntityData(teamTwo)
    ]);

    return {
      matchId,
      matchState,
      startTime,
      teams: { teamOne: teamOneData, teamTwo: teamTwoData },
      allEntities
    };
  },

  getMatchData: async matchId => {
    try {
      const match = await axios.get(`/api/match/data/${matchId}`);
      return match.data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllEntities: async matchId => {
    try {
      const allEntities = await axios.get(`/api/match/all-entities/${matchId}`);
      return allEntities.data;
    } catch (error) {
      console.log(error);
    }
  },

  getEntityData: async key => {
    try {
      const entity = await axios.get(`/api/entity/data/${key}`);
      return entity.data;
    } catch (error) {
      console.log(error);
    }
  },

  getDemoDetails: (matchId, variant) => {
    return DEMO_LIST.find(
      demo => demo.matchId === matchId && demo.variant === variant
    );
  },

  getTrendingEntities: async (matchId, timeInsideMatch, prevEntities) => {
    try {
      const dataForTrendingEntitiesCount = await axios.get(
        `/api/match/trending/${matchId}`,
        {
          params: {
            timeInsideMatch
          }
        }
      );

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
    } catch (error) {
      console.log(error);
    }
  },

  getEvents: async (matchId, timeInsideMatch) => {
    try {
      const events = await axios.get(`/api/match/events/${matchId}`, {
        params: {
          timeInsideMatch
        }
      });

      return events.data;
    } catch (error) {
      console.log(error);
    }
  },

  socket: {
    dev: "http://localhost:5000/",
    production: "https://trenity.me/"
  }
};

export default api;
