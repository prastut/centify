import React, { Component } from "react";
import injectSheet from "react-jss";
import Media from "react-media";

//Text
import texts from "../../locale";
import { breakPoints } from "../../helper";

//UI ELements
import Navbar from "../../components/Navbar";
import ClientHeightContainer from "../../components/ClientHeightContainer";
import ValueProp from "../../components/ValueProp";
import DisplayUseCaseBasic from "../../components/DisplayUseCaseBasic";
import BackGroundVideo from "../../components/BackGroundVideo";

//Video
import backgroundVideo from "../../assets/background.mp4";

//Mocks
import phoneVertical from "../../assets/phone-vertical.svg";
// import phoneHorizontal from "../../assets/phone-horizontal.svg";

const styles = {
  root: {
    color: "white"
  },
  dots: {
    display: "flex",
    justifyContent: "center"
  },
  mobileValueProp: {
    textAlign: "center"
  },
  productLineUp: {
    textAlign: "center",
    margin: "0 auto",
    background: "white",
    color: "black",
    padding: "20px"
  },
  productLineUpContainer: {
    background: "#EAEAEA"
  },
  trenityContainer: {
    color: "#333"
  },
  infoContainer: {
    width: "calc(100%*0.8)",
    margin: "0 auto",
    textAlign: "center"
  },
  mock1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class Basic extends Component {
  state = {
    language: "eng",
    valuePropState: 0
  };

  switchValuePropInterval = null;

  componentDidMount() {
    this.switchValuePropInterval = setInterval(() => {
      const updateValueProp = this.state.valuePropState === 0 ? 1 : 0;
      this.setState({ valuePropState: updateValueProp });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.switchValuePropInterval);
  }

  render() {
    const { classes } = this.props;
    const { language, valuePropState } = this.state;

    return (
      <div className={classes.root}>
        <Navbar brand={texts.basic[language].brand} />
        <ClientHeightContainer>
          <BackGroundVideo src={backgroundVideo} />
          <Media query={`(${breakPoints.sm})`}>
            {matches => (
              <ValueProp
                heading={
                  matches
                    ? texts.basic[language].valueProp[valuePropState].heading
                        .mobile
                    : texts.basic[language].valueProp[valuePropState].heading
                        .desktop
                }
                subheading={
                  texts.basic[language].valueProp[valuePropState].subheading
                }
              />
            )}
          </Media>
        </ClientHeightContainer>
        <ClientHeightContainer>
          <Media query={`(${breakPoints.sm})`}>
            {matches => (
              <DisplayUseCaseBasic
                imagePosition={matches ? "bottom" : "left"}
                image={phoneVertical}
                {...texts.basic[language].usecase.socialTV}
              />
            )}
          </Media>
        </ClientHeightContainer>
        <ClientHeightContainer>
          <Media query={`(${breakPoints.sm})`}>
            {matches => (
              <DisplayUseCaseBasic
                imagePosition={matches ? "bottom" : "right"}
                image={phoneVertical}
                {...texts.basic[language].usecase.brandSolutions}
              />
            )}
          </Media>
        </ClientHeightContainer>
      </div>
    );
  }
}

export default injectSheet(styles)(Basic);
