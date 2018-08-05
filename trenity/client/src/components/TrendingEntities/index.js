import React, { PureComponent } from "react";
import { toPairs, sort } from "ramda";

//Material Styles
import { withStyles } from "@material-ui/core/styles";

//UI ELements
import TopicCard from "../../components/TopicCard";

const styles = {
  trendingContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  entities: {
    flex: "1 1 33.33%",
    padding: "5px",
    minHeight: "calc(100vh*0.15)"
  },
  trendingContainerOnVideo: {
    position: "absolute",
    bottom: "0",
    height: "100%",
    width: "100%",
    zIndex: "1",
    background: "rgba(0,0,0,0.41)",
    display: "flex",
    alignItems: "center",
    overflowX: "scroll"
  },
  entitiesOnVideo: {
    flex: "1 0 100px",
    padding: "5px",
    height: "100%"
  }
};

class TrendingEntities extends PureComponent {
  entitiesDictToSortedEntitiesArray = entitiesDict => {
    const sortedEntitiesArray = sort(
      (a, b) => b[1].difference - a[1].difference,
      toPairs(entitiesDict)
    ).map(i => {
      const entity = i[0];
      const sentiment = i[1].sentiment;

      const refinedSentiment = {};

      if (sentiment) {
        if ("positive" in sentiment && "negative" in sentiment) {
          refinedSentiment["positive"] = Math.round(sentiment.positive * 100);
          refinedSentiment["negative"] = Math.round(sentiment.negative * 100);
        } else {
          if ("positive" in sentiment) {
            refinedSentiment["positive"] = Math.round(sentiment.positive * 100);
            refinedSentiment["negative"] = 0;
          }

          if ("negative" in sentiment) {
            refinedSentiment["negative"] = Math.round(sentiment.negative * 100);
            refinedSentiment["positive"] = 0;
          }
        }
      } else {
        refinedSentiment["positive"] = 50;
        refinedSentiment["negative"] = 50;
      }

      const entityData = this.props.allEntities.find(
        data => entity === data.entityName
      );

      return {
        entity,
        image: entityData.entityImageURL,
        sentiment: refinedSentiment
      };
    });
    return sortedEntitiesArray;
  };

  render() {
    const {
      variant,
      classes,
      selected,
      trending,
      emojis,
      onSpecificEntityClick
    } = this.props;

    const rootStyles =
      variant === "onVideo"
        ? classes.trendingContainerOnVideo
        : classes.trendingContainer;

    const entityStyles =
      variant === "onVideo" ? classes.entitiesOnVideo : classes.entities;

    if (variant === "onVideo" && selected) {
      return null;
    }

    return (
      <div className={rootStyles}>
        {this.entitiesDictToSortedEntitiesArray(trending.entities)
          .slice(0, 6)
          .map(e => (
            <div key={e.entity} className={entityStyles}>
              <TopicCard
                variant={variant === "onVideo" ? "onVideo" : "tile"}
                entityKey={e.entity}
                entityImage={e.image}
                emoji={emojis[e.entity]}
                sentiment={e.sentiment}
                selected={selected}
                onEntityClick={onSpecificEntityClick}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(TrendingEntities);
