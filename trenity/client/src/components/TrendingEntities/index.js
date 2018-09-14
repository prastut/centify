import React, { PureComponent } from "react";
import Swiper from "react-id-swiper";

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
  },
  carouselContainer: {
    height: "100px"
  }
};

const CARAOUSEL_SWIPER_PARAMS = {
  slidesPerView: 4,
  spaceBetween: 10,
  freeMode: true,
  slideToClickedSlide: true,
  slidesOffsetBefore: 20
};

class TrendingEntities extends PureComponent {
  state = {
    initSlide: false
  };

  componentDidUpdate() {
    if (!this.state.initSlide && this.props.variant === "carousel") {
      this.swiper.slideTo(0);
      this.setState({ initSlide: true });
    }
  }

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

    const entitiesToShow = entitiesDictToSortedEntitiesArray(
      trending,
      allEntities
    ).slice(0, 6);

    if (variant === "carousel") {
      return (
        <div>
          <Swiper
            shouldSwiperUpdate
            {...CARAOUSEL_SWIPER_PARAMS}
            ref={node => {
              if (node) this.swiper = node.swiper;
            }}
          >
            {entitiesToShow.map(e => (
              <div key={e.key} className={classes.carouselContainer}>
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
          </Swiper>
        </div>
      );
    }

    return (
      <div className={rootStyles}>
        {entitiesToShow.map(e => (
          <div key={e.key} className={entityStyles}>
            <TopicCard
              variant={variant === "onVideo" ? "onVideo" : "tile"}
              entityKey={e.key}
              entityImage={e.imageURL}
              selected={selected}
              emojiComponent={emojis[e.key] && <Emoji emoji={emojis[e.key]} />}
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
