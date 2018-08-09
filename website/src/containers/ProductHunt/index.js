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
// import DisplayUseCase from "../../components/DisplayUseCase";
// import Dot from "../../components/Dot";
import APIBrief from "../../components/APIBrief";
import BackGroundVideo from "../../components/BackGroundVideo";

//Video
import backgroundVideo from "../../assets/background.mp4";

//Mocks
import phoneVertical from "../../assets/phone-vertical.svg";
import phoneHorizontal from "../../assets/phone-horizontal.svg";

const styles = {
  root: {
    color: "white"
  },
  dots: {
    display: "flex",
    justifyContent: "center"
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

class ProductHuntLandingPage extends Component {
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
          brand={texts.productHunt[language].brand}
          navLinks={texts.productHunt[language].navLinks}
        />
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
        <APIBrief {...texts.productHunt[language].api} />
        <div className={classes.productLineUpContainer}>
          <div className={classes.productLineUp}>
            <h2>{texts.productHunt[language].productMeta.heading}</h2>
          </div>
          <div className={classes.trenityContainer}>
            <div className={classes.infoContainer}>
              <h2 className={classes.heading}>
                {texts.productHunt[language].productMeta.p1.heading}
              </h2>
              <p>{texts.productHunt[language].productMeta.p1.subheading}</p>
            </div>
            <div className={classes.mock1}>
              <img src={phoneVertical} alt="" />
              <p> Usecase1 </p>
            </div>
            <div className={classes.mock1}>
              <div className>
                <img src={phoneHorizontal} alt="" />
              </div>
              <p> Usecase2 </p>
            </div>
          </div>
        </div>

        {/* <DisplayUseCase
          imagePosition="left"
          {...texts.productHunt[language].usecase.video}
          selectedUseCaseIndex={this.state.videoUseCase}
          onChangeUseCase={this.handleChangeVideoUseCase}
        />

        <DisplayUseCase
          imagePosition="right"
          {...texts.productHunt[language].usecase.text}
          selectedUseCaseIndex={this.state.textUseCase}
          onChangeUseCase={this.handleChangeTextUseCase}
        /> */}
      </div>
    );
  }
}

export default injectSheet(styles)(ProductHuntLandingPage);
