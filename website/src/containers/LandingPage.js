import React, { Component } from "react";
//Material Styles
import injectSheet from "react-jss";

//Text
import texts from "../locale";

//UI ELements
import Navbar from "../components/Navbar";
import ClientHeightContainer from "../components/ClientHeightContainer";
import ValueProp from "../components/ValueProp";
import DisplayUseCase from "../components/DisplayUseCase";
import Dot from "../components/Dot";

const styles = {
  root: {
    color: "white"
  },
  dots: {
    display: "flex",
    justifyContent: "center"
  }
};

class LandingPage extends Component {
  state = {
    language: "eng",
    valuePropState: 0,
    videoUseCase: 0,
    textUseCase: 0
  };

  handleValuePropChangeClick = index => {
    this.setState({ valuePropState: index });
  };

  handleChangeVideoUseCase = index => {
    this.setState({ videoUseCase: index });
  };

  handleChangeTextUseCase = index => {
    this.setState({ textUseCase: index });
  };

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
        <ClientHeightContainer>
          <DisplayUseCase
            imagePosition="left"
            {...texts[language].usecase.video}
            selectedUseCaseIndex={this.state.videoUseCase}
            onChangeUseCase={this.handleChangeVideoUseCase}
          />
        </ClientHeightContainer>
        <ClientHeightContainer>
          <DisplayUseCase
            imagePosition="right"
            {...texts[language].usecase.text}
            selectedUseCaseIndex={this.state.textUseCase}
            onChangeUseCase={this.handleChangeTextUseCase}
          />
        </ClientHeightContainer>
      </div>
    );
  }
}

export default injectSheet(styles)(LandingPage);
