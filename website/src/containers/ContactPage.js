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
  contactBodyContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  },
  contactBody: {
    height: "80%",
    width: "100%"
  },
  contactHeading: {
    fontSize: "2em",
    margin: "20px 0"
  }
};

class ContactPage extends Component {
  state = {
    language: "eng"
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
        <div className={classes.contactBodyContainer}>
          <div className={classes.contactBody}>
            <div className={classes.contactHeading}>
              {texts[language].contact.heading}
            </div>
            <div>{texts[language].contact.subheading}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContactPage);
