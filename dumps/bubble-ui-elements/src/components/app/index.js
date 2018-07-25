import React, { Component } from "react";
import { isEmpty } from "ramda";

//Material Styles
import Grid from "@material-ui/core/Grid";

//API
import { getEntities, SOCKET_URL } from "../../api";
import openSocket from "socket.io-client";

//UI ELements
import Navbar from "../navbar";
import CarouselMenu from "../carousel-menu";
import ReactionTimeline from "../reaction-timeline";
import ReactionFeed from "../reaction-feed";

//Sample Data
// import { CRODEN } from "../../sample-data";

//SWIPER CSS
import "../../assets/css/swiper.min.css";

const formatDateToUTC = date =>
  `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = null;
    this.state = {
      entities: {},
      emojiTweets: {},
      selected: {
        key: null,
        tweets: []
      }
    };
  }

  componentDidMount() {
    getEntities(entities => {
      this.setState({
        entities: entities.data,
        selected: {
          ...this.state.selected,
          key: Object.keys(entities.data)[0]
        }
      });

      this.socket = openSocket(SOCKET_URL);

      this.socket.on("Trending_Tweet", trending => {
        const data = JSON.parse(trending);
        const emojiTweets = { ...this.state.emojiTweets };
        emojiTweets[data.entity] = `${data.emotion}-${Date.now()}`;
        this.setState({ emojiTweets });
      });

      this.socket.on("Entity_Tweet", entity => {
        console.log(entity);
      });

      this.socket.emit("trending");
      this.pollEntityTweets();

      // openAllSockets((trendingSocket, entitySocket) => {
      //   this.trendingSocket = trendingSocket;
      //   this.entitySocket = entitySocket;

      // })

      // getRealTimeOpinionEmojis(data => {
      //   const emojiTweets = { ...this.state.emojiTweets };
      //   emojiTweets[data.entity] = `${data.emotion}-${Date.now()}`;
      //   this.setState({ emojiTweets });
      // });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.pollEntityTweets();
    }
  }

  pollEntityTweets = () => {
    this.socket.emit(
      "entities",
      this.state.selected.key,
      formatDateToUTC(new Date())
    );
  };

  onEntityClick = key => {
    this.setState({
      selected: {
        key,
        tweets: []
      }
    });
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          {!isEmpty(this.state.entities) && (
            <CarouselMenu
              entities={this.state.entities}
              emojiTweets={this.state.emojiTweets}
              selected={this.state.selected.key}
              onEntityClick={this.onEntityClick}
            />
          )}
        </Grid>
        {this.state.selected ? (
          <React.Fragment>
            <Grid item xs={12}>
              <ReactionTimeline selected={this.state.selected} />
            </Grid>
            <Grid item xs={12}>
              {/* <ReactionFeed selected={this.state.selected} /> */}
            </Grid>
          </React.Fragment>
        ) : null}
      </Grid>
    );
  }
}

export default App;
