import React, { Component } from "react";
//Material Styles
import { withStyles } from "@material-ui/core/styles";

//Text
import texts from "../locale";

//UI ELements
import Navbar from "../components/Navbar";

const styles = {
  root: {
    color: "white",
    width: "calc(100vw*0.8)",
    margin: "0 auto"
  },
  researchBodyContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  },
  researchBody: {
    height: "80%",
    width: "100%"
  },
  researchHeading: {
    fontSize: "2em",
    margin: "20px 0"
  }
};

class ResearchPage extends Component {
  state = {
    language: "eng",
    displayFull: false
  };

  render() {
    const { classes } = this.props;
    const { language } = this.state;

    return (
      <div className={classes.root}>
        <Navbar
          brand={texts[language].brand}
          navLinks={texts[language].navLinks}
        />
        <div className={classes.researchBodyContainer}>
          <div className={classes.researchBody}>
            <div className={classes.researchHeading}>
              {texts[language].research.heading}
            </div>
            <div>{texts[language].research.subheading}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ResearchPage);
