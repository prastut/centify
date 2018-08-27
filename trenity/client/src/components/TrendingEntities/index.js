import React, { PureComponent } from "react";

//Material Styles
import { withStyles } from "@material-ui/core/styles";
import { entitiesDictToSortedEntitiesArray } from "../../helper";

//UI ELements
import TopicCard from "../../components/TopicCard";
import Emoji from "../../components/Emoji";
import SentimentBar from "../../components/SentimentBar";

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
  render() {
    const {
      variant,
      classes,
      selected,
      trending,
      allEntities,
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
        {entitiesDictToSortedEntitiesArray(trending, allEntities)
          .slice(0, 6)
          .map(e => (
            <div key={e.key} className={entityStyles}>
              <TopicCard
                variant={variant === "onVideo" ? "onVideo" : "tile"}
                entityKey={e.key}
                entityImage={e.imageURL}
                selected={selected}
                emojiComponent={
                  emojis[e.key] && <Emoji emoji={emojis[e.key]} />
                }
                sentimentBarComponent={
                  <SentimentBar
                    positive={e.sentiment.positive}
                    negative={e.sentiment.negative}
                  />
                }
                onEntityClick={onSpecificEntityClick}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(TrendingEntities);
