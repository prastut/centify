import axios from "axios";
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
    const { teamOne, teamTwo, matchState, timeStamp } = await api.getMatchData(
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
      startTime: timeStamp,
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

      if (!data) return null;

      const unsortedEntitiesData = data["until_now"];
      const sortedTrendingEntities = {};

      Object.keys(unsortedEntitiesData).forEach(entityKey => {
        if (entityKey in prevEntities) {
          const oldCount = prevEntities[entityKey]["count"];
          const newCount = unsortedEntitiesData[entityKey]["count"];
          const difference = newCount - oldCount;

          sortedTrendingEntities[entityKey] = {
            ...unsortedEntitiesData[entityKey],
            difference
          };
        } else {
          sortedTrendingEntities[entityKey] = {
            ...unsortedEntitiesData[entityKey],
            difference: unsortedEntitiesData[entityKey]["count"]
          };
        }
      });

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
