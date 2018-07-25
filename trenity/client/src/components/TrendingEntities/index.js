import React, { Component } from "react";
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

class TrendingEntities extends Component {
  entitiesDictToSortedEntitiesArray = entitiesDict => {
    const sortedEntitiesArray = sort(
      (a, b) => b[1].difference - a[1].difference,
      toPairs(entitiesDict)
    ).map(i => {
      const entity = i[0];
      const entityData = this.props.allEntities.find(
        data => entity === data.entityName
      );

      if (entityData) {
        return {
          entity,
          image: entityData.entityImageURL
        };
      } else {
        return {
          entity,
          image: null
        };
      }
    });

    return sortedEntitiesArray;
  };

  render() {
    const {
      variant,
      classes,
      selected,
      trendingEntities,
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
        {this.entitiesDictToSortedEntitiesArray(trendingEntities)
          .slice(0, 6)
          .map(e => (
            <div key={e.entity} className={entityStyles}>
              <TopicCard
                variant={variant === "onVideo" ? "onVideo" : "tile"}
                entityKey={e.entity}
                entityImage={e.image}
                emoji={emojis[e.entity]}
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
