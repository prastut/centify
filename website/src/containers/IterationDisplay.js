import React, { Component } from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

//Text
import texts from "../locale";

//UI ELements
import Navbar from "../components/Navbar";
import ClientHeightContainer from "../components/ClientHeightContainer";

const styles = {
  root: {
    color: "white"
  },
  websites: {
    width: "calc(100%*0.8)",
    margin: "0 auto"
  },
  wrapper: {
    paddingTop: "50px"
  },
  options: {
    padding: "5px 0"
  }
};

class IterationDisplay extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navbar brand={texts.basic["eng"].brand} />
        <ClientHeightContainer>
          <div className={classes.websites}>
            <div className={classes.wrapper}>
              <p>Website Possibilities:</p>
              <div>
                <Link to="/basic">
                  <div className={classes.options}>Basic</div>
                </Link>
                <Link to="/product-hunt">
                  <div className={classes.options}>ProductHunt</div>
                </Link>
              </div>
            </div>
          </div>
        </ClientHeightContainer>
      </div>
    );
  }
}

export default injectSheet(styles)(IterationDisplay);
