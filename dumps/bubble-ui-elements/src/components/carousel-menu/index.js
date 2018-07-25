import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";

import Swiper from "react-id-swiper";
import TopicCard from "../topic-card";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "calc(100vh*0.25)"
  }
};

class CarouselMenu extends Component {
  render() {
    const params = {
      slidesPerView: 3,
      spaceBetween: 10,
      freeMode: true,
      slideToClickedSlide: true,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20
    };

    const {
      classes,
      selected,
      entities,
      emojiTweets,
      onEntityClick
    } = this.props;

    return (
      <Swiper {...params}>
        {Object.keys(entities).map(key => (
          <div key={key} className={classes.root}>
            <TopicCard
              index={key}
              selected={selected}
              entity={entities[key]}
              emoji={emojiTweets[key]}
              onEntityClick={onEntityClick}
            />
          </div>
        ))}
      </Swiper>
    );
  }
}

export default withStyles(styles)(CarouselMenu);
