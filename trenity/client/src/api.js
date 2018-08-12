import axios from "axios";
import { concat, isEmpty, toPairs, sort, fromPairs } from "ramda";
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

  getAllMatchDetails: async matchId => {
    const { matchName, teamOneId, teamTwoId, isLive } = await api.getMatchData(
      matchId
    );

    const [teamOneData, teamTwoData] = await Promise.all([
      api.getTeamData(teamOneId),
      api.getTeamData(teamTwoId)
    ]);

    return {
      matchId,
      matchDetails: {
        name: matchName,
        isLive
      },
      teams: { teamOneId, teamTwoId },
      allEntities: concat(teamOneData, teamTwoData)
    };
  },

  getMatchData: async matchId => {
    const match = await axios.get(`/api/match/data/${matchId}`);
    return match.data;
  },

  getTeamData: async teamId => {
    try {
      console.log(teamId);
      const team = await axios.get(`/api/team/entities/${teamId}`);

      return team.data;
    } catch (error) {
      console.log(error);
    }
  },

  getDemoDetails: (matchId, variant) => {
    return DEMO_LIST.find(demo => demo.variant === variant);
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
    } catch (error) {
      console.log(error);
    }
  },

  getEventsTillNow: async (matchId, timeInsideMatch) => {
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
