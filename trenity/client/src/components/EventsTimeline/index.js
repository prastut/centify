import React, { Component } from "react";
import moment from "moment";
import { isEmpty } from "ramda";
import { withStyles } from "@material-ui/core/styles";
import Swiper from "react-id-swiper";

import { eventsToEmoji } from "../../helper";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    overflowX: "scroll",
    whiteSpace: "nowrap"
  },
  eachEventContainer: {
    textAlign: "center"
  },
  eventEmoji: {
    fontSize: "1.5em",
    margin: "0 0 5px 0"
  },
  eventTime: {
    margin: 0
  }
};

const PARAMS = {
  slidesPerView: 4,
  slidesOffsetBefore: 20,
  spaceBetween: 10,
  freeMode: true,
  slideToClickedSlide: true
};

class EventsTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.eventsAnimation = null;
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.events.length === nextProps.events.length) {
      //Same events
      return false;
    }
    return true;
  }
  componentDidMount() {
    this.slideToLast();
  }

  componentDidUpdate() {
    this.slideToLast();
  }

  componentWillUnmount() {
    clearTimeout(this.eventsAnimation);
  }

  slideToLast = () => {
    if (!isEmpty(this.props.events)) {
      this.eventsAnimation = setTimeout(() => {
        this.swiper.slideTo(this.props.events.length - 1);
      }, 800);
    }
  };

  render() {
    const { classes, events } = this.props;
    return (
      <Swiper
        shouldSwiperUpdate
        {...PARAMS}
        ref={node => {
          if (node) this.swiper = node.swiper;
        }}
      >
        {events.map(e => (
          <div key={e._id} className={classes.eachEventContainer}>
            <div className={classes.eventEmoji}>
              {eventsToEmoji(e.event.toUpperCase())}
            </div>
            <div className={classes.eventTime}>
              {moment.utc(e.timeStamp).format("m")}'
            </div>
          </div>
        ))}
      </Swiper>
    );
  }
}

export default withStyles(styles)(EventsTimeline);
