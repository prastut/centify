import React, { Component } from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";
import "animate.css";

const styles = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },
  contentWrapper: {
    width: "calc(100%*0.8)",
    margin: "0 auto"
  },
  heading: {
    margin: "10px 0",
    fontSize: "2.5em",
    fontWeight: "700"
  },
  subheading: {
    fontSize: "1.2em",
    margin: "10px 0"
  },
  [`@media (${breakPoints.lg})`]: {
    root: {
      textAlign: "left"
    },
    heading: {
      fontSize: "3em"
    }
  }
};

class ValueProp extends Component {
  state = { animation: false };

  timeout = null;

  componentDidMount() {
    this.setState({ animation: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.heading !== prevProps.heading) {
      this.setState({ animation: false });
      this.timeout = setTimeout(() => {
        this.setState({ animation: true });
        clearTimeout(this.timeout);
      }, 200);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { classes, heading, subheading, description } = this.props;
    const { animation } = this.state;
    return (
      <div className={classes.root}>
        {animation && (
          <div
            className={[classes.contentWrapper, "animated", "fadeIn"].join(" ")}
          >
            <div className={[classes.heading].join(" ")}>{heading}</div>
            <div className={classes.subheading}>{subheading}</div>
            <div>{description}</div>
          </div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(ValueProp);
