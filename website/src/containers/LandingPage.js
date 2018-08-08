import React, { Component } from "react";
import injectSheet from "react-jss";

//Text
import texts from "../locale";

//UI ELements
import Navbar from "../components/Navbar";
import ClientHeightContainer from "../components/ClientHeightContainer";
import ValueProp from "../components/ValueProp";
import DisplayUseCase from "../components/DisplayUseCase";
import Dot from "../components/Dot";
import APIBrief from "../components/APIBrief";

//Video
const backgroundVideo =
  "https://s3-ap-southeast-1.amazonaws.com/centify-trenity/My+Movie+6.mp4";

const styles = {
  root: {
    color: "white"
  },
  dots: {
    display: "flex",
    justifyContent: "center"
  },
  video: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.2,
    zIndex: -99999
  },
  productLineUp: {
    textAlign: "center",
    margin: "0 auto",
    background: "white",
    color: "black",
    padding: "20px"
  }
};

class LandingPage extends Component {
  state = {
    language: "eng",
    valuePropState: 0,
    videoUseCase: 0,
    textUseCase: 0
  };

  switchValuePropInterval = null;

  componentDidMount() {
    this.switchValuePropInterval = setInterval(() => {
      const updateValueProp = this.state.valuePropState === 0 ? 1 : 0;
      this.setState({ valuePropState: updateValueProp });
    }, 5000);
  }

  handleValuePropChangeClick = index => {
    this.setState({ valuePropState: index });
  };

  handleChangeVideoUseCase = index => {
    this.setState({ videoUseCase: index });
  };

  handleChangeTextUseCase = index => {
    this.setState({ textUseCase: index });
  };

  componentWillUnmount() {
    clearInterval(this.switchValuePropInterval);
  }

  render() {
    const { classes } = this.props;
    const { language, valuePropState } = this.state;

    return (
      <div className={classes.root}>
        <Navbar
          brand={texts[language].brand}
          navLinks={texts[language].navLinks}
        />
        <ClientHeightContainer>
          <video
            className={classes.video}
            preload="metdata"
            playsInline
            autoPlay
            loop
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <ValueProp {...texts[language].valueProp[valuePropState]} />
          <div className={classes.dots}>
            {[0, 1].map(i => (
              <Dot
                key={i}
                index={i}
                selected={this.state.valuePropState}
                onDotClick={this.handleValuePropChangeClick}
              />
            ))}
          </div>
        </ClientHeightContainer>
        <APIBrief {...texts[language].api} />
        <div className={classes.productLineUp}>
          <h2>{texts[language].productLineUp}</h2>
        </div>
        {/* <DisplayUseCase
          imagePosition="left"
          {...texts[language].usecase.video}
          selectedUseCaseIndex={this.state.videoUseCase}
          onChangeUseCase={this.handleChangeVideoUseCase}
        />

        <DisplayUseCase
          imagePosition="right"
          {...texts[language].usecase.text}
          selectedUseCaseIndex={this.state.textUseCase}
          onChangeUseCase={this.handleChangeTextUseCase}
        /> */}
      </div>
    );
  }
}

export default injectSheet(styles)(LandingPage);
