import React, { Component } from "react";

//Material Styles
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "100%"
  },
  box: {
    height: "calc(100vh*0.8)",
    background: "white",
    border: "3px solid cornflowerblue"
  },
  right: {
    height: "80%"
  },
  descriptionContainer: {
    width: "80%",
    margin: "0 auto"
  },
  descriptionHeading: {
    fontSize: "2em",
    margin: "20px 0"
  },
  usecaseElements: {
    margin: "20px 0"
  },
  useCaseItems: {
    cursor: "pointer"
  },
  underline: {
    paddingBottom: "2px",
    borderBottom: "1px solid white"
  }
};

class DisplayUseCase extends Component {
  render() {
    const {
      classes,
      imagePosition,
      heading,
      useCase1,
      useCase2,
      usecases,
      selectedUseCaseIndex,
      onChangeUseCase
    } = this.props;

    const image = (
      <Grid item lg={6} md={6} xs={12}>
        <div className={classes.box} />
      </Grid>
    );

    const usecaseElements = [useCase1, useCase2].map((u, index) => (
      <Grid key={u} item xs={6}>
        <span
          className={index === selectedUseCaseIndex ? classes.underline : null}
          onClick={() => onChangeUseCase(index)}
        >
          <span className={classes.useCaseItems}>{u}</span>
        </span>
      </Grid>
    ));

    const description = (
      <Grid item lg={6} md={6} xs={12} className={classes.right}>
        <Grid container className={classes.descriptionContainer}>
          <Grid item xs={12}>
            <div className={classes.descriptionHeading}>{heading}</div>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.usecaseElements}>
              {usecaseElements}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {usecases[selectedUseCaseIndex].description}
          </Grid>
        </Grid>
      </Grid>
    );

    const renderElements =
      imagePosition === "left" ? (
        <React.Fragment>
          {image}
          {description}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {description}
          {image}
        </React.Fragment>
      );

    return (
      <Grid container alignItems="center" className={classes.root}>
        {renderElements}
      </Grid>
    );
  }
}

export default withStyles(styles)(DisplayUseCase);
