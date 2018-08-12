import React, { Component } from "react";
import { isEmpty } from "ramda";
import Swiper from "react-id-swiper";

import Event from "../../components/Event";

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
    return (
      <Swiper
        shouldSwiperUpdate
        {...PARAMS}
        ref={node => {
          if (node) this.swiper = node.swiper;
        }}
      >
        {this.props.events.map(eventObj => (
          <div key={eventObj._id}>
            <Event eventObj={eventObj} />
          </div>
        ))}
      </Swiper>
    );
  }
}

export default EventsTimeline;
